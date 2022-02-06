Page({
  data: {
    active_index:0,
    isDisabled:false, 
    is_parsing:false, //是否显示解析
    fill_arr:[],//填空答案
    formData:[],  //提交的所有答案
    is_focus:false, //是否弹出键盘
    maxlength:'',  //答案输入框最大字数
    color_fill:null, // 答案文本框颜色
    subject:[
      { 
        analysis:"政治过硬、业务过硬、责任过硬、纪律过硬、作风过硬。",
        answer:["政","治","业","务"],
        id: 1,
        title:"新时代政法队伍“五个过硬”：__过硬、__过硬、责任过硬、纪律过硬、作风过硬。",
        type: 3
      },
      { 
        analysis:"政法委员",
        answer:["政","法","委","员"],
        id: 2,
        title:"《条例》规定乡镇（街道）党组织应配备____",
        type: 3
      }
    ],
  },
  onLoad: function (options) {
    let subject=this.data.subject
    subject.forEach(item=>{
        let title=item.title
        let titleArr=title.split('_')
        item.title=titleArr
    })
    this.setData({
      subject:subject
    })
  },
  // 填空答案
  inputfill(e){
    let val=e.detail.value
    let data=val.split("")
    this.setData({
      fill_arr:data,
      color_fill:data.length
    })
  },
  //点击填写
  changFill(e){
    let length=e.currentTarget.dataset.length
    this.setData({
      is_focus:true,
      maxlength:length-1
    })
    if(this.data.fill_arr==''){
      this.setData({
        color_fill:0
      })
    }
  },
  submit(){
    let active_index=this.data.active_index
    let subject=this.data.subject
    let fill_arr=this.data.fill_arr
    let formData=this.data.formData
    let type=subject[active_index].type
    if(fill_arr==''&&type==3){
      wx.showToast({
        title: '请填写答案',
        icon:"none"
      })
      return
    }
    formData.push({id:subject[active_index].id,content:fill_arr})
    console.log(formData)
    this.setData({
      formData:formData
    })
    let all= JSON.stringify(subject[active_index].answer)==JSON.stringify(fill_arr)
    if(all){

     if(active_index==subject.length-1){
       wx.showToast({
         title: '已完成所有题目',
       })
       console.log(this.data.formData)
       return
     }  
     active_index++
     this.setData({
       fill_arr:[],
       color_fill:null,
       active_index:active_index,
     })
    }else{
     this.setData({
       is_parsing:true,
       isDisabled:true
     })
    }
  },
  //下一题
  next(){
    let active_index=this.data.active_index
    let subject=this.data.subject
    if(active_index==subject.length-1){
      wx.showToast({
        title: '已完成所有题目',
      })
      console.log(this.data.formData)
      return
    }else{
      active_index++
      this.setData({
        fill_arr:[],
        color_fill:null,
        active_index:active_index,
        is_parsing:false,
        isDisabled:false
      })
    }
  },
})