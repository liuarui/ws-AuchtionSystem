import React from 'react'
import connect from 'redux-connect-decorator'
import { View, Text, AsyncStorage, StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Avatar } from 'react-native-elements'
import { Grid } from '@ant-design/react-native'

// 本地引入
import config from '@Config'
import styles from '@Styles'
import UserCard from './_component/UserCard'
import { getUserMes } from '@Api/user'
// import { setModalVisibleStatus } from '@Store/Actions'

// @connect(
//   state => ({
//     timeline: state.home.timeline,
//   }),
//   {
//     setModalVisibleStatus,
//   },
// )
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userMes: {},
    }
    this.init = this.init.bind(this)
  }
  componentDidMount() {
    this.init()
  }
  async init() {
    const result = await getUserMes()

    if (result.status === 401) {
      ToastAndroid.showWithGravity('用户认证失败，将前往登录页', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.props.navigation.navigate('Login')
    }
    if (result.code === -1) {
      this.setState({
        userMes: result.value[0],
      })
      ToastAndroid.showWithGravity('获取信息成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
      await AsyncStorage.setItem('name', result.value[0].name)
      await AsyncStorage.setItem('userId', result.value[0].userId)
      await AsyncStorage.setItem('sex', result.value[0].sex)
      await AsyncStorage.setItem('username', result.value[0].username)
      await AsyncStorage.setItem('avatarPath', result.value[0].avatarPath)
    }
  }

  render() {
    const { navigation } = this.props
    const listType = Array.from([
      { text: '全部', icon: 'https://s1.ax1x.com/2020/04/07/GcYsQx.png' },
      { text: '竞拍中', icon: 'https://s1.ax1x.com/2020/04/07/GcNrqK.png' },
      { text: '竞拍成功', icon: 'https://s1.ax1x.com/2020/04/07/GcNxs0.png' },
      { text: '竞拍失败', icon: 'https://s1.ax1x.com/2020/04/07/GcUAzR.png' },
    ]).map((_val, i) => ({
      icon: _val.icon,
      text: _val.text,
    }))

    return (
      <View style={viewStyles.userBox}>
        <LinearGradient colors={['#e0223c', '#e0224a', '#e02245']}>
          <View style={viewStyles.topBlock}>
            <Avatar
              containerStyle={viewStyles.topBlockAvatar}
              size="large"
              rounded
              source={{
                uri: this.state.userMes.avatarPath,
              }}
            />
            <Text style={viewStyles.topBlockText}>{this.state.userMes.name ? this.state.userMes.name : '当前用户未登录'}</Text>
          </View>
        </LinearGradient>
        <View style={viewStyles.myListBlock}>
          <Text style={viewStyles.myListBlockText}>我的订单</Text>
          <View style={viewStyles.myListBlockMenu}>
            <Grid hasLine={false} data={listType} columnNum={4} onPress={(_el, index) => navigation.navigate('MyList', { type: index })} />
          </View>
        </View>
        {/* <UserCard title={'我的拍品'} toRoute={'MyAuction'} iconName={'ios-list'} /> */}
        <UserCard title={'我的收藏'} toRoute={'MyFavorite'} iconName={'ios-star'} />
        <UserCard title={'设置'} toRoute={'Setting'} iconName={'ios-settings'} />
      </View>
    )
  }
}

const viewStyles = StyleSheet.create({
  userBox: {},
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  topBlock: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBlockText: {
    paddingTop: 5,
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  topBlockAvatar: {
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  myListBlock: {
    height: 135,
    ...styles.grayBorder,
  },
  myListBlockText: {
    paddingLeft: 25,
    fontSize: 18,
    lineHeight: 45,
    height: 45,
    ...styles.grayBorder,
  },
  container: {
    ...styles.container,
    paddingTop: 5,
  },
})
