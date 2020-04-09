import React from 'react'
import { View, Text, Animated, Easing, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { outlineGlyphMap } from '@ant-design/icons-react-native/lib/outline'
import styles from '@Styles'
export default function UserCard(props) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={props.iconName === undefined ? props.press : () => navigation.navigate(`${props.toRoute}`)}>
      <View style={viewStyles.box}>
        {props.iconName === undefined ? null : <Ionicons name={props.iconName} size={26} style={{ ...viewStyles.icon, color: '#e02235' }} />}
        <Text style={props.iconName === undefined ? viewStyles.noIconTitleText : viewStyles.titleText}>{props.title}</Text>
        <Text style={viewStyles.titleRight}>></Text>
      </View>
    </TouchableOpacity>
  )
}

const viewStyles = StyleSheet.create({
  box: {
    height: 45,
    position: 'relative',
    ...styles.grayBorder,
  },
  titleText: {
    position: 'absolute',
    fontSize: 16,
    lineHeight: 45,
    left: 40,
  },
  noIconTitleText: {
    position: 'absolute',
    fontSize: 16,
    lineHeight: 45,
    left: 20,
  },
  titleRight: {
    position: 'absolute',
    lineHeight: 45,
    right: 20,
    color: '#CDCDCD',
    fontSize: 25,
  },
  icon: {
    left: 10,
    lineHeight: 45,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBlock: {
    height: 170,
  },
  myListBlock: {
    height: 135,
  },
})
