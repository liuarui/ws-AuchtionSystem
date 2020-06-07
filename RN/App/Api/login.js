import req from '@Network'
// 登录
export async function login(parms) {
  const result = await req
    .post('/users/login', parms)
    .then(res => {
      const token = res.token
      console.log('登录请求成功，请求token为', token)
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
export async function reg(parms) {
  const result = await req
    .post('/users/register', parms)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
export async function changePwd(parms) {
  const result = await req
    .post('/users/updateUserPassword', parms)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
