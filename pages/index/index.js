let app = getApp();
let animationShowHeight = 300; 
const LENGTH = 10;


Page({
	data: {
    adv: [
      '../../picture/7.jpg',
      '../../picture/8.jpg',
      '../../picture/10.jpg'
      
		],
		id:"",
		user_id:"",
		list:[],
		obj_info:[],

    /*-------公告--------*/
		noticeList: [{
			id: 1,
			content: '欢迎'
		},{
			id: 2,
			content: '这里党员信息平台'
		}],
    /*----------*/

	},
	
	onLoad: function(){

	},
	onShow:function(e){

		//获取全局数据
	 
		let val = app.searchWord;
		this.setData({
			id:val
		})
		console.log("this.data.id",this.data.id)
   }
  })