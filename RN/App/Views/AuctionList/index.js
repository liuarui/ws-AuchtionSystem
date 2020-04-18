import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableHighlight, Image, Text, View } from 'react-native'
import connect from 'redux-connect-decorator'
// 本地引入
import config from '@Config'
import { setModalVisibleStatus } from '@Store/Actions'
import CountDownReact from '@Components/CountDown'
export default class AuctionListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      atime: new Date(2020, 4, 15),
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View style={[{ paddingTop: 40, marginTop: 70 }]}>
        {/*2.*/}
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
            date={this.state.atime}
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
    )
  }
}

const viewStyles = StyleSheet.create({
  cardItemTimeRemainTxt: {
    fontSize: 20,
    color: '#ee394b',
  },
})
