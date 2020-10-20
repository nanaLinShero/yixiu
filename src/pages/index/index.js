//index.js
Page({
  data: {
    
  },
  nfc: null,
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  
  onLoad: function () {
    
  },
  onHide() {
    if (this.nfc) {
      this.nfc.stopDiscovery()
    }
  },

  writeNFC() {
    console.log('writeNFC')
    const nfc = wx.getNFCAdapter()
    this.nfc = nfc

    wx.getHCEState({
      success (res) {
        console.log(res.errCode)
      }
    })

    function discoverHandler(res) {
      console.log(res)
      if (res.techs.includes(nfc.tech.ndef)) {
        console.log(res.messages)
        const ndef = nfc.getNdef()
        ndef.writeNdefMessage({
          uris: ['https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getNFCAdapter.html'],
          complete(res) {
            console.log('res:', res)
          },
          success(res) {
            console.log('写入成功', res)
          },
          fail(res) {
            console.log('写入失败', res)
          },
        })
        return
      }
      console.log(nfc.tech)
      // mifareUltralight
      // if (res.techs.includes(nfc.tech.nfcA)) {
      //   const nfcA = nfc.getNfcA()
      //   nfcA.connect({
      //     complete(res) {
      //       console.log('res2:', res)
      //     },
      //     success(res) {
      //       console.log('读取成功', res)
      //     },
      //   })
      //   nfcA.transceive({
      //     data: new ArrayBuffer(0),
      //     complete(res) {
      //       console.log('res:', res)
      //     }
      //   })
      //   return
      // }

      if (res.techs.includes(nfc.tech.mifareUltralight)) {
        const mifareUltralight = nfc.getMifareUltralight()
        mifareUltralight.connect({
          complete(res) {
            console.log('res2:', res)
          },
          success(res) {
            console.log('读取成功', res)
          },
        })
        mifareUltralight.transceive({
          data: new ArrayBuffer(0),
          complete(res) {
            console.log('res:', res)
          }
        })
        return
      }
    }

    nfc.onDiscovered(discoverHandler)
    nfc.startDiscovery({
      fail(err) {
        console.log('failed to discover:', err)
      }
    })
  }
})
