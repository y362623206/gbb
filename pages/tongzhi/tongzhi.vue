<template>
	<view class="container">
		<view v-if="networkType" class="denglu" @tap='denglu'><image src="../../static/images/denglu.png" style="width:70%;" mode="widthFix"></image></view>
		<view v-else class="container">
			<view v-for="(item,index) in list" :key="index" style="flex-direction: column;">
				<view style="justify-content: center;">
				<text class="time">{{item.modificatime}}</text>
				</view>
				<view class="content" @tap='detail(item.id)'>
				<view class="title">{{item.title}}</view>
				<image :src="item.thumbnail" style="width:100%;margin-top:20upx" mode="widthFix"></image>
				<view class="des">{{item.describe}}</view>
				<view class="chakan">
					<view style="color:#484848">立即查看</view>
					<image src="../../static/images/tubiao/shuangjt.png" style="width:30upx;" mode="widthFix"></image>
				</view>
				<view v-if="item.read__read != 1" class="weidu">
					 <image src="../../static/images/tubiao/cirle.png" style="width:15upx" mode="widthFix"></image>
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
				userid:'',
				list:'',
        pages:2,
				networkType:false
			};
		},
		methods:{
			detail(e){
				console.log(e);
				uni.navigateTo({
				  url: '../message/message?id=' + e,
				})
			},
			
			denglu (e) {
				uni.navigateTo({
					url: '../bindphone/bindphone',
				})
			},
		},
		onLoad() {
			var that = this;
			if (uni.getStorageSync('userid') == '') {
				that.networkType = true;
			}
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				that.userid = res.data;
				var param = {
				  UserId: that.userid,
				  page: 1,
				  limit: 5,
				};
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/NotificationMessage',
				  method: 'POST',
				  data: param,
				  header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				  },
				  success: function (res) {
					for(var i=0; i<res.data.data.length;i++){
					  res.data.data[i].modificatime = res.data.data[i].modificatime.substring(0,10);
					}
					that.list = res.data.data;
				  }
				})

			  }
			})
		},
		onShow() {
			var that = this;
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				that.userid = res.data;
				var param = {
				  UserId: that.userid,
				  page: 1,
				  limit: 5,
				};
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/NotificationMessage',
				  method: 'POST',
				  data: param,
				  header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				  },
				  success: function (res) {
					for(var i=0; i<res.data.data.length;i++){
					  res.data.data[i].modificatime = res.data.data[i].modificatime.substring(0,10);
					}
					that.list = res.data.data;
				  }
				})
			
			  }
			})
		},
		onReachBottom(){
			var that = this;
			if (that.list.length < 5){
			  return false;
			}
			uni.showLoading({
			  title: '玩命加载中',
			})
			var param = {
			  UserId: that.userid,
			  page: that.pages,
			  limit: 5,
			};
			uni.request({
			  url: 'https://www.wanbaokj.xyz/MobileTerminal/NotificationMessage',
			  method: 'POST',
			  data: param,
			  header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
			  },
			  success: function (res) {
				for (var i = 0; i < res.data.data.length; i++) {
				  res.data.data[i].modificatime = res.data.data[i].modificatime.substring(0, 10);
				}
				var newArr = that.list.concat(res.data.data);
				that.list = newArr;
				that.page = that.pages + 1;
				uni.hideLoading();
			  }
			})
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
	text-align: center;
	padding-top: 20upx;
}
.time{
  background: rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  padding: 10upx 20upx;
  font-size: 14px;
  color:#fff;
}
.content{
  margin: 30upx 40upx;
  padding: 20upx;
  border-radius: 10upx;
  box-shadow: 0 0 10px #ddd;
  text-align: left;
  position: relative;
  flex-direction: column;
}
.title{
  margin-left: 40upx;
  font-weight: 700;
  flex-direction: column;
}
.des{
   color:#999;
   font-size:14px;
   border-bottom: 1px solid #f4f4f4;
   margin: 20upx 40upx;
   padding-bottom: 20upx;
   flex-direction: column;
}
.chakan{
  justify-content: space-between;
  margin: 20upx 40upx;
  align-items: center;
}
.weidu{
  position: absolute;
  top:5px;
  right:10px;
  color:red;

}
.denglu{
  display: flex;
  justify-content: center;
  margin-top: 100upx;
  
}
</style>
