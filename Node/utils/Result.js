// 返回结果生成函数

// 只有查询失败的时候才会返回 success = false
/*
  SUCCESS(-1, "请求成功！"),
  RESULT_EMPTY(0, "结果为空！"),
  PARAM_ERROR(1, "参数有误！"),
  RUNTIME_ERROR(2, "服务器异常！"),
  DATA_CONFLICT(3, "数据冲突！")
*/
class Result {
  jsonResult(parm = {}, msg = '', success = true, value = [], code = -1) {
    return {
      ...parm,
      success: success,
      value: value,
      code: code,
      msg: msg,
    }
  }
  resultHandle(oldResult, otherParm = '') {
    if (oldResult.length === 0 || oldResult === 0) {
      // 结果为空
      return this.jsonResult({}, '结果为空！', true, [], 0)
    } else if (oldResult === 1) {
      // 参数有误
      return this.jsonResult({}, '参数有误！', false, [], 1)
    } else if (oldResult === 3) {
      // 数据冲突！
      return this.jsonResult({}, '数据冲突！', true, [], 3)
    } else if (otherParm === '') {
      // 请求成功！不带totel
      return this.jsonResult({}, '请求成功！', true, oldResult, -1)
    } else {
      //请求成功带total
      return this.jsonResult(otherParm, '请求成功！', true, oldResult, -1)
    }
  }
}

module.exports = new Result()
