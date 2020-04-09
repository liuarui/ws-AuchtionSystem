/*
  入口文件
*/

import React, { Component } from 'react'
import { Text, StatusBar } from 'react-native'
import { Provider } from 'react-redux' // 引入redux容器
// 本地文件引入
import configStore from '@Store'
import Config from '@Config'
import styles from '@Styles'
// import Modals from '@Modals'
import AppContainer from './Navigator'

const store = configStore()

export default function App() {
  return (
    <Provider store={store}>
      {/* 导航容器 */}
      <AppContainer />
    </Provider>
  )
}
