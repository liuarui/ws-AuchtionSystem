import React from 'react'
import connect from 'redux-connect-decorator'
import { View, Text, Button, Animated, Image, Easing, Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Carousel } from '@ant-design/react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
// 本地引入
import config from '@Config'
import { setModalVisibleStatus } from '@Store/Actions'
import { getAuction } from '@Api/auction'
import io from 'socket.io-client'
// @connect(
//   state => ({
//     timeline: state.home.timeline,
//   }),
//   {
//     setModalVisibleStatus,
//   },
// )
export default class AuctionRecordScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  init() {
    var socket = io('http://localhost')
    socket.on('news', function(data) {
      console.log(data)
      socket.emit('my other event', { my: 'data' })
    })
  }
  componentDidMount() {
    this.init()
  }

  render() {
    return (
      <ScrollView>
        <Text>111</Text>
        <Button title={'123'} onPress={this.init} />
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
