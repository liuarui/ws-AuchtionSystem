import { PixelRatio, Dimensions, Platform } from 'react-native'

export function getRemoteAvatar(id) {
  return `https://loremflickr.com/70/70/people?lock=${id}`
}

export function isIphoneX() {
  const screenW = Dimensions.get('window').width,
    screenH = Dimensions.get('window').height

<<<<<<< HEAD:RN/App/Utils/index.js
  return Platform.OS === 'ios' && Number(String(screenH / screenW).substr(0, 4)) * 100 === 216
=======
  return (
    Platform.OS === 'ios' &&
    Number(String(screenH / screenW).substr(0, 4)) * 100 === 216
  )
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Utils/index.js
}
