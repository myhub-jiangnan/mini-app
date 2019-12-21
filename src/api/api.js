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
      success: async function(res) {
        if (res.code == 0) {
          //TODO 回传所有数据
          resolve(res.data);
        } else if (res.code == 300) {
          //TODO token失效
          //调用/app/public/getToken 获取新的token 同时判断是否需要重新获取用户信息以及手机号
          console.log('token失效，需要重新调用/app/public/getToken');
        } else {
          console.log(res);
          reject(res.msg);
        }
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

// 获取设备列表
const getApiDeviceList = async function(obj) {
  // 获取设备列表
  let res1 = await api.httpPost(
    'http://flow.dev.redsoul.cn/app/device/getDeviceList',
    obj
  );
  // 设置信息数组
  let deviceArrayLength = res1.data.pageRows.length;
  if (deviceArrayLength === 0) {
    that.isFalse = true;
  } else {
    that.isFalse = false;
    let deviceArray = res1.data.pageRows;
    for (let i = 0; i < deviceArray.length; i++) {
      let deviceObj = {};
      deviceObj.deviceId = deviceArray[i].deviceMac;
      deviceObj.deviceName = deviceArray[i].deviceName;
      deviceObj.deviceAddress = deviceArray[i].deviceAddress;
      deviceObj.deviceStatus = deviceArray[i].deviceStatus;
      deviceObj.deviceOnlineStatus = deviceArray[i].deviceOnlineStatus;
      that.deviceInfoArray.push(deviceObj);
    }
    that.$apply();
  }
};

export default {
  httpPost,
  showModal
};
