import React from 'react'
import { Text, View, ToastAndroid, StyleSheet } from 'react-native'
import { Tabs } from '@ant-design/react-native'

import { getUserOrder } from '@Api/user'
export default class MyAuctionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.route.params.type,
      orderData: [], // 订单数据
    }
    this.initData = this.initData.bind(this)
  }
  componentWillMount() {
    this.initData()
  }
  // 初始化数据
  async initData() {
    const data = await getUserOrder()

    if (data.status === 401) {
      ToastAndroid.showWithGravity('用户认证失效，将前往登录页', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.props.navigation.navigate('Login')
      return
    }
    if (data.code === 0) {
      ToastAndroid.showWithGravity('无订单信息', ToastAndroid.SHORT, ToastAndroid.CENTER)
      // 无订单信息
      this.setState({
        orderData: [],
      })
      return
    }
    if (data.code === -1) {
      ToastAndroid.showWithGravity('请求订单信息成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.setState({
        orderData: data.value,
      })
      return
    }
    ToastAndroid.showWithGravity('服务发生错误，请检查网络连接', ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  render() {
    const tabs = [{ title: '全部' }, { title: '竞拍中' }, { title: '竞拍成功' }, { title: '竞拍失败' }]

    const style = {
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      backgroundColor: '#fff',
    }

    return (
      <View style={{ flex: 1 }}>
        <Tabs tabs={tabs} page={this.state.type} tabBarActiveTextColor={'#e02223'} renderUnderline={() => null}>
          <View style={style}>
          </View>
          <View style={style}>
            <Text>Content of Second Tab</Text>
          </View>
          <View style={style}>
            <Text>Content of Third Tab</Text>
          </View>
          <View style={style}>
            <Text>Content of Third Tab</Text>
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
