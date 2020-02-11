import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, Button, ToastAndroid } from 'react-native'
// socket io 客户端包
// import io from 'socket.io-client'
export default class AuctionSystem extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   list: ['测试数据'],
    //   ws: {},
    //   mes: '',
    // }
    // this.sendMes = this.sendMes.bind(this)
    // this.outRoom = this.outRoom.bind(this)
    // this.WebSocketConnect = this.WebSocketConnect.bind(this)
  }
  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>容器123</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    paddingBottom: 10,
    fontSize: 15,
    height: 50,
  },
})
