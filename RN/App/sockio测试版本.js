import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, Button, ToastAndroid } from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['测试数据'],
      ws: {},
      mes: '',
    }
    this.sendMes = this.sendMes.bind(this)
    this.outRoom = this.outRoom.bind(this)
    this.WebSocketConnect = this.WebSocketConnect.bind(this)
  }
  componentDidMount() {}
  // 创建websocket函数
  WebSocketConnect() {
    let ws = new WebSocket('ws://liuarui.top:6633')

    ws.onopen = () => {
      ws.send('有不知名用户进入聊天室') // send a message
      ToastAndroid.show(`加入聊天室成功`, ToastAndroid.SHORT)
    }
    ws.onmessage = e => {
      // a message was received
      let temp = this.state.list

      console.log('服务端发来消息', e.data)
      temp.push(e.data)
      this.setState({
        list: temp,
      })
    }
    ws.onerror = e => {
      console.log('错误信息', e.message)
      ToastAndroid.show(`${e.message}`, ToastAndroid.SHORT)
    }
    ws.onclose = e => {
      ws.send('不知名用户退出聊天室')
      console.log('退出信息', e.code, e.reason)
    }
    this.setState({
      ws: ws,
    })
  }
  sendMes() {
    console.log('触发成功')
    this.state.ws.send(this.state.mes)
  }
  outRoom() {
    this.state.ws.close()
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.list} renderItem={({ item }) => <Text style={styles.item}>{item}</Text>} />
        <TextInput style={{ height: 40 }} placeholder="输入消息" onChangeText={mes => this.setState({ mes })} value={this.state.mes} />
        <Button onPress={this.sendMes} title="发送消息" color="lightblue" />
        <Button onPress={this.WebSocketConnect} title="加入聊天室" color="lightblue" />
        <Button onPress={this.outRoom} title="退出聊天室" color="#841584" />
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
