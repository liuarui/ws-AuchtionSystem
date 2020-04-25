import req from '@Network'

// 根据拍品id获取详情
export async function pageSelectAuction(parms) {
  const result = await req
    .post('/auction/pageSelectAuctionList', parms)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  return result
}
