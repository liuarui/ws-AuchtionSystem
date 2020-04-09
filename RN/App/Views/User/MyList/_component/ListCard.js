import React from 'react'
import { View, Text, Animated, Easing, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '@Styles'
import { filterAuctonState } from '@Utils/dictionary'
export default class UserCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.starAuction = this.starAuction.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
  }
  starAuction() {}
  deleteOrder() {}
  render() {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={viewStyles.card}>
          <View>
            <Text>{this.props.cTime}</Text>
            <Text>{filterAuctonState(this.props.state)}</Text>
          </View>
          <View>
            {/* // 图片 */}
            <View>
              右块
              <Text>{this.props.title}</Text>
              <TouchableOpacity onPress={this.starAuction}>
                <View>收藏</View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.deleteOrder}>
                <View>删除</View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const viewStyles = StyleSheet.create({
  card: {},
})
