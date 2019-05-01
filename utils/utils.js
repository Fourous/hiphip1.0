function http(url, callBack, method = 'GET', data = '') {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // console.log(res);
      callBack(res.data);
    }
  })
}


module.exports = {
  http: http
}