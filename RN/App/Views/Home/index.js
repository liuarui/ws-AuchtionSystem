import React from 'react'
import connect from 'redux-connect-decorator'
import { View, Text, Animated, Easing, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
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
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const { navigation } = this.props

    return (
      <View style={viewStyles.container}>
        <Text>主页</Text>
        <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />
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
