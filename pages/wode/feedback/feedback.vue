<template>
	<view class="outbox">
		<view style='margin-bottom:100px;flex-direction: column;'>
		  <view v-for="(items,index) in array" :key="index" style="display: block;">
			<view v-for="(itemName,idx) in items" :key="idx" style="justify-content: flex-end;">
			<view v-if="itemName.type=='B'" class='block'>
			  <view class='time'><view>{{itemName.date}}</view></view>
			  <view class='user'>
				<text class='userfeed'>{{itemName.msg}}</text>
				<image class="userinfo-avatar" :src="itemName.icon?itemName.icon:'../../../static/images/yonghu.png'" mode="scaleToFill"></image>
			  </view>
			</view>
			<view v-if="itemName.type=='A'" class='block'>
			  <view class='time'><view>{{itemName.date}}</view></view>
			  <view class='wbkj'>
				<image class="userinfo-avatar" :src="itemName.icon?itemName.icon:'../../../static/images/yonghu.png'" mode="scaleToFill"></image>
				<text class='wbkjfeed'>{{itemName.msg}}</text>      
			  </view>
			</view>
		  </view>  
		</view> 
		<view v-if="showBottom" class="dixian">-----人家可是有底线的！-----</view> 
		</view>

		<view class="fankui">
		  <button @tap='fankui'> 我要反馈 </button>
		</view>
	</view>
</template>

<script>
	var userid = "";
	var page=1;
	export default {
		data() {
			return {
				array:[],
				showBottom:false,
			};
		},
		methods:{
			fankui:function(){
				uni.navigateBack({
				  delta: 1
				})
			}
		},
		onLoad: function (options) {
			page=1;
			var that=this;
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
					console.log(res.data);
					userid = res.data;
					var param = {
					UserId: userid,
					page: page,
					limit:10,
					};
					uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatOpinionSel',
					method: 'POST',
					data: param,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						console.log(res.data);
						page++;
						that.array=res.data;
					}
					})
			  }
			})
		},
		onReachBottom: function () {
			console.log("触发了下拉刷新事件。");
			// Do something when page reach bottom.
			var that = this;
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
					console.log(res.data);
					userid = res.data;
					var param = {
					UserId: userid,
					page: page,
					limit: 10,
					};
					uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatOpinionSel',
					method: 'POST',
					data: param,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						console.log(res.data);
						if (res.data.length==0){
							that.showBottom=true;
						}else{
						page++;
						console.log(that.array);
						var newArr = that.array.concat(res.data);
						that.array=newArr;
						that.showBottom=false;
						}
					}
					})
			  }
			})
		},
	}
</script>

<style>
	.outbox{
		flex-direction: column;
		width: 100%;
	}
	.user{
	  display: flex;
	  justify-content:flex-end;
	  align-content: center;
	}
	.wbkj{
	  display: flex;
	  justify-content:flex-start;
	  align-content: center;
	}
	.userinfo-avatar{
	  display: block;
	  overflow: hidden;
	  width: 80upx;
	  height: 80upx;
	  border: 2px solid #fff;
	  border-radius: 50%;
	}
	.userfeed{
	  background-color: #04d5c4;
	  color: #fff;
	  max-width: 500upx;
	  border-radius: 30upx;
	  padding:0 20upx;
	  margin-right: 20upx;
	  font-size: 28upx;
	  height:80upx;
	  line-height: 80upx
	}
	.userfeed::after{

		position: absolute;  

		content: ''; 

		width:0; height:0; font-size:0; overflow:hidden; 

		border-width:8px; 

		border-style:solid dashed dashed; 

		border-color: transparent transparent #ffffff; 

		top:-15px; 

		left:103px; 

	}
	.wbkjfeed{
	  background-color: #F6F8F8;
	  max-width: 500upx;
	  border-radius: 30upx;
	  padding: 20upx;
	  margin-left: 20upx;
	}
	.time{
	  width: 100%;
	  text-align: center;
	  margin-top: 10upx;
	  margin-bottom: 10upx;
	}
	.block{
	  padding: 20upx;
	  flex-direction: column;
	}
	.time view{
	  color: #DADADA;
	  font-size: 12px;
	}
	button{
	  left: 20upx;
	  width: 710upx;
	  position: fixed;
	  bottom: 50upx;  
	  border-radius: 50upx;
	  color:#fff;
	  background-color:#04d5c4;
	  font-size: 28upx;
	}
	.button-hover {
	  background-color: #fff;
	  color: #04d5c4;
	  font-size: 28upx;
	}
	.dixian{
		width:100%;
		justify-content: center;
		color:#04d5c4;
    padding: 10rpx;
		background: #f4f4f4;
		font-size: 28rpx;
		
	}
	.fankui{
		width:100%;
		height:100px;
		position:fixed;
		bottom:0px;
		left:0px;
		background-color:#fff;
	}
</style>
