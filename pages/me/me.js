let app = getApp();
Page({
  data:{
    userinfo:{},
    info: {},
      user_id:"",
      mianmao:"",
      showModalStatus: false,
      animationData: null,
      hiddenmodalput:true,
      hiddenModal:true,
      old_pwd:"",
      new_pwd1:"",
      new_pwd2:"",
    openid:""
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
  onShow:function(e){
		this.setData({
			user_id:app.searchWord
		})
    let that=this
    wx.cloud.database().collection("user").where({
      user_id:this.data.user_id
    }).get({
      success(res){
        that.setData({
          info: {
            name: res.data[0].name,
            count: res.data[0].user_id,
            class:res.data[0].class,
            pwd:res.data[0].password,
            mianmao:res.data[0].mianmao
          }
        })
      }
    });
   },
   // 修改密码
  changePassword(){
    this.setData({
      hiddenmodalput: false
  })
  },
  //获取输入框
  old_pwd(e){ 
    this.setData({
     old_pwd:e.detail.value
  })
  },
  //获取输入框
  new_pwd1(e){
    this.setData({
     new_pwd1:e.detail.value
  })
  },
  //获取输入框
  new_pwd2(e){
    this.setData({
      new_pwd2:e.detail.value
   })
  },
  pwd_confirm(e){
    let that =this
    this.setData({
      hiddenmodalput: true
    })
    if(this.data.old_pwd!=this.data.info.pwd){
      wx.showToast({
        title: '原密码错误',
        icon:'none'
      })
    }else{
      if(this.data.new_pwd1!=this.data.new_pwd2){
        wx.showToast({
          title: '新密码不一致',
          icon:'none'
        })
      }else{
        //连接数据库修改密码
        console.log("连接数据库修改密码",this.data.user_id)
        wx.cloud.database().collection('user').where({
          user_id:this.data.user_id
        }).update({
          data :{
            password:that.data.new_pwd1
          },      
        })
      
      }
    }
  },
  pwd_cancel(e){
    this.setData({
      hiddenmodalput: true
  })
  },
  loginOut(){
    this.setData({
      hiddenModal: false
  })
  },
  logout_Confirm(){
    this.setData({
      hiddenModal: true
  })
    wx.navigateTo({
      url: '../../pages/login/login'
  })

  },
  sfm(){
    wx.navigateTo({
      url: '../../pages/xiaobei/xiaobei'
  })
  },
  logout_Cancel(){
    this.setData({
      hiddenModal: true
  })
  },
  onLoad:function(options){
    const ui = wx.getStorageSync('userinfo')
    this.setData({
      userinfo:ui,
      openid:ui.openid
    })
  }
})