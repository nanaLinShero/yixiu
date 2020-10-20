//index.js
const app = getApp()

Page({
  data: {
    currentTab: 0
  },
  clickTab: function(e) {
    var that = this;
    if(that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
})
