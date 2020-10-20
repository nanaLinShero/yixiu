
Component({
  data: {
    selected: 0,
    color: "#fff",
    selectedColor: "#d53030",
    backgroundColor: "#000",
    "list": [{
      "pagePath": "/pages/index/index",
      "text": "录制"
    }, {
      "pagePath": "/pages/material/index",
      "text": "素材库"
    }, {
      "pagePath": "/pages/resource/index",
      "text": "资源"
    }, {
      "pagePath": "/pages/me/index",
      "text": "我的"
    }] 
  },
  lifetimes: {
    attached: function() {
    }
  },
  methods: {
    switchTab: function(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({url})
    }
  }
})