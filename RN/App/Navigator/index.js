// In App.js in a new project

import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
/* 引入路由组件开始 */
// 主页部分
import Home from '@Views/Home'
import Search from '@Views/Home/Search'
// 拍品瀑布流部分
import AuctionList from '@Views/AuctionList'
import AuctionDetails from '@Views/AuctionList/AuctionDetails'
// 个人中心部分
import User from '@Views/User'
import MyFavorite from '@Views/User/MyFavorite'
import MyAuction from '@Views/User/MyAuction'
import Setting from '@Views/User/Setting'
/* 引入路由组件结束 */
const Tab = createBottomTabNavigator()

const HomeStack = createStackNavigator()
const AuctionListStack = createStackNavigator()
const UserStack = createStackNavigator()

function AppContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTap" options={{ title: '主页' }}>
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen name="Home" component={Home} options={{ title: '主页' }} />
              <HomeStack.Screen name="Search" component={Search} options={{ title: '搜索页' }} />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="AuctionTap" options={{ title: '精选拍品' }}>
          {() => (
            <UserStack.Navigator>
              <UserStack.Screen name="AuctionList" component={AuctionList} options={{ title: '精选拍品' }} />
              <UserStack.Screen name="AuctionDetails" component={AuctionDetails} options={{ title: '拍品详情' }} />
            </UserStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="UserTap" options={{ title: '我的' }}>
          {() => (
            <UserStack.Navigator initialRouteName="Login">
              <UserStack.Screen name="Login" component={User} options={{ title: '登陆' }} />
              <UserStack.Screen name="Register" component={User} options={{ title: '注册' }} />
              <UserStack.Screen name="User" component={User} options={{ title: '个人中心' }} />
              <UserStack.Screen name="MyFavorite" component={MyFavorite} options={{ title: '收藏' }} />
              <UserStack.Screen name="MyAuction" component={MyAuction} options={{ title: '我的拍卖品' }} />
              <UserStack.Screen name="Setting" component={Setting} options={{ title: '设置' }} />
            </UserStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer
