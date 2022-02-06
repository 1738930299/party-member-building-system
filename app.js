//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'dangjian-2gl0l4af8dd6dcb4',
      traceUser:true
    })
  },
  globalData: {
    userInfo: null
  }
})
