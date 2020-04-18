// 竞拍状态
export function filterAuctonState(state) {
  switch (state) {
    case 0:
      return '竞拍成功'
    case 1:
      return '竞拍失败'
    case 2:
      return '竞拍中'
    default:
      return '测试状态'
  }
}
// 拍品状态
export function filterState(state) {
  switch (state) {
    case 0:
      return '竞拍中'
    case 1:
      return '已下架'
    case 2:
      return '已售出'
    default:
      return '测试状态'
  }
}
