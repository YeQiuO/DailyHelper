import { formatTime } from '../../utils/util.js'

Page({

  data: {
    logs: []
  },

  onLoad: function () {
    this.setData({
      //logs仅返回登录时间
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return formatTime(new Date(log))
      })
    })
  }

})
