// request get 请求
const httpPost = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: data,
      success: function (res) {
        if (res.code == 300) {
          //TODO token失效
        }
        //TODO 回传所有数据
        resolve(res.data);
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const showModal = (title, content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}



export default {
  httpPost,
  showModal
}
