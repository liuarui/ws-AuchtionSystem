import React from 'react'
import { View, Text, Image, ToastAndroid, Dimensions, Animated, Easing, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '@Styles'
import { filterAuctonState } from '@Utils/dictionary'
import { star } from '@Api/user'
import { getAuction } from '@Api/auction'
import starTrue from '@assets/star/starTrue.png'
import starFalse from '@assets/star/starFalse.png'

export default class ListCard extends React.Component {
  constructor(props) {
    super(props)
    let cT = new Date(props.order.createTime).toLocaleString()
    // console.log(new Date(cT).getTime())
    console.log(66666, cT)
    this.state = {
      id: props.order.id,
      aucId: props.order.aucId,
      aucState: props.order.type,
      cTime: cT,
      star: props.order.star,
      auction: {},
    }
    this.starAuction = this.starAuction.bind(this)
    this.initData = this.initData.bind(this)
  }
  componentWillMount() {
    this.initData()
  }
  async initData() {
    const result = await getAuction({ data: { aucId: this.state.aucId } })
    this.setState({
      auction: result.value[0],
    })
  }
  // 收藏功能
  async starAuction() {
    const result = await star({ data: { aucId: this.state.aucId } })

    if (result.code === -1) {
      console.log('收藏请求成功')
      if (result.star === true) {
        this.setState({
          star: true,
        })
        ToastAndroid.showWithGravity(`${result.msg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
      } else if (result.star === false) {
        this.setState({
          star: false,
        })
        ToastAndroid.showWithGravity(`${result.msg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
    }
  }
  render() {
    const aucState = this.state.aucState
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.nav.navigate('AuctionDetails', { aucId: this.state.aucId })
          }}>
          <View style={viewStyles.card}>
            <View style={viewStyles.cardTop}>
              <Text style={viewStyles.cardTopTime}>{this.state.cTime}</Text>
              <Text style={viewStyles.cardTopState}>{filterAuctonState(aucState)}</Text>
            </View>
            <View style={{ ...viewStyles.cardBody, ...bor }}>
              <View style={{ flexGrow: 1 }}>
                <Image style={{ width: 180, height: 180 }} source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }} />
              </View>
              <View style={{ ...bor, ...viewStyles.bodyRight }}>
                <Text style={viewStyles.bodyRightText}>{this.state.auction.name ? this.state.auction.name : '商品名称加载中'}</Text>
                <View style={viewStyles.bodyRightTime}>
                  <Text>在家块</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.starAuction}>
                  {this.state.star ? <Image style={{ width: 20, height: 20 }} source={starTrue} /> : <Image style={{ width: 20, height: 20 }} source={starFalse} />}
                  <Text style={viewStyles.caardButton}>收藏</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const bor = {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#000',
}
let MainWidth = Dimensions.get('window').width
const viewStyles = StyleSheet.create({
  card: {
    height: 250,
    width: MainWidth,
    borderBottomColor: '#e3e4e4',
    borderBottomWidth: 10,
  },
  cardTop: {
    height: 32,
    borderBottomColor: '#e3e4e4',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  cardTopTime: {
    paddingLeft: 10,
    color: '#8c8c8c',
    fontSize: 15,
    lineHeight: 32,
  },
  cardTopState: {
    position: 'absolute',
    right: 10,
    color: '#e23f57',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 32,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 10,
  },
  bodyRight: {
    flexGrow: 1,
    width: 190,
  },
  bodyRightTime: {
    height: 100,
  },
  bodyRightText: {
    fontWeight: '700',
    height: 40,
  },
  cardButton: {
    color: '#cdcdcd',
  },
})
