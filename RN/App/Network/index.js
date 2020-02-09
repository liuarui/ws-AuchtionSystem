import conifg from '@Config';

function _buildQuery(obj) {
<<<<<<< HEAD:RN/App/Network/index.js
  const _ = encodeURIComponent

  return Object.keys(obj).map(k => `${_(k)}=${_(obj[k])}`).join('&')
=======
  const _ = encodeURIComponent;

  return Object.keys(obj)
    .map(k => `${_(k)}=${_(obj[k])}`)
    .join('&');
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Network/index.js
}

class Req {
  constructor() {
    this.baseUrl = conifg.prodBaseUrl;
  }

  _httpDone(res) {
    if (!res.err_code) {
<<<<<<< HEAD:RN/App/Network/index.js
      return res
    }
    return Promise.reject(res)

=======
      return res;
    }
    return Promise.reject(res);
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Network/index.js
  }

  _httpFail(err) {
    return Promise.reject(err);
  }

  fetch({ url, query, data, headers, method = 'GET' }) {
    url = this.baseUrl + url;
    if (query) {
      url += `?${_buildQuery(query)}`;
    }
    const params = {
      url,
      method,
<<<<<<< HEAD:RN/App/Network/index.js
      credentials: 'same-origin'
    }
=======
      credentials: 'same-origin',
    };
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Network/index.js

    if (data) {
      params.body = JSON.stringify(data);
    }
    if (headers) {
      params.headers = headers;
    }
    return fetch(url, params)
      .then(resp =>
        resp.ok ? resp.json().then(this._httpDone) : this._httpFail(resp),
      )
      .catch(err => Promise.reject(err));
  }

  get(url, params = {}) {
    params.url = params.url || url;
    return this.fetch(params);
  }

  post(url, params = {}) {
    params.url = params.url || url;
    params.method = 'POST';
    return this.fetch(params);
  }
}

export default new Req();
