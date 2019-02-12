<template>
	<view class="outbox">
		<view class="container" @tap='info'>
		  <!--用户登录账号开始--> 
		  <view class="userinfo">
			<image class="userinfo-avatar" :src="userImg" mode="scaleToFill"></image>
			<view><text>{{userName}}</text></view>
		  </view>
		  <!--用户登录账号结束-->
			<view><image src="../../static/images/wodeIcon/pointer@3x.png" style="width:30upx;height:45upx;margin-right:58upx"></image></view>
		</view>

		<view style="flex-direction: column;" v-if="zczt">
		  <!-- 我的佣金 -->
		  <view class='yongjin'>
			<label>我的佣金</label>
			<view class='setting' v-on:click="sxyj">
			  <view class='icon'><image src="../../static/images/wodeIcon/shouxian@2x.png"></image></view>
			  <view class='text'>
				<text>寿险佣金</text>
				<view class='icons'><image src="../../static/images/wodeIcon/pointer@2x.png" mode="scaleToFill"></image></view>
			  </view>
			</view>
		  </view>
		  <!-- 我的佣金 -->

		  <!-- 我的工号 -->
		  <view class='yongjin'>
			<label>出单工号</label>
			<view class='setting' v-on:click="sxgh">
			  <view class='icon'><image src="../../static/images/wodeIcon/gonghao@2x.png" mode="scaleToFill"></image></view>
			  <view class='text'>
				<text>寿险工号</text>
				<view class='icons'><image src="../../static/images/wodeIcon/pointer@2x.png" mode="scaleToFill"></image></view>
			  </view>
			</view>
		  </view>
		  <!-- 我的工号 -->

		   <!-- 我的工号 -->
		  <view class='yongjin'>
			<label>组织架构</label>
			<view class='setting' v-on:click="zzgj">
			  <view class='icon'><image src="../../static/images/wodeIcon/team@2x.png" mode="scaleToFill"></image></view>
			  <view class='text'>
				<text>我的团队</text>
				<view class='icons'><image src="../../static/images/wodeIcon/pointer@2x.png" mode="scaleToFill"></image></view>
			  </view>
			</view>
		  </view>
		  <!-- 我的工号 -->

		</view>
		  

		  <!-- 常用工具 -->
		  <view class='yongjin'>
			<label>常用工具</label>
			<view class='setting' v-on:click="bbxx">
			  <view class='icon'><image src="../../static/images/wodeIcon/banben@2x.png" mode="scaleToFill"></image></view>
			  <view class='text'>
				<text>版本信息</text>
				<view class='icons'><image src="../../static/images/wodeIcon/pointer@2x.png" mode="scaleToFill"></image></view>
			  </view>
			</view>
			<view class='setting' v-on:click="lxwm">
			  <view class='icon'><image src="../../static/images/wodeIcon/customer@2x.png" mode="scaleToFill"></image></view>
			  <view class='text'>
				<text>联系我们</text>
				<view class='icons'><image src="../../static/images/wodeIcon/pointer@2x.png" mode="scaleToFill"></image></view>
			  </view>
			</view>
		  </view>
		  <!-- 常用工具 -->

		  <!-- 投诉建议 -->
		  <view class='yongjin'>
			<label>投诉建议</label>
			<view class='setting' v-on:click="fankui">
			  <view class='icon'><image src="../../static/images/wodeIcon/complain@2x.png" mode="scaleToFill"></image></view>
			  <view class='text'>
				<text>反馈建议</text>
				<view class='icons'><image src="../../static/images/wodeIcon/pointer@2x.png" mode="scaleToFill"></image></view>
			  </view>
			</view>
			<view class='setting' v-on:click="wenjuan">
			  <view class='icon'><image src="../../static/images/wodeIcon/question@2x.png" mode="scaleToFill"></image></view>
			  <view class='text'>
				<text>问卷调查</text>
				<view class='icons'><image src="../../static/images/wodeIcon/pointer@2x.png" mode="scaleToFill"></image></view>
			  </view>
			</view>
		  </view>
		  <!-- 投诉建议 -->
	</view>
</template>

<script>
	export default {
		data(){
			return{
				userName:'佚名',
				zczt:false,
				userImg:'../../static/images/yonghu.png',
			}
		},
		methods:{
			wenjuan:function(){
				uni.navigateTo({
					url: 'wenjuan/wenjuan'
				});
			},
			GetUserInfo:function(){
				var that=this;
				uni.getStorage({
					key: 'userid',
					success: function (res) {
						console.log(res.data);
						var userId=res.data;
						if(userId){
							that.zczt=true;
						}
						var param={
							UserId:userId,
						};
						uni.request({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatFundamental', //仅为示例，并非真实接口地址。
							method:'POST',
							data: param,
							header: {
							  "Content-Type": "application/x-www-form-urlencoded",
							  "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
							},
							success: (res) => {
								console.log(res.data[0].admin_basics_movement__nickname);
								if(res.data[0].admin_basics_movement__nickname){
									that.userName=res.data[0].admin_basics_movement__nickname;
									
									uni.setStorage({ 
										key: 'nickName',
										data: res.data[0].admin_basics_movement__nickname,
										success: function () {
											console.log('success');
										}
									});
								}
								if(res.data[0].admin_basics_movement__icon){
									that.userImg=res.data[0].admin_basics_movement__icon;
									uni.setStorage({ 
										key: 'img_key',
										data: res.data[0].admin_basics_movement__icon,
										success: function () {
											console.log('success');
										}
									});
								}								
							}
						});
					}
				});
			},
			info:function(){
				uni.navigateTo({
					url: 'shezhi/shezhi'
				});
			},
			sxyj:function(){
				uni.navigateTo({
					url: 'sxyj/sxyj'
				});
			},
			sxgh:function(){
				uni.navigateTo({
					url: 'sxgh/sxgh'
				});
			},
			zzgj:function(){
				uni.navigateTo({
					url: '../team/team'
				});
			},
			bbxx:function(){
				uni.navigateTo({
					url: 'guanyu/guanyu'
				});
			},
			lxwm:function(){
				uni.navigateTo({
					url: '../custom/custom'
				});
			},
			pdgl:function(){
				uni.navigateTo({
					url: '../info/list'
				});
			},
			fankui:function(){
				uni.navigateTo({
					url: 'fankui/fankui'
				});
			}
		},
		onLoad:function(){
			console.log("页面加载完了");
			this.GetUserInfo();
		},
		onShow:function(){
			var that=this;
			that.GetUserInfo();
			if(uni.getStorageSync('userid')==""){
				that.zczt=false;
			}else{
				that.zczt=true;
			}
		},
	}
</script>

<style>
.outbox{
  background-color:#F3F3F3;
  flex-direction: column;
	flex:1;
}
/* 头像区开始 */
.container{
  height: 242upx;
  justify-content: space-between;
  background-color: #04d5c4;
  width:100%;
  align-items: center;

} 
.userinfo {
  position: relative;
  padding-left: 60upx;
  height: 242upx;
  display: flex;
  /*flex-direction:column;*/
  align-items: center;
  margin-bottom: 20upx;
  background-color: #04d5c4;
  color:#fff;
  border: none;
  text-align: left;
}
.userinfo-avatar {
  overflow:hidden;
  display: block;
  width: 120upx;
  height: 120upx;
  border-radius: 50%;
  border: 2px solid #fff;
}
.useName{
  padding-left: 30upx;
}
.userinfo text {
  font-size: 14px;
  border-radius:40%;
  padding-left: 30upx;
}
/* 头像区结束 */

/* 设置区开始 */
.setting{
  height:94upx;
  width:642upx;
  flex-direction:row;
  background-color:#fff;
  border-bottom:1upx solid #f4f4f4; 
  padding-left:60upx; 
  padding-right:48upx; 
  font-size: 34upx;
	color:#333;
}
.setting view,.setting text{
  height: 94upx;
	font-size: 34upx;
}
.icon,.icons{
  width: 48upx;
  height: 48upx; 
  display: flex;
  align-items: center;
}
.icon{
  float: left;
}
.icons{
  float: right;
  justify-content: flex-end;
}
.text{
	padding-left: 34upx;
  width: 554upx;
  height: 88upx;
  line-height: 88upx;
  float: left;
  color: #484848;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: PingFang-Sc-Regular;
  font-size: 28upx;
}
.icon image{
  height: 48upx;
  width: 100%;
  float: left
}
.icons image{
  height: 28upx;
  width: 16upx;
}
.yongjin{
  background-color: #fff;
  margin-bottom: 16upx;
  border-bottom: 1px solid ##f2f2f2;
  flex-direction: column;
}
label{
  color: rgb(153, 153, 153);
  font-size: 28upx;
  padding-left: 60upx;
  width: 690upx;
  display: block;
  border-bottom: 1px solid #fafafa;
  line-height: 56upx;
  font-family: PingFang-Sc-Regular;
}
</style>
