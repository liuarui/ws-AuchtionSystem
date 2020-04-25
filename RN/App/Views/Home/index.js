import React from 'react'
import connect from 'redux-connect-decorator'
import { Alert, View, Text, Animated, ScrollView, Dimensions, Image, Easing, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import { Icon, SearchBar, TabBar } from '@ant-design/react-native'
import { Carousel } from '@ant-design/react-native'
// 本地引入
import config from '@Config'
import styles from '@Styles'
import { pageSelectAuction } from '@Api/index'
import { setModalVisibleStatus } from '@Store/Actions'
import IndexCard from './_component/IndexCard'

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
      value: '美食',
      indexData: [],
    }
    this.onChange = value => {
      this.setState({ value })
    }
    this.clear = () => {
      this.setState({ value: '' })
    }
    this.imgHeight = this.imgHeight.bind(this)
    this.initData = this.initData.bind(this)
  }
  // 初始化数据
  async initData() {
    const data = await pageSelectAuction()

    if (data.status === 401) {
      ToastAndroid.showWithGravity('用户认证失效，将前往登录页', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.props.navigation.navigate('Login')
      return
    }
    if (data.code === 0) {
      ToastAndroid.showWithGravity('无订单信息', ToastAndroid.SHORT, ToastAndroid.CENTER)
      // 无首页信息
      this.setState({
        indexData: [],
      })
      return
    }
    if (data.code === -1) {
      this.setState({
        indexData: data.value,
      })
      return
    }
    ToastAndroid.showWithGravity('服务发生错误，请检查网络连接', ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  imgHeight(url) {
    let myHeight = 250
    let screenWidth = Dimensions.get('window').width
    Image.getSize(url, (width, height) => {
      //width 图片的宽度
      //height 图片的高度
      myHeight = Math.floor((screenWidth / width) * height)
    })
    return myHeight
  }
  componentDidMount() {
    this.initData()
  }

  render() {
    const { navigation } = this.props
    let indexImg = ['https://s1.ax1x.com/2020/04/21/J37ky4.jpg', 'https://s1.ax1x.com/2020/04/21/J37eT1.jpg']
    return (
      <ScrollView>
        <View style={viewStyles.container}>
          <SearchBar value={this.state.value} placeholder="搜索" onSubmit={value => Alert.alert(value)} onCancel={this.clear} onChange={this.onChange} showCancelButton />
          <Carousel style={viewStyles.wrapper} selectedIndex={2} infinite afterChange={this.onHorizontalSelectedIndexChange}>
            {indexImg.map((value, index) => {
              return (
                <View style={[viewStyles.containerHorizontal]}>
                  <Image style={{ width: Dimensions.get('window').width, height: this.imgHeight(value) }} source={{ uri: value }} />
                </View>
              )
            })}
          </Carousel>
          {/* <Button title="Go to Search" onPress={() => navigation.navigate('Search')} /> */}
          <FlatList data={this.state.indexData} renderItem={({ item }) => <IndexCard nav={navigation} order={item} />} />
        </View>
      </ScrollView>
    )
  }
}

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    paddingTop: 5,
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
})
