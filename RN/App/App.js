import React, { Component } from 'react'
import { Text, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native' // 引入react-navigation容器
import { Provider } from 'react-redux' // 引入redux容器
// 私有文件引入
import configStore from '@Store'
import Config from '@Config'
import styles from '@Styles'
// import Modals from '@Modals'
import AppContainer from './Navigator'

const store = configStore()

export default function App() {
  return (
    <Provider store={store}>
      {/* 状态栏 */}
      {/* <StatusBar barStyle="light-content" /> */}
      {/* 导航容器 */}
      <AppContainer />
      {/* <NavigationContainer>
        <Text>容器123</Text>
      </NavigationContainer> */}
    </Provider>
  )
}
