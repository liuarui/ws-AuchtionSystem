/*
  通用配置文件
*/
import {
  Platform,
  StatusBar
} from 'react-native'

const Skin = {
    mainColor: '#e0223c',
    viewsBackgroundColor: '#f8f8f8',
    androidHeader: {
      height: 44,
      paddingTop: 0
    }
  },

  App = {
    baseUrl: 'https://liuarui.top:8443/api',
    defaultNavigation: {
      headerStyle: {
        ...Platform.select({
          android: {
            height: StatusBar.currentHeight + 44,
            paddingTop: StatusBar.currentHeight
          }
        }),
        backgroundColor: Skin.mainColor,
      },
      headerTintColor: '#fff'
    }
  }

export default {
  ...App,
  ...Skin
}
