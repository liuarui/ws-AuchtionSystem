import React from 'react'
import connect from 'redux-connect-decorator'
import { View, Text, Animated, Easing, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
// 本地引入
import config from '@Config'
import styles from '@Styles'
import { setModalVisibleStatus } from '@Store/Actions'

// @connect(
//   state => ({
//     timeline: state.home.timeline,
//   }),
//   {
//     setModalVisibleStatus,
//   },
// )
export default class AuctionListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <View style={viewStyles.container}>
        <Text>主页</Text>
      </View>
    )
  }
}

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    paddingTop: 5,
  },
})
