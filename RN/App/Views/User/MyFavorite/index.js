import React from 'react'
import { Text, View, FlatList, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native'
import { Tabs } from '@ant-design/react-native'

import { getUserStars } from '@Api/user'
import FavoriteCard from './_component/FavoriteCard'

export default class MyFavorite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starData: [], // 收藏数据,
    }
    this.initData = this.initData.bind(this)
  }
  componentWillMount() {
    this.initData()
  }
  // 初始化数据
  async initData() {
    const data = await getUserStars()

    if (data.status === 401) {
      ToastAndroid.showWithGravity('用户认证失效，将前往登录页', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.props.navigation.navigate('Login')
      return
    }
    if (data.code === 0) {
      ToastAndroid.showWithGravity('无收藏信息', ToastAndroid.SHORT, ToastAndroid.CENTER)
      // 无订单信息
      this.setState({
        starData: [],
      })
      return
    }
    if (data.code === -1) {
      this.setState({
        starData: data.value,
      })
      return
    }
    ToastAndroid.showWithGravity('服务发生错误，请检查网络连接', ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  render() {
    const tabs = [{ title: '竞拍中' }, { title: '待开始' }]
    const { navigation } = this.props
    const style = {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    }

    return (
      <View style={{ flex: 1 }}>
        <Tabs onChange={this.initData} tabs={tabs} page={this.state.type} tabBarActiveTextColor={'#e02223'} renderUnderline={() => null}>
          <View style={style}>
            <FlatList data={this.state.starData} renderItem={({ item }) => <FavoriteCard nav={navigation} type={'竞拍中'} star={item} />} />
          </View>
          <View style={style}>
            <FlatList data={this.state.starData} renderItem={({ item }) => <FavoriteCard nav={navigation} type={'待开始'} star={item} />} />
          </View>
        </Tabs>
      </View>
    )
  }
}
const viewStyles = StyleSheet.create({
  tabBarUL: {
    textDecorationColor: '#e02223',
  },
})
