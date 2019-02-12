<template>
	<view class="outbox">
		<view class="shuru">
			<input placeholder="请输入昵称" type="text" focus @input="KeyInput" :value="nc" />
		</view>
		<view>
			<button @tap="setLoading">确定</button>
		</view>
	</view>
</template>

<script>
	var userId="";
	export default {
		data:{
			nc:'',
		},
		methods: {
			KeyInput:function(e){
				this.nc = e.detail.value;
			},
			setLoading:function(e){
				var that=this;
				uni.getStorage({
					key: 'userid',
					success: function (res) {
						console.log(res.data);
						userId=res.data;
						var param={
							UserId: userId,
							nickname: that.nc,
						};
						console.log("昵称："+that.nc);
						
						uni.request({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatSetBasis', 
							method:'post',
							data: param,
							header: {
								"Content-Type": "application/x-www-form-urlencoded",
								"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
							},
							success: (res) => {
								console.log(res.data);
								//将昵称缓存
								uni.setStorage({ 
									key: 'nickName',
									data: that.nc,
									success: function () {
										console.log('success');
									}
								});
								//显示设置成功
								uni.showToast({
									title: res.data.msg,
									success:function(){
										uni.navigateBack({
											delta: 1
										});
									}
								});
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	.outbox{
		flex-direction: column;
	}
	.shuru,button{
		/* flex-direction: column; */		
		width: 670upx;
		font-size: 28upx;
		display: block;
		line-height: 88upx;
		margin-left: 40upx;
		margin-right: 40upx;
	}
	.shuru input{
		border-bottom: 1px solid #dedede;
		padding: 20upx 40upx;
		margin-bottom: 20upx;
	}
	button{
		height: 88upx;
		padding: 0upx 40upx;
	}
</style>
