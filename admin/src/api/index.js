import request from '../utils/request'

const fetchData = query => {
  request({
    url: './table.json',
    method: 'get',
    params: query,
  })
}

export default fetchData
