import util from "../../utils/util.js";

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
    curIpt: '',
    showAll: true,
    lists: [],
    curRange: [],
    curRangend: [],
    curBegin: 0,
    curFinish: 1,
    remind: []
  },

  onLoad: function () {
    var that = this;
    //获取之前保留在缓存里的todolist数据
    wx.getStorage({
      key: 'todolist',
      success: function (res) {
        if (res.data) {
          that.setData({
            lists: res.data
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

  iptChange(e) {
    let timeArr = util.setTimeHalf();
    this.setData({
      curIpt: e.detail.value,
      curRange: timeArr,
      curRangend: timeArr,
      curBegin: 0,
      curFinish: 1,
    })
  },

  formReset() {
    this.setData({
      curIpt: '',
      curRange: []
    })
  },

  formSubmit() {
    let cnt = this.data.curIpt, newLists = this.data.lists, i = newLists.length, begin = this.data.curRange[this.data.curBegin], finish = this.data.curRange[this.data.curFinish];
    if (cnt) {
      newLists.push({ id: i, content: cnt, done: false, beginTime: begin, finishTime: finish, editing: false });
      this.setData({
        lists: newLists,
        curIpt: ''
      });
    }
    this.saveData();
  },

  beginChange(e) {
    let rang = this.data.curRange.slice();
    this.setData({
      curBegin: e.detail.value,
      curFinish: 1,
      curRangend: rang.splice(e.detail.value, rang.length-1),
    });
    // console.log(this.data.curRange);
    // console.log(this.data.curRangend);
  },

  finishChange(e) {
    this.setData({
      curFinish: e.detail.value
    })
  },

  //修改备忘录
  toChange(e) {
    let i = e.target.dataset.id;
    this.setData({
      lists: editArr(this.data.lists, i, { editing: true })
    })
  },

  iptEdit(e) {
    let i = e.target.dataset.id;
    this.setData({
      lists: editArr(this.data.lists, i, { content: e.detail.value })
    })
  },

  saveEdit(e) {
    let i = e.target.dataset.id;
    this.setData({
      lists: editArr(this.data.lists, i, { editing: false })
    });
    this.saveData();
  },

  setDone(e) {
    let i = e.target.dataset.id, originalDone = this.data.lists[i].done;
    this.setData({
      lists: editArr(this.data.lists, i, { done: !originalDone })
    });
    this.saveData();
  },

  toDelete(e) {
    let i = e.target.dataset.id, newLists = this.data.lists;
    newLists.map(function (l, index) {
      if (l.id == i) {
        newLists.splice(index, 1);
      }
    })
    this.setData({
      lists: newLists
    });
    this.saveData();
  },

  doneAll() {
    let newLists = this.data.lists;
    newLists.map(function (l) {
      l.done = true;
    })
    this.setData({
      lists: newLists
    });
    this.saveData();
  },

  deleteAll() {
    this.setData({
      lists: [],
      remind: []
    });
    this.saveData();
  },

  showUnfinished() {
    this.setData({
      showAll: false
    });
    this.saveData();
  },

  showAll() {
    this.setData({
      showAll: true
    });
    this.saveData();
  },

  saveData() {
    let listsArr = this.data.lists;
    wx.setStorage({
      key: 'todolist',
      data: listsArr
    })
  },
  
})
