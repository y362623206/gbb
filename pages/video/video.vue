<template>
	<view class="container">
		<video id="myVideo" :src="key" controls style="width:100%"></video>
		<view class="swiper-tab">
		  <view class="swiper-tab-item" :class="currentTab==0?'active':''" data-current="0" @tap="clickTab">简介</view>
		  <view class="swiper-tab-item" :class="currentTab==1?'active':''" data-current="1" @tap="clickTab">评论</view>
		</view>
		<view v-if="currentTab==0" class="jianjie">
			<view>{{jianjie}}</view>
		</view>
		<view v-if="currentTab==1" style="flex-direction: column;">
		  <view class="section" style="margin-bottom:20upx">
			<view class="pltj">
			  <view class="tj-pf">{{averScore}}</view>
			  <view class="tj-pl">
				<view>共{{total}}条评论</view>
				<view>好评率<text style="color:#04D5C4">{{goodrate}}</text></view>
			  </view>
			  <view class="pl-btn" @tap='write'>
				<text class="write">写评论</text>
			  </view>
			</view>
			<view class="haoping">
			   <view class="pj" :class="type=='D'?'active-pj':''"  @tap='changeTab' data-name='D'>全部</view>
			   <view class="pj" :class="type=='A'?'active-pj':''" @tap='changeTab' data-name='A'>好评/{{good}}</view>
			   <view class="pj" :class="type=='B'?'active-pj':''" @tap='changeTab' data-name='B'>中评/{{middle}}</view>
			   <view class="pj" :class="type=='C'?'active-pj':''" @tap='changeTab' data-name='C'>差评/{{short}}</view>
			</view>
		  </view>
		  <view v-for="(item,index) in list" :key="index" class="section">
			<view class="item-content">
			  <view class="item-xinxi">         
				<image :src="item.grade__participation__admin_basics_movement__icon == null?'../../static/images/yonghu.png':item.grade__participation__admin_basics_movement__icon" class="userimg"></image>
				<view>{{item.grade__participation__admin_basics_movement__nickname==null?"佚名":item.grade__participation__admin_basics_movement__nickname}}
					
				</view>
			  </view>
			  <view class="userdate">{{item.grade__modificatime}}</view>
			</view>
			<view class="item-des">
			  {{item.grade__evaluate}}
			</view>
			<view class="item-des" style="display:flex">
			  <view v-for="(items, indexs) in item.xin" :key="indexs">
				<image src="../../static/images/selected.png" style="width:30upx" mode="widthFix"></image>
			  </view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				currentTab: 1,
                jianjie:'',
				good: '',		//好评数
				middle: '',	//中评数
				short: '',		//差评数
				goodrate: '',//好评率
				total: '',		//评论总数
				averScore: '',//平均得分
				type:'D',
				key: '',
				userid:'',
				grade: 3,
				huiyid:'',
				icon:'',
				nickname:'',
				list:[],
				qian: true,
				arr:[],
			};
		},
		methods:{
			clickTab(e) {
				if (this.currentTab === e.target.dataset.current) {
				  return false;
				} else {
				  this.currentTab =  e.target.dataset.current;
				}
			},
			write(){
				var that = this;
				if (uni.getStorageSync('userid') == '') {
					uni.showModal({
						title: '提示',
						content: '您还没有登录，请先登录',
						showCancel: false,
						success: function (res) {
							uni.navigateTo({
								url: '../bindphone/bindphone',
							})
						}
					})
					return false;
				}
				uni.navigateTo({
				  url: '../hypj/hypj?userid=' + that.userid + '&&id=' + that.huiyid 
				})
			},
			
			changeTab(e){
				var that = this;
				console.log(e.currentTarget.dataset.name);
				that.type = e.currentTarget.dataset.name;
				var param = {
				  id: that.huiyid,
				  types: that.type
				};
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/GovernmentSchool_SelEvaluate',
				  method: 'POST',
				  data: param,
				  header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
				  success: function (res) {
					if(res.data.length == 0){
					  that.list = [];
					  return false;
					}
					if (res.data[0].grade__modificatime != null) {
					  for (var i = 0; i < res.data.length; i++) {
						var num = res.data[i].grade__grade;
						var date = res.data[i].grade__modificatime;
						date = date.substring(0, 10);
						var arr = [];
						for (var j = 0; j < num; j++) {
						  arr.push(1);
						}
						res.data[i].xin = arr;
						res.data[i].grade__modificatime = date;
					  }
					  console.log(res.data);
					  that.list = res.data;
					}
				  }
				})
			  },
		},
		onLoad(options) {
		   var that = this;
		   var key = options.src;
		   var id = options.id;
		   var des = options.des;
		   that.key = key;
		   that.huiyid = id;
		   that.jianjie = des;
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				that.userid = res.data;
				
			  }
			})
			var param = {
				id:id,
				types:that.type
			};
			uni.request({
				url: 'https://www.wanbaokj.xyz/MobileTerminal/GovernmentSchool_SelEvaluate',
				method: 'POST',
				data: param,
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				},
			  success: function (res) {
				if (res.data.length == 0) {
					that.list = [];
					return false;
				}
				if (res.data[0].grade__modificatime != null) {
					for(var i=0; i<res.data.length; i++){
					var num = res.data[i].grade__grade;
					var date = res.data[i].grade__modificatime;
					date = date.substring(0, 10);
					var arr = [];
					for(var j=0; j<num; j++){
						arr.push(1);
					}
					res.data[i].xin = arr;
					res.data[i].grade__modificatime = date;
					}
					console.log(res.data);
					that.list = res.data;
				}
				}
			})
      uni.request({
        url: 'https://www.wanbaokj.xyz/MobileTerminal/GovernmentSchool_SelGrade',
				method: 'POST',
				data: {id: id},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				},
				success: function (res) {
				that.good = res.data.good;
				that.middle = res.data.middle;
				that.short = res.data.short;
				if(res.data.length == 0){
					that.goodrate = 0 + '%';
					that.total = 0;
					that.averScore = '0.0';
				}
				else{
					that.goodrate = ((res.data.good / res.data.length) * 100).toFixed(0)+'%';
					that.total = res.data.length;
					that.averScore = (res.data.total / res.data.length).toFixed(1);
				}
				}
			})
		},
		onShow() {
			var that=this;
			console.log("局部刷新");
			var param = {
				id:that.huiyid,
				types:that.type
			};
			uni.request({
				url: 'https://www.wanbaokj.xyz/MobileTerminal/GovernmentSchool_SelEvaluate',
				method: 'POST',
				data: param,
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				},
				success: function (res) {
				if (res.data.length == 0) {
					that.list = [];
					return false;
				}
				if (res.data[0].grade__modificatime != null) {
					for(var i=0; i<res.data.length; i++){
					var num = res.data[i].grade__grade;
					var date = res.data[i].grade__modificatime;
					date = date.substring(0, 10);
					var arr = [];
					for(var j=0; j<num; j++){
						arr.push(1);
					}
					res.data[i].xin = arr;
					res.data[i].grade__modificatime = date;
					}
					console.log(res.data);
					that.list = res.data;
				}
				}
			})
			uni.request({
				url: 'https://www.wanbaokj.xyz/MobileTerminal/GovernmentSchool_SelGrade',
				method: 'POST',
				data: {id: that.huiyid},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				},
				success: function (res) {
				that.good = res.data.good;
				that.middle = res.data.middle;
				that.short = res.data.short;
				if(res.data.length == 0){
					that.goodrate = 0 + '%';
					that.total = 0;
					that.averScore = '0.0';
				}
				else{
					that.goodrate = ((res.data.good / res.data.length) * 100).toFixed(0)+'%';
					that.total = res.data.length;
					that.averScore = (res.data.total / res.data.length).toFixed(1);
				}
				}
			})
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
	background: #efeff4;
}

.section{
  border-bottom:1px solid #f1f1f1;
  padding: 20upx;
  background: #fff;
  flex-direction: column;
  flex:1;
}

.item-content{
  align-items: center;
  justify-content:space-between;
  font-size: 25upx;
}
.item-xinxi{
 align-items: center;
}
.userdate{
  color:#666;
}
.item-des{
  padding-left:20upx;
  font-size:30upx;
}
.userimg{
  width:50upx;
  height:50upx;
  overflow: hidden;
  border-radius: 50%;
  margin: 20upx;
}
.swiper-tab{
  width: 100%;
  background: #fff;
  justify-content: center;
  height: 88upx;
  line-height: 88upx;
  font-weight: bold;
  margin-bottom: 20upx;
  color:#B5B5B5;
}
.swiper-tab-item{
  flex:1;
  justify-content: center;
}
.active{
  color:#000;
  border-bottom: 2px solid #04D5C3;
}
.pltj{
  align-items:center;
}
.tj-pf{
  flex:1;
  color: #ff9500;
  font-size: 65upx;
  font-weight: bold;
  padding-left:10upx;
}
.tj-pl{
  flex:2;
  color: #8f8f94;
  font-size:30upx;
  flex-direction: column;
}
.pl-btn{
  flex:1;
  justify-content: flex-end;
  font-size:25upx;
}
.write {
    border-radius: 10upx;
    color: #04D5C4;
    border:1px solid #04D5C4;
    padding:10upx 20upx;
    text-align: center;
}
.haoping{
  align-items: center;
  justify-content: space-around;
}
.pj{
  flex:1;
  border: 1px solid #f0eff4;
  font-size:30upx;
  margin: 10upx;
  justify-content: center;
  padding: 5upx 0;
}
.active-pj{
  border-color:#04D5C3;
}
.jianjie{
	flex-direction: column;
	background: #fff;
	color:#484848;
	padding: 20upx;
	font-size: 30upx;
}
</style>
