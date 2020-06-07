import React from 'react'
import connect from 'redux-connect-decorator'
import { View, Text, Button, Animated, Image, Easing, Dimensions, FlatList, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Carousel } from '@ant-design/react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import io from 'socket.io-client'
import socket from '@Network/socket.js'
export default class AuctionRecordScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      newPrize: props.route.params.price,
      aucId: props.route.params.aucId,
    }
    this.onUserBid = this.onUserBid.bind(this)
    this.init = this.init.bind(this)
    this.test = this.test.bind(this)
    this.setBidList = this.setBidList.bind(this)
    socket.on('Bid', this.onUserBid)
  }
  async init() {
    let userId = await AsyncStorage.getItem('userId')
    socket.emit('userJoined', userId, this.state.aucId)
  }
  async test() {
    let userId = await AsyncStorage.getItem('userId')
    socket.emit('userBid', userId, this.state.aucId, this.state.newPrize + 1)
  }
  async onUserBid(obj) {
    this.setBidList(obj)
    let userId = await AsyncStorage.getItem('userId')
    socket.emit('userJoined', userId, this.state.aucId)
    // let list = obj.list
  }
  setBidList(list) {
    if (list.length === 0) {
      return
    }
    let newa = list[0].bid
    this.setState({
      list: list,
      newPrize: newa,
    })
  }
  componentDidMount() {
    this.init()
  }
  componentWillUpdate(){
    this.init()
  }

  render() {
    return (
      <ScrollView>
        <Button title={'快速加价1元'} onPress={this.test} />
        <FlatList
          data={this.state.list}
          renderItem={({ item }) => {
            return (
              <Text>
                出价人uid:{item.userId} 出价:{item.bid} 出价时间: {`${new Date(item.createTime).toLocaleString()}`}
              </Text>
            )
          }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
})
