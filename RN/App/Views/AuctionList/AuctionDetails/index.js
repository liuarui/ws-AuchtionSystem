import React from 'react'
import connect from 'redux-connect-decorator'
import { View, Text, Animated, Image, Easing, Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Carousel } from '@ant-design/react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
// 本地引入
import config from '@Config'
import { setModalVisibleStatus } from '@Store/Actions'
import { getAuction } from '@Api/auction'
// @connect(
//   state => ({
//     timeline: state.home.timeline,
//   }),
//   {
//     setModalVisibleStatus,
//   },
// )
export default class AuctionDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    // 处理未传参跳转情况错误
    if (props.route.params === undefined) {
      this.state = {
        aucId: 1,
        auction: {},
      }
    } else {
      this.state = {
        aucId: props.route.params.aucId,
        auction: {},
      }
    }

    this.initAuctionData = this.initAuctionData.bind(this)
  }
  // 初始化拍品详情数据
  async initAuctionData() {
    const result = await getAuction({ data: { aucId: this.state.aucId } })
    this.setState({
      auction: result.value[0],
    })
  }
  componentWillMount() {
    this.initAuctionData()
  }
  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('horizontal change to', index)
  }
  onVerticalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('vertical change to', index)
  }
  imgHeight() {
    let myHeight = 250
    let screenWidth = Dimensions.get('window').width
    Image.getSize('https://facebook.github.io/react-native/img/tiny_logo.png', (width, height) => {
      //width 图片的宽度
      //height 图片的高度
      myHeight = Math.floor((screenWidth / width) * height)
    })
    return myHeight
  }
  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <View>
          <View>
            {/* 轮播图 */}
            <Carousel style={styles.wrapper} selectedIndex={2} infinite afterChange={this.onHorizontalSelectedIndexChange}>
              {`${this.state.auction.imgArrayUrl}`.split(';').map((value,index) => {
                return(
                  <View style={[styles.containerHorizontal]}>
                    <Image style={{ width: Dimensions.get('window').width, height: this.imgHeight() }} source={{ uri: value }} />
                  </View>
                )
              })}
            </Carousel>
          </View>
          <Text style={{ height: 58, fontSize: 18,  marginBottom: 5 }}>{this.state.auction.name}</Text>
          <View style={{ height: 50, flexDirection: 'row',}}>
            <Text style={{ lineHeight: 20, flex: 1 }}>
              ` RMB {'\n'}`<Text style={{ color: '#e02323' }}>起拍价：</Text>
            </Text>
            <Text style={{ lineHeight: 50, fontSize: 40, fontWeight: '700', color: '#e02323', flex: 4 }}>{this.state.auction.price}</Text>
            {/* todo收藏颜色变化 */}
            <TouchableOpacity
              onPress={() => {
                '收藏逻辑'
              }}>
              <View style={{ flex: 2, marginRight: 20 }}>
                <Ionicons name={'ios-star'} size={26} style={{ color: '#e02235' }} />
                <Text>收藏</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ marginBottom: 5, color: '#999999', borderBottomColor: '#111', borderWidth: 1, borderStyle: 'solid' }}>收藏人数:</Text>
          <View style={{ height: 150, color: '#999999', borderBottomColor: '#111', borderWidth: 1, borderStyle: 'solid' }}>
            <Text style={{ fontSize: 18, borderBottomColor: '#999999', borderWidth: 1, borderStyle: 'solid' }}>{`拍卖记录 | ${6}条`}</Text>
          </View>
          <View style={{ height: 50, color: '#999999', borderBottomColor: '#111', borderWidth: 1, borderStyle: 'solid' }}>
            <Text style={{ fontSize: 18, lineHeight: 50 }}>{`提供者： ${this.state.auction.provider}`}</Text>
          </View>
          <Text>{this.state.auction.aucDesc}</Text>
        </View>
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
