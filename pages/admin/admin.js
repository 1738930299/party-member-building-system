// pages/admin/admin.js
let app = getApp();
const db_user = wx.cloud.database().collection("user")
let shanid = ''
let chat = ''
let mianmao =''
let id =''
let name=''
let pwd=''
let sfz=''
let minzu=''
let password=''
let tel=''
let class1=''
let user_id=''
Page({

  /**
   * 页面的初始数据
   */
  data:{
    info: {},
    new_name:"",
    new_class:"",
    new_id:"",
    new_pwd:"",
    minzu:"",
    chat:"",
    mianmao:"",
    sfz:"",
    tel:"",
    shanid:"",
    class:"",
    name:"",
    pwd:"",
    
    hiddenmodalput:true,
    hiddenmodalput1:true
  },
  // 云数据库导入云端excel
  cdb2excel: function () {
    wx.cloud.callFunction({
      name: 'CDB2excel',
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res)
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] 调用失败：', err)
      }
    })
  },
   //下载excel
   downloadexcel:function(){
    wx.cloud.downloadFile({
      fileID: 'cloud://....../cdb2exceltest.xlsx',  // 填写云存储中的url
      success: res => {
        wx.openDocument({
          filePath: res.tempFilePath ,
          success: function (res){
            console.log('打开文档成功')
          }
        })
      },
      fail: err => {
       console.log('打开文档失败')
      }
    })
    },
  //获取添加的新名字
  new_name(e){ 
    this.setData({
      new_name:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }

  },
  //获取添加的新班级
  new_class(e){ 
    this.setData({
      new_class:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }
  },
  //获取添加的新id
  new_id(e){ 
    this.setData({
      new_id:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }
  },
  //获取添加的新密码
  new_pwd(e){ 
    this.setData({
      new_pwd:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }
  },
  mianmao(e){
    this.setData({
      mianmao:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }
  },
  chat(e){
    this.setData({
      chat:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }
  },
  minzu(e){
    this.setData({
      minzu:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }
  },
  sfz(e){
    this.setData({
      sfz:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }
  },
  tel(e){
    this.setData({
      tel:e.detail.value
  })
  if(!e.detail.value){
    wx.showToast({
      title: '不为空',
      icon:"none"
    })
  }
  },
  //取消添加
  add_user_cancel(){
    this.setData({
      hiddenmodalput:true,
      hiddenmodalput1:true
  })
  },
  //确认添加
  add_user_confirm(){
    if(this.data.shanid){
    db_user.where({
      user_id:this.data.shanid
    }).remove()
    .then(res=>{
    console.log(res);
    wx.showToast({
      title: '已经删除旧信息',
      icon:"none"
    })
    });
  }
    db_user.where({
      user_id:this.data.new_id
    }).get().then(res=>{
      console.log(res)
        if(res.data[0]){
          
          wx.showToast({
            title: '用户名不唯一',
            icon:"none"
          })
          return


        }else{
          
          wx.cloud.database().collection('user').add({
            data:{
              class:this.data.new_class,
              name:this.data.new_name,
              user_id:this.data.new_id,
              password:this.data.new_pwd,
              sfz:this.data.sfz,
              mianmao:this.data.mianmao,
              tel:this.data.tel,
              minzu:this.data.minzu,
              chat:this.data.chat
            }
          }).then(res => {
            console.log()
          })
          wx.showToast({
            title: '加载成功',
            icon:"none"
          })
          this.setData({
            hiddenmodalput:true
        })
        }
    })
   
  },
  add_user(){
    this.setData({
      hiddenmodalput:false
  })
  },
  xiucha(){
    if(this.data.shanid!=''){
      db_user.where({
        user_id:this.data.shanid
      }).get().then(res=>{
        console.log(res)
          if(res.data[0]){
            
            wx.showToast({
              title: '载入数据中',
              icon:"none"
            })
            this.setData({
              name: res.data[0].name,
              count: res.data[0].user_id,
              class1:res.data[0].class,
              pwd:res.data[0].password,
              mianmao:res.data[0].mianmao,
              chat:res.data[0].chat,
              minzu:res.data[0].minzu,
              sfz:res.data[0].sfz,
              tel:res.data[0].tel                             
            })
            console.log(sfz)
            this.setData({
              hiddenmodalput1:false
          })
  
          
      }else{
        wx.showToast({
          title: '该生不存在',
          icon:"none"
        })
        return
      }
  
    })
}else{
    wx.showToast({
      title: '请先输入学号',
      icon:"none"
    })
    return
  }

  },
  shanid(e){
    this.setData({
      shanid:e.detail.value
  })
  },
shan(){
  db_user.where({
  user_id:this.data.shanid
}).remove()
.then(res=>{
console.log(res);
wx.showToast({
  title: '删除成功',
  icon:"none"
})
});

},
xxsh(){
  wx.navigateTo({
    url: '../xx/xx',
  })
},
onGotUserInfo:function(e){
  const that = this
  wx.cloud.callFunction({
    name:"login",
    success:res=>{
      console.log("云函数调用成功")
      that.setData({
        openid:res.result.openid,
        userinfo: e.detail.userInfo
      })
      that.data.userinfo.openid = that.data.openid
      console.log("userinfo", that.data.userinfo)
      wx.setStorageSync("userinfo", that.data.userinfo)
    },
    fail:res=>{
      console.log("云函数调用失败")
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(e){
	
   },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})