/**
 * 入口文件
 */

import { AppRegistry } from 'react-native'
import App from './App/App.js'
import { name as appName } from './app.json'
// react-native-gesture-handler for Android支持
import 'react-native-gesture-handler'

AppRegistry.registerComponent(appName, () => App)
