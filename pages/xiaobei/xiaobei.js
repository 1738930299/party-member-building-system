// pages/xiaobei/xiaobei.js
var num=0;
var util=require('../../utils/util'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTopHeight: wx.getSystemInfoSync().statusBarHeight+30+7,
    viewBg:'#19da27',
    infoMess: '',
    userName: '',
    userN:'',
    passWd: '',
    passW:''
  },
  userNameInput:function(e){
    this.setData({
      userN:e.detail.value
    })
  },
  passWdInput:function(e){
    this.setData({
      passW:e.detail.value
    })
  },
  changeBg(){
    num++;
    var result=num/2;
    if(num%2==0){      
      this.setData({
        viewBg:'#19da27'
      })
    }else{
      this.setData({
        viewBg:'red'
      })
    }
    console.log(num)
    console.log(result)
  },
 

  getTime:function(){

    var that=this;

    var currentTime = util.formatTime(new Date());

    this.setData({

      time:time

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    var that = this;

    var time = time;

    setInterval(function(){

      that.setData({

          time: util.formatTime(new Date())

      });    

  },1000); 

     console.log(time)//打印时间日志

     },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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