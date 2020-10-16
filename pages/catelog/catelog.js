var app = getApp()

Page({
  data: {
    userInfo: {},
  },

  onLoad: function () {
    var that = this;
    //获取用户信息
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },

  tolist: function (param) {
    wx.navigateTo({
      url: '/pages/todo/todo',
    })
  },

  toeat: function (param) {
    wx.navigateTo({
      url: '/pages/toeat/toeat',
    })
  }
})
