import React from 'react'
import connect from 'redux-connect-decorator'
import { Alert, View, Text, Animated, Easing, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import { Icon, SearchBar, TabBar } from '@ant-design/react-native'
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
    this.state = {
      value: '美食',
    }
    this.onChange = (value) => {
      this.setState({ value })
    }
    this.clear = () => {
      this.setState({ value: '' })
    }
  }

  componentDidMount() {}

  render() {
    const { navigation } = this.props

    return (
      <View style={viewStyles.container}>
        <SearchBar value={this.state.value} placeholder="搜索" onSubmit={(value) => Alert.alert(value)} onCancel={this.clear} onChange={this.onChange} showCancelButton />
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
