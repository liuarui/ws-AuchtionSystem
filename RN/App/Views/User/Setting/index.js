import React from 'react'
import connect from 'redux-connect-decorator'
import { View, Text, Animated, Easing, FlatList, ToastAndroid, StyleSheet, TouchableOpacity, AsyncStorage, Button } from 'react-native'
// 本地引入
import config from '@Config'
import styles from '@Styles'

import UserCard from '../_component/UserCard'
import { logout } from '@Api/user'
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
    this.fetchLogout = this.fetchLogout.bind(this)
  }

  componentDidMount() {}
  // 注销功能
  async fetchLogout() {
    const result = await logout()

    if (result.code === -1) {
      ToastAndroid.showWithGravity('注销成功，将前往登录页', ToastAndroid.SHORT, ToastAndroid.CENTER)
      await AsyncStorage.removeItem('token')
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
      return
    }
    ToastAndroid.showWithGravity('当前用户已注销', ToastAndroid.SHORT, ToastAndroid.CENTER)
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  }
  render() {
    const { navigation } = this.props

    return (
      <View style={viewStyles.container}>
        <UserCard title="账号设置" />
        <UserCard title="注销" press={this.fetchLogout} />

        <Button
          title="Go to login"
          onPress={() =>
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          }
        />
        <Button title="Go to 注册" onPress={() => navigation.replace('Login', { type: 1 })} />
        <Button title="Go to 修改密码" onPress={() => navigation.replace('Login', { type: 2 })} />
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
