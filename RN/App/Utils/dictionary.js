export function filterAuctonState(state) {
  switch (state) {
    case 0:
      return '竞拍成功'
    case 1:
      return '竞拍失败'
    case 2:
      return '竞拍中'
  }
}
