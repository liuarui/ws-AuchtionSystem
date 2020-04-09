import req from '@Network'
import types from '../Types'
import { createAction } from 'redux-actions'

export const initUserToken = createAction(types.INIT_USER_TOKEN)

export function login(parms) {
  return  dispatch => {
     req.post('/users/login', parms).then(res => {
      const token = res.token

      console.log('登录请求成功，请求token为', token)
      dispatch(initUserToken(token))
    })
  }
}
