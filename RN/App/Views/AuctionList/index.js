import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableHighlight, ToastAndroid, TouchableOpacity, Image, Text, Dimensions, View, ScrollView, FlatList } from 'react-native'
import connect from 'redux-connect-decorator'
// 本地引入
import config from '@Config'
import { setModalVisibleStatus } from '@Store/Actions'
import CountDownReact from '@Components/CountDown'
import { pageSelectAuction } from '@Api/index'
const ScreenWidth = Dimensions.get('window').width
export default class AuctionListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      left: [],
      right: [],
      page: 1,
      size: 10,
      loadMore: false,
    }
    this.init = this.init.bind(this)
  }

  async init() {
    let result = await pageSelectAuction({ data: { page: this.state.page, size: 8 } })
    if (result.value.length === 0) {
      ToastAndroid.showWithGravity('没有了哦', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    this.setState({
      left: result.value.slice(0, Math.ceil(result.value.length / 2)),
      right: result.value.slice(Math.ceil(result.value.length / 2)),
      loadMore: false,
    })
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  componentDidMount() {
    this.init()
  }

  _onScroll(event) {
    if (this.state.loadMore) {
      return
    }
    let y = event.nativeEvent.contentOffset.y
    let height = event.nativeEvent.layoutMeasurement.height
    let contentHeight = event.nativeEvent.contentSize.height
    console.log('offsetY-->' + y)
    console.log('height-->' + height)
    console.log('contentHeight-->' + contentHeight)
    // if (y + height <= contentHeight - 100) {
    //   ToastAndroid.showWithGravity('上拉刷新', ToastAndroid.SHORT, ToastAndroid.CENTER)
    //   this.setState(
    //     {
    //       page: this.state.page + 1,
    //       loadMore: true,
    //     },
    //     () => {
    //       this.init()
    //       console.log(this.state.page)
    //     },
    //   )
    // }
    if (y + height >= contentHeight - 100) {
      ToastAndroid.showWithGravity('下拉刷新', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.setState(
        {
          page: this.state.page + 1,
          loadMore: true,
        },
        () => {
          this.init()
          console.log(this.state.page)
        },
      )
    }
  }
  render() {
    const { navigation } = this.props
    return (
      <ScrollView scrollEventThrottle={500} onScroll={this._onScroll.bind(this)}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexWrap: 'wrap' }}>
            {this.state.left.map((value, index) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('AuctionDetails', { aucId: value.aucId })}>
                  <Image style={{ height: this.random(150, 250), width: ScreenWidth / 2 - 5, marginRight: 10, marginBottom: 10 }} source={{ uri: value.easyImgUrl }} />
                  <Text>起拍价:{value.price}</Text>
                  <Text>{value.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={{ flexWrap: 'wrap' }}>
            {this.state.right.map((value, index) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('AuctionDetails', { aucId: value.aucId })}>
                  <Image style={{ height: this.random(170, 250), width: ScreenWidth / 2 - 5, marginRight: 10, marginBottom: 10 }} source={{ uri: value.easyImgUrl }} />
                  <Text>起拍价:{value.price}</Text>
                  <Text>{value.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const viewStyles = StyleSheet.create({
  cardItemTimeRemainTxt: {
    fontSize: 20,
    color: '#ee394b',
  },
})
// {
//   /* <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'baseline',
//               marginTop: 20,
//             }}>
//             <Text style={viewStyles.cardItemTimeRemainTxt}>距离开始还剩</Text>
//             <CountDownReact
//               //date={new Date(parseInt(seckill.endTime))}
//               // date={'2020-4-19T00:00:00+08:00'}
//               date={this.state.atime}
//               days={{ plural: '天 ', singular: '天 ' }}
//               hours=":"
//               mins=":"
//               segs=""
//               daysStyle={viewStyles.cardItemTimeRemainTxt}
//               hoursStyle={viewStyles.cardItemTimeRemainTxt}
//               minsStyle={viewStyles.cardItemTimeRemainTxt}
//               secsStyle={viewStyles.cardItemTimeRemainTxt}
//               firstColonStyle={viewStyles.cardItemTimeRemainTxt}
//               secondColonStyle={viewStyles.cardItemTimeRemainTxt}
//             />
//           </View> */
// }
