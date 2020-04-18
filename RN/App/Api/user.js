import req from '@Network'

// 根据用户名获取用户信息
export async function getUserMes() {
  const result = await req
    .get('/users/getUserMes')
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
// 注销
export async function logout() {
  const result = await req
    .get('/users/logout')
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
// 获取用户订单信息
export async function getUserOrder() {
  const result = await req
    .get('/users/getUserOrder')
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
// 收藏
export async function star(parms) {
  const result = await req
    .post('/users/star', parms)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
// 获取用户所有收藏
export async function getUserStars() {
  const result = await req
    .get('/users/getUserStars')
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
