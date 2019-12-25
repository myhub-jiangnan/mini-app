// const flowApiUrl = 'http://flow.dev.redsoul.cn';
// //const env = 'online';
// if (env == 'online') {
//   flowApiUrl = '....';
// }

// request get 请求
const httpPost = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        token: wx.getStorageSync('token')
      },
      data: data,
      success: async function (res) {
        // console.log("res数据信息：");
        // console.log(res);
        resolve(res.data);
        // if (res.data.code == 0) {
        //   // TODO 回传所有数据
        //   resolve(res.data);
        // } else if (res.data.code == 300) {
        //   //TODO token失效
          //调用/app/public/getToken 获取新的token 同时判断是否需要重新获取用户信息以及手机号
          // console.log('token失效，需要重新调用/app/public/getToken');
        //   let res2 = await wx.login({});
        //   if (res2.code) {
        //     // 拿到了code 就访问getToken 接口；
        //     let res3 = await wx.request({
        //       url: "http://flow.dev.redsoul.cn/app/public/getToken",
        //       method: "post",
        //       header: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         token: wx.getStorageSync('token')
        //       },
        //       data: res3.code,
        //       success: function (res4) { 
        //         let token = res3.data.token;
        //         wx.setStorageSync('token', token);
        //       }
        //     });              
        //   }
        // } else {
        //   console.log('接口失败错误信息：');
        //   console.log(res);
        //   reject(res.msg);
        
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
};

const showModal = (title, content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      success: function(res) {
        resolve(res);
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
};

export default {
  httpPost,
  showModal
};
