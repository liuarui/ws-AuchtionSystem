import React from 'react'
import connect from 'redux-connect-decorator'
import { View, Text, TextInput, Animated, AsyncStorage, ToastAndroid, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native'

// 本地引入
import config from '@Config'
import styles from '@Styles'
import { login, reg, changePwd } from '@Api/login'

// @connect(
//   state => ({
//     token: state.app.token,
//   }),
//   {
//     login,
//   },
// )
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'admin',
      password: 'admin',
      ensurepwd: '', // 确认密码
      oldpwd: '',
      isReg: false, // 判断是否注册
      loading: false, //切换按钮状态
      type: 0, // 0为登录功能 1为注册功能 2为修改密码
    }
    this.fetchLogin = this.fetchLogin.bind(this)
    this.register = this.register.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeType = this.changeType.bind(this)
    this.showLoading = this.showLoading.bind(this)
    this.hideLoading = this.hideLoading.bind(this)
  }
  componentDidMount() {
    this.getToken()
  }
  // 显示loading
  showLoading() {
    this.setState({
      loading: true,
    })
  }
  // 关闭loading
  hideLoading() {
    this.setState({
      loading: false,
    })
  }
  // 登录函数 ，获取token存储在storage
  async fetchLogin() {
    this.showLoading()
    let result = await login({ data: { username: this.state.username, password: this.state.password } })

    console.log(result)
    if (result.code === -1) {
      // 登录成功
      this.hideLoading()
      await AsyncStorage.setItem('token', result.token)
      ToastAndroid.showWithGravity('登录成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'User' }],
      })
      return
    } else if (result.code === 0) {
      this.hideLoading()
      //用户名未注册或密码错误
      ToastAndroid.showWithGravity('用户名未注册或密码错误', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    this.hideLoading()
    return ToastAndroid.showWithGravity('网络错误，请检查网络连接', ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  // 用户注册
  async register() {
    let result = await reg({ data: { username: this.state.username, password: this.state.password } })

    console.log(result)
    if (result.code === -1) {
      this.hideLoading()
      ToastAndroid.showWithGravity('注册成功，前往登录吧！', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.setState({
        type: 0,
      })
      return
    } else if (result.register === true) {
      this.hideLoading()
      //用户名已被注册
      ToastAndroid.showWithGravity('用户名已被注册', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    this.hideLoading()
    return ToastAndroid.showWithGravity('网络错误，请检查网络连接', ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  // 修改密码
  async changePassword() {
    this.showLoading()
    let result = await changePwd({ data: { username: this.state.username, oldPassword: this.state.oldpwd, newPassword: this.state.ensurepwd } })

    console.log(result)
    if (result.code === -1) {
      // 登录成功
      this.hideLoading()
      ToastAndroid.showWithGravity('修改成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    } else if (result.code === 0) {
      this.hideLoading()
      //用户名未注册或密码错误
      ToastAndroid.showWithGravity(result.msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    this.hideLoading()
    return ToastAndroid.showWithGravity('网络错误，请检查网络连接', ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  // 进入初始化
  async getToken() {
    try {
      const value = await AsyncStorage.getItem('token')
      const type = this.props.route.params.type

      if (type === 1 || type === 2) {
        this.setState({
          type: type,
        })
        return
      }
      if (value !== null) {
        // We have data!!
        console.log('通过认证', value)
        ToastAndroid.showWithGravity('通过认证,前往个人中心', ToastAndroid.SHORT, ToastAndroid.CENTER)
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'User' }],
        })
      } else {
        ToastAndroid.showWithGravity('客户端认证失败,前往登录页', ToastAndroid.SHORT, ToastAndroid.CENTER)
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  // 功能切换函数  0登录 1注册 2修改密码
  changeType(type) {
    this.setState({ type: type, password: '' })
  }

  render() {
    const { navigation, route } = this.props

    // 登录
    if (this.state.type === 0) {
      return (
        <View style={viewStyles.container}>
          <Input
            placeholder="用户名"
            label="用户名"
            value={this.state.username}
            onChangeText={username => {
              this.setState({ username })
            }}
          />
          <Input secureTextEntry={true} placeholder="密码" label="密码" value={this.state.password} onChangeText={password => this.setState({ password })} />
          {this.state.loading ? (
            <Button type="warning" loading>
              登录中
            </Button>
          ) : (
            <Button type="warning" style={{ marginTop: 20, borderRadius: 10 }} onPress={this.fetchLogin}>
              登录
            </Button>
          )}
          <WingBlank
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Button type="ghost" size="small" onPress={this.changeType.bind(this, 1)}>
              前往注册
            </Button>
            <Button type="ghost" size="small" onPress={this.changeType.bind(this, 2)}>
              忘记密码
            </Button>
          </WingBlank>
        </View>
      )
    }
    // 注册
    if (this.state.type === 1) {
      return (
        <View style={viewStyles.container}>
          <Input
            placeholder="用户名"
            label="用户名"
            value={this.state.username}
            errorMessage={!this.state.isReg ? '' : '当前用户名已被注册'}
            onChangeText={username => this.setState({ username, isReg: false })}
          />
          <Input secureTextEntry={true} placeholder="密码" label="密码" value={this.state.password} onChangeText={password => this.setState({ password })} />
          <Input
            secureTextEntry={true}
            placeholder="确认密码"
            label="确认密码"
            value={this.state.ensurepwd}
            errorMessage={this.state.password === this.state.ensurepwd ? '' : '请确认两次密码输入一致'}
            onChangeText={ensurepwd => this.setState({ ensurepwd })}
          />
          {this.state.loading ? (
            <Button type="warning" loading>
              注册中
            </Button>
          ) : (
            <Button style={{ marginTop: 20, borderRadius: 10 }} type="warning" onPress={this.register}>
              注册
            </Button>
          )}
          <WingBlank
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Button type="ghost" size="small" onPress={this.changeType.bind(this, 0)}>
              返回登录
            </Button>
          </WingBlank>
        </View>
      )
    }
    // 修改密码
    if (this.state.type === 2) {
      return (
        <View style={viewStyles.container}>
          <Input placeholder="用户名" label="用户名" value={this.state.username} errorMessage={this.state.isReg ? '用户名未注册' : ''} onChangeText={username => this.setState({ username })} />
          <Input secureTextEntry={true} placeholder="旧密码" label="旧密码" value={this.state.oldpwd} onChangeText={oldpwd => this.setState({ oldpwd })} />
          <Input secureTextEntry={true} placeholder="新密码" label="新密码" value={this.state.password} onChangeText={password => this.setState({ password })} />
          <Input
            secureTextEntry={true}
            placeholder="确认新密码"
            label="确认新密码"
            errorMessage={this.state.password === this.state.ensurepwd ? '' : '请确认两次密码输入一致'}
            value={this.state.ensurepwd}
            onChangeText={ensurepwd => this.setState({ ensurepwd })}
          />
          {this.state.loading ? (
            <Button type="warning" loading>
              修改中
            </Button>
          ) : (
            <Button style={{ marginTop: 20, borderRadius: 10 }} type="warning" onPress={this.changePassword}>
              修改密码
            </Button>
          )}
          <WingBlank
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Button type="ghost" size="small" onPress={this.changeType.bind(this, 0)}>
              返回登录
            </Button>
          </WingBlank>
        </View>
      )
    }
  }
}

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    paddingTop: 5,
  },
})
