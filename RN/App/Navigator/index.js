// In App.js in a new project

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
/* 引入路由组件开始 */
// 主页部分
import Home from '@Views/Home'
import Search from '@Views/Home/Search'
// 拍品瀑布流部分
import AuctionList from '@Views/AuctionList'
import AuctionDetails from '@Views/AuctionList/AuctionDetails'
// 个人中心部分
import User from '@Views/User'
import Login from '@Views/User/Login.js'
import MyFavorite from '@Views/User/MyFavorite'
import MyAuction from '@Views/User/MyAuction'
import MyList from '@Views/User/MyList'
import Setting from '@Views/User/Setting'
/* 引入路由组件结束 */
const Tab = createBottomTabNavigator()

const HomeStack = createStackNavigator()
const AuctionListStack = createStackNavigator()
const UserStack = createStackNavigator()
// 导航头样式设置
const common = {
  headerStyle: {
    backgroundColor: '#23252b',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

function AppContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'HomeTap') {
              iconName = 'ios-home'
            } else if (route.name === 'AuctionTap') {
              iconName = 'ios-book'
            } else if (route.name === 'UserTap') {
              iconName = 'ios-man'
            }
            return <Ionicons name={iconName} size={26} style={{ color: '#e02235' }} />
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="HomeTap" options={{ title: '主页' }}>
          {() => (
            <HomeStack.Navigator screenOptions={common}>
              <HomeStack.Screen name="Home" component={Home} options={{ title: '主页' }} />
              <HomeStack.Screen name="Search" component={Search} options={{ title: '搜索页' }} />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="AuctionTap" options={{ title: '精选拍品' }}>
          {() => (
            <UserStack.Navigator screenOptions={common}>
              <UserStack.Screen name="AuctionList" component={AuctionList} options={{ title: '精选拍品' }} />
              <UserStack.Screen name="AuctionDetails" component={AuctionDetails} options={{ title: '拍品详情' }} />
            </UserStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="UserTap" options={{ title: '我的' }}>
          {() => (
            <UserStack.Navigator screenOptions={common} initialRouteName="User">
              <UserStack.Screen name="Login" component={Login} options={{ title: '登录页' }} />
              <UserStack.Screen name="User" component={User} options={{ title: '个人中心' }} />
              <UserStack.Screen name="MyList" component={MyList} options={{ title: '我的订单' }} />
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
