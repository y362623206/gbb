<template>
	<view class="outbox">
		<view v-if="denglu" style="flex-direction: column;">
			<view class="section bet touxiang" @tap='touxiang()' >
				<view>头像：</view>
				<view class="rightTips">
					<image class="useImg" v-bind:src="useImg"></image>
					<image style="width: 10px;" mode="widthFix" src="../../../static/images/wodeIcon/pointer@2x.png"></image>
				</view>
			</view>
			
			<view class="section bet"  @tap='nicheng(useName)' >
				<view>昵称：{{useName == null?'佚名':useName}}</view>
				<view class="rightTips"><image style="width: 10px;" mode="widthFix" src="../../../static/images/wodeIcon/pointer@2x.png"></image>
				</view>
			</view>
			<view class="section">
			  <view>保重工号：</view>
			  <view>{{code}}</view>
			</view>
			<view class="section">
			  <view>用户姓名：</view>
			  <view>{{name}}</view>
			</view>
			<view class="section">
			  <view>电话号码：</view>
			  <view>{{iphone}}</view>
			</view>
			<view class="section" style="margin-bottom:20upx;border-bottom: 1px solid #dedede;">
			  <view>身份证号：</view>
			  <view>{{cardNo == null?'':cardNo}}</view>
			</view>
			
			<view>
				<button @tap="outLog">退出登录</button>
			</view>
			
			<view class="model" style="flex-direction: column;" :class="isload?'show':'hide'">
				<progress  v-bind:percent="progress" stroke-width="10" active />
				<view class="loading">头像上传中...</view>
			</view>
		</view>
		<view v-else style="width: 750upx;justify-content: center;margin-top: 150upx;" @tap="login">
			<image mode="aspectFit" src="../../../static/images/denglu.png"></image>
		</view>
	</view>
</template>

<script>
	var userId='';
	export default {
		data(){
			return{
				code:'',
				name:'',
				iphone:'',
				cardNo:'',
				useName:'',
				useImg:'../../../static/images/yonghu.png',
				progress:'0',
				isload:false,
				denglu:false,
			}
		},
		methods: {
			touxiang:function(){
				var that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						//预览
						var imgSrc=res.tempFilePaths;
						console.log(imgSrc);
						that.useImg=imgSrc[0];
						//将图片地址缓存
						uni.setStorage({ 
							key: 'img_key',
							data: imgSrc[0],
							success: function () {
								console.log('success');
							}
						});
						//显示进度条
						that.isload=true;
						
						//上传
						const uploadTask=uni.uploadFile({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatSetImage', //仅为示例，非真实的接口地址
							filePath: imgSrc[0],
							name: 'useravator',
							header: {
								"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
							},
							formData: {
								'UserId': userId
							},
							success: (uploadFileRes) => {
								that.isload=false;
								uni.showToast({
									title: '上传成功！',
									duration: 2000
								});
								that.GetUserInfo();
								console.log("上传成功："+uploadFileRes.data);
							},
							fail() {
								that.isload=false;
								uni.showToast({
									title: '上传失败！',
									duration: 2000
								});
							}
						});
						//上传进度
						uploadTask.onProgressUpdate((res) => {
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
							that.progress=res.progress;
						});
					}
				});
			},
			GetUserInfo:function(){
				var that=this;
				console.log("加载用户信息！");
				uni.getStorage({
					key: 'userid',
					success: function (res) {
						console.log(res.data);
						userId=res.data;
						if(userId){
							that.denglu=true;
						}
						uni.request({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatFundamental', 
							method:'POST',
							data: {
								UserId: userId
							},
							header: {
							  "Content-Type": "application/x-www-form-urlencoded",
							  "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
							},
							success: (res) => {
								if(res.data[0]['admin_basics_movement__icon'] != null){
									that.useImg=res.data[0]['admin_basics_movement__icon'];
								}								
								that.useName=res.data[0]['admin_basics_movement__nickname'];
								that.name=res.data[0]['admin_basics_operator_bas__name'];
								that.cardNo=res.data[0]['admin_basics_operator_bas__cardNo'];
								that.iphone=res.data[0]['admin_basics_operator_bas__iphone'];
								that.code=res.data[0]['admin_basics_operator_bas__jobnumber'];					
							}
						});
					},
				})
			},
			nicheng:function(useName){
				console.log(useName);
				uni.navigateTo({
					url: 'nicheng/nicheng?useName='+useName
				});
			},
			outLog:function(){
				var that=this;
				uni.removeStorage({
					key: 'userid',
					success: function (res) {
						console.log('退出登录成功！');
						that.denglu=false;
					}
				});
				uni.setStorage({ 
					key: 'img_key',
					data: '../../../static/images/yonghu.png',
					success: function () {
						console.log('success');
					}
				});
				uni.setStorage({ 
					key: 'nickName',
					data: '未登录',
					success: function () {
						console.log('success');
					}
				});
			},
			login:function(){
				uni.navigateTo({
					url: '../../bindphone/bindphone'
				});
			}
		},
		onLoad:function(){
			console.log("页面加载完成！");
			this.GetUserInfo();
		},
		onShow:function(){
			var that=this;
			console.log("页面入栈！");
			uni.getStorage({
				key: 'nickName',
				success: function (res) {
					console.log("设置页面昵称："+res.data);
					that.useName=res.data;
				},
			})
			// this.GetUserInfo();
		}
	};
</script>

<style>
	.outbox{
	  background-color:#F3F3F3;
	  flex-direction: column;
	}
	.section{
	  background-color: #fff;
	  flex-direction:row;
	  border-bottom: 1upx solid #f4f4f4;
	  display:flex;
	  height: 88upx;
	  line-height: 88upx;
	  justify-content: flex-start;
	  align-items: center;
	  font-size: 28upx;
	  padding-left: 60upx;
	  padding-right: 48upx;
	  font-family: PingFang-Sc-Regular;
	  width: 660upx;
	 /* flex-direction: column; */
	}
	.touxiang{
		height: 120upx;
		margin-bottom: 20upx;
	}
	.useImg{
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
	}
	.bet{
	  justify-content: space-between;
	}
	.rightTips{
	  display: flex;
	  align-items: center;
	}
	.show{
		display: flex;
	}
	.hide{
		display: none;
	}
	.model{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0,0,0,0.3);
		z-index: 999;
	}
	.loading{
		width: 750upx;
		justify-content: center;
		align-items: center;
		margin-top: 400upx;
		color: #fff;
	}
	button{
		width: 670upx;
		background-color: #fff;
	}
</style>
