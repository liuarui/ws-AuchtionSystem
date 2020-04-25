import React from 'react'
import { View, Text, Image, ToastAndroid, Dimensions, Animated, Easing, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '@Styles'
import { filterState } from '@Utils/dictionary'
import { star } from '@Api/user'
import { getAuction } from '@Api/auction'
import CountDownReact from '@Components/CountDown'
import starTrue from '@assets/star/starTrue.png'
import starFalse from '@assets/star/starFalse.png'

export default class FavoriteCard extends React.Component {
  constructor(props) {
    super(props)
    let sT = props.star.startTime.toLocaleString()
    this.state = {
      id: props.star.id,
      aucId: props.star.aucId,
      aucState: props.star.state,
      sTime: sT, //
      star: props.star.star,
      auction: {},
    }
    this.starAuction = this.starAuction.bind(this)
    this.initData = this.initData.bind(this)
    this.compareTime = this.compareTime.bind(this)
  }
  componentWillMount() {
    this.initData()
  }

  // 比较时间 0 拍卖开始  1 拍卖待开始
  compareTime(stime, eTime) {
    let nowTime = new Date().getTime()
    let startTime = new Date(stime).getTime()
    let endTime = new Date(eTime).getTime()
    console.log('nowTime', nowTime)
    console.log('startTime', startTime)
    console.log('end', endTime)
    console.log(11123, this.state.auction)
    if (nowTime > startTime) {
      if (nowTime < endTime) {
        console.log('拍卖开始，且未结束')
        // 拍卖已经开始 且未结束
        return true
      }
      // 拍卖已经结束
      return -1
    }
    if (nowTime < startTime) {
      // 拍卖未开始
      return false
    }
  }
  // 初始化数据
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
    // const { navigation } = this.props.nav
    const startFlag = this.compareTime(this.state.auction.startTime, this.state.auction.endTime)
    if (this.props.type === '竞拍中') {
      if (startFlag === true) {
        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.nav.navigate('AuctionDetails', { aucId: this.state.aucId })
              }}>
              <View style={viewStyles.card}>
                <View style={viewStyles.cardTop}>
                  <Text style={viewStyles.cardTopTime}>{this.state.sTime}</Text>
                  <Text style={viewStyles.cardTopState}>{filterState(aucState)}</Text>
                </View>
                <View style={{ ...viewStyles.cardBody, ...bor }}>
                  <View style={{ flexGrow: 1 }}>
                    <Image style={{ width: 180, height: 180 }} source={{ uri: this.state.auction.easyImgUrl }} />
                  </View>
                  <View style={{ ...bor, ...viewStyles.bodyRight }}>
                    <Text style={viewStyles.bodyRightText}>{this.state.auction.name ? this.state.auction.name : '商品名称加载中'}</Text>
                    <View style={viewStyles.bodyRightTime}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          marginTop: 20,
                        }}>
                        <Text style={viewStyles.cardItemTimeRemainTxt}>距离结束还剩</Text>
                        <CountDownReact
                          //date={new Date(parseInt(seckill.endTime))}
                          // date={'2020-4-19T00:00:00+08:00'}
                          date={this.state.auction.endTime}
                          days={{ plural: '天 ', singular: '天 ' }}
                          hours=":"
                          mins=":"
                          segs=""
                          daysStyle={viewStyles.cardItemTimeRemainTxt}
                          hoursStyle={viewStyles.cardItemTimeRemainTxt}
                          minsStyle={viewStyles.cardItemTimeRemainTxt}
                          secsStyle={viewStyles.cardItemTimeRemainTxt}
                          firstColonStyle={viewStyles.cardItemTimeRemainTxt}
                          secondColonStyle={viewStyles.cardItemTimeRemainTxt}
                        />
                      </View>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.starAuction}>
                      <Text style={viewStyles.caardButton}>移除收藏</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
      // 拍卖已结束
      if (startFlag === -1) {
        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.nav.navigate('AuctionDetails', { aucId: this.state.aucId })
              }}>
              <View style={viewStyles.card}>
                <View style={viewStyles.cardTop}>
                  <Text style={viewStyles.cardTopTime}>{this.state.sTime}</Text>
                  <Text style={viewStyles.cardTopState}>{'已结束'}</Text>
                </View>
                <View style={{ ...viewStyles.cardBody, ...bor }}>
                  <View style={{ flexGrow: 1 }}>
                    <Image style={{ width: 180, height: 180 }} source={{ uri: this.state.auction.easyImgUrl }} />
                  </View>
                  <View style={{ ...bor, ...viewStyles.bodyRight }}>
                    <Text style={viewStyles.bodyRightText}>{this.state.auction.name ? this.state.auction.name : '商品名称加载中'}</Text>
                    <View style={viewStyles.bodyRightTime}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          marginTop: 20,
                        }}>
                        <Text style={viewStyles.cardItemTimeRemainTxt}>拍卖已结束</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.starAuction}>
                      <Text style={viewStyles.caardButton}>移除收藏</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
      return null
    }
    if (this.props.type === '待开始') {
      if (startFlag === false) {
        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.nav.navigate('AuctionDetails', { aucId: this.state.aucId })
              }}>
              <View style={viewStyles.card}>
                <View style={viewStyles.cardTop}>
                  <Text style={viewStyles.cardTopTime}>{this.state.sTime.toLocaleString()}</Text>
                  <Text style={viewStyles.cardTopState}>{filterState(aucState)}</Text>
                </View>
                <View style={{ ...viewStyles.cardBody, ...bor }}>
                  <View style={{ flexGrow: 1 }}>
                    <Image style={{ width: 180, height: 180 }} source={{ uri: this.state.auction.easyImgUrl }} />
                  </View>
                  <View style={{ ...bor, ...viewStyles.bodyRight }}>
                    <Text style={viewStyles.bodyRightText}>{this.state.auction.name ? this.state.auction.name : '商品名称加载中'}</Text>
                    <View style={viewStyles.bodyRightTime}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          marginTop: 20,
                        }}>
                        <Text style={viewStyles.cardItemTimeRemainTxt}>距离开始还剩</Text>
                        <CountDownReact
                          //date={new Date(parseInt(seckill.endTime))}
                          // date={'2020-4-19T00:00:00+08:00'}
                          date={this.state.auction.startTime}
                          days={{ plural: '天 ', singular: '天 ' }}
                          hours=":"
                          mins=":"
                          segs=""
                          daysStyle={viewStyles.cardItemTimeRemainTxt}
                          hoursStyle={viewStyles.cardItemTimeRemainTxt}
                          minsStyle={viewStyles.cardItemTimeRemainTxt}
                          secsStyle={viewStyles.cardItemTimeRemainTxt}
                          firstColonStyle={viewStyles.cardItemTimeRemainTxt}
                          secondColonStyle={viewStyles.cardItemTimeRemainTxt}
                        />
                      </View>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.starAuction}>
                      <Text style={viewStyles.caardButton}>移除收藏</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    }
    return null
  }
}
const bor = {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#000',
}
let MainWidth = Dimensions.get('window').width
const viewStyles = StyleSheet.create({
  // 倒计时样式
  cardItemTimeRemainTxt: {
    fontSize: 15,
    color: '#ee394b',
  },
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
