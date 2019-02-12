<template>
	<view class="container">
		<image src="https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/b607273e-7cea-4777-976f-bc7f25725c7c.png" style="width:100%" mode="widthFix"></image>
		<view class="section">
			<image src="../../static/images/cph.png" style="margin-left: 60upx;margin-right: 20upx;width:44upx;height:30upx"></image>
            <input placeholder="请输入车牌号" @input="KeyInput" />
        </view>
		<view class="footer" @tap="setbaojia">
			下一步
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue:''
			};
		},
		onLoad() {
			
		},
		methods:{
			KeyInput(e){
				this.inputValue = e.detail.value;
			},
			setbaojia(){
				var that = this;
				var param = {
					PlateNo:that.inputValue,
					company:'ZM',
				}
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/QueryVehicle',
					method: 'POST',
					data: param,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						if(res.data.type == 1){
							var obj = JSON.stringify(res.data.msg);
							uni.navigateTo({
								url:'../czxx/czxx?obj='+obj
							})
						}
						else{
							uni.navigateTo({
								url:'../czxx/czxx'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
}
.section{
    align-items: center;
	font-size: 32upx;
	background: #f4f4f4;
	margin: 60upx 30upx;
	height:84upx;
	border-radius: 10upx;
}

.footer{
	position: fixed;
	width: 100%;
	bottom: 0;
	background: #04D5C4;
	color:#fff;
	font-size: 34upx;
	justify-content: center;
	padding: 20upx 0;
}
</style>
