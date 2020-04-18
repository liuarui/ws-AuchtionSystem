import React from 'react'
import { Text, View, FlatList, ToastAndroid, StyleSheet } from 'react-native'
import { Tabs } from '@ant-design/react-native'

import { getUserOrder } from '@Api/user'
import ListCard from './_component/ListCard'

export default class MyAuctionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.route.params.type,
      orderData: [], // 订单数据,
      order0: [],
      order1: [],
      order2: [],
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
      this.setState(
        {
          orderData: data.value,
        },
        () => {
          let temp0 = []
          let or0 = this.state.orderData.forEach(item => {
            if (item.type === 0) {
              temp0.push(item)
            }
          })
          let temp1 = []
          let or1 = this.state.orderData.forEach(item => {
            if (item.type === 1) {
              temp1.push(item)
            }
          })
          let temp2 = []
          let or2 = this.state.orderData.forEach(item => {
            if (item.type === 2) {
              temp2.push(item)
            }
          })

          this.setState({
            order0: temp0,
            order1: temp1,
            order2: temp2,
          })
        },
      )
      return
    }
    ToastAndroid.showWithGravity('服务发生错误，请检查网络连接', ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  render() {
    const tabs = [{ title: '全部' }, { title: '竞拍中' }, { title: '竞拍成功' }, { title: '竞拍失败' }]
    const { navigation } = this.props
    const style = {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    }
    const succe = this.state.orderData
    return (
      <View style={{ flex: 1 }}>
        <Tabs onChange={this.initData} tabs={tabs} page={this.state.type} tabBarActiveTextColor={'#e02223'} renderUnderline={() => null}>
          <View style={style}>
            <FlatList data={this.state.orderData} renderItem={({ item }) => <ListCard nav={navigation} order={item} />} />
          </View>
          <View style={style}>
            <FlatList data={this.state.order2} renderItem={({ item }) => <ListCard nav={navigation} order={item} />} />
          </View>
          <View style={style}>
            <FlatList data={this.state.order0} renderItem={({ item }) => <ListCard nav={navigation} order={item} />} />
          </View>
          <View style={style}>
            <FlatList data={this.state.order1} renderItem={({ item }) => <ListCard nav={navigation} order={item} />} />
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
