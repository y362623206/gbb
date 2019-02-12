<template>
	<view class="outbox">
		<view v-for="(itemName,itemIndex) in user" :key="itemIndex">
			<view v-if="itemName.account__insurance__insurancename">
			  <view class='box'>
				<label class='title'>{{itemName.account__insurance__insurancename}}:</label>
				<view class="td">
				  <label>账号：</label>
				  <view>{{itemName.account__account}}</view>
				</view>
				<view class="td">
				  <label>密码：</label>
				  <view>{{itemName.account__password}}</view>
				</view>  
			  </view>
		    </view>
		</view>
		<view v-if="nodata" class="cover">
			<image src='https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/7423fe89-8e37-4b70-ac67-0fc9627df582.png' style="width:420upx" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	var userId="";
	export default {
		data() {
			return {
				user: [],
				nodata:false
			};
		},
		methods:{
			
		},
		onLoad: function (options) {
			var that = this;
			uni.getStorage({
				key: 'userid',
				success: function (res) {
					console.log(res.data);
					userId=res.data;
					uni.request({
						url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChat_GetLifeAccount', 
						method:'POST',
						data: {
							UserId: userId
						},
						header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
            },
						success: (res) => {	
							if (res.data.msg.length==0||res.data.msg[0].account__account == null){
								that.nodata=true;
							}else{
								that.user=res.data.msg;
							}
						}
					});
				},
			})
		}
	}
</script>

<style>
.outbox{
	flex-direction: column;
  background-color: #f4f4f4;
	flex:1;
}
.box{
  background-color: #fff;
  margin-top: 20upx;
	flex-direction: column;
}
.title{
  font-family: PingFang-Sc-Regular;
  font-size: 32upx;
  height: 56upx;
  color: #04d5c4;
  padding-left: 60upx;
  width: 690upx;
  display: block;
  border-bottom: 1upx solid #f4f4f4;
  line-height: 70upx;
  overflow: hidden;
}
.td{
  height: 88upx;
  line-height: 88upx;
  color: #686868;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: PingFang-Sc-Regular;
  font-size: 26upx;
  padding-left: 60upx;
  background-color: #fff;
  border-bottom: 1upx solid #f4f4f4;
}
.cover{
  justify-content: center;
	align-items: center;
  background: #fff;
  width:100%;
  height:100%;
  
}
</style>
