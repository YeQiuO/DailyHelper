//更改数组 第三个参数是对象
function editArr(arr, i, editCnt) {
  let newArr = arr, editingObj = newArr[i];
  for (var x in editCnt) {
    editingObj[x] = editCnt[x];
  }
  return newArr;
}

var app = getApp()
Page({
  data: {
    userInfo: {},
    menu: ["麻辣香锅", "水饺", "烤串"],
    condition: -1,
    hiddenmodalput: true,
    hiddenlistmenu: true,
    hiddendelectmenu: true,
    newdish: "",
  },
  addmenu: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  input: function (e) {
    this.setData({
      newdish: e.detail.value,
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    let newmenu = this.data.menu;
    newmenu.push(this.data.newdish);
    this.setData({
      hiddenmodalput: true,
      menu: newmenu,
    });
    this.saveData();
  },

  listmenu: function () {
    this.setData({
      hiddenlistmenu: false,
    });
  },

  delectmenu: function () {
    this.setData({
      hiddendelectmenu: false,
    });
  },

  delectmenubutton(e) {
    let i = e.target.dataset.id, newmenu = this.data.menu;
    newmenu.splice(i, 1);
    this.setData({
      menu: newmenu
    });
    this.saveData();
  },

  back: function () {
    this.setData({
      hiddenlistmenu: true,
    });
  },

  back2: function () {
    this.setData({
      hiddendelectmenu: true,
    });
  },
  
  onLoad: function () {
    var that = this;
    //获取之前保留在缓存里的数据
    wx.getStorage({
      key: 'toeat',
      success: function (res) {
        if (res.data) {
          that.setData({
            menu: res.data
          })
        }
      }
    })
    //获取用户信息
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },

  getcondition() {
    let pa = this.data.menu.length;
    let condition = Math.floor(Math.random() * pa);
    this.setData({
      condition: condition,
    });
  },

  saveData() {
    let save = this.data.menu;
    wx.setStorage({
      key: 'toeat',
      data: save,
    })
  }

})
