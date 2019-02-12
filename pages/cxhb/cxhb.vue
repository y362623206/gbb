<template>
	<view class="container">
		<view class="section">
			<view></view>
			<view class="heji">合计：￥{{total}}</view>
		</view>
		<view v-if="isjq" class="section">
			<view>交强险</view>
			<view class="price">￥{{jq}}</view>
		</view>
		<view v-if="isjq" class="section">
			<view>车船税</view>
			<view class="price">￥{{ccs}}</view>
		</view>
		<view v-if="issy" class="section" style="border:0">
			<view>商业险</view>
			<view class="price">￥{{sy}}</view>
		</view>
		<view style="flex-direction: column;margin-bottom: 100upx;">
			<view v-for="(item,index) in sylist" :key="index" :class="index == 0 ? 'section bg-w':'section'">
				<view>{{item.kindName}}</view>
				<view class="price">￥{{item.premium}}</view>
			</view>
		</view>	
		<view class="footer" @tap="sethebao">
			核保
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sy:'',
				jq:'',
				ccs:'',
				total:'',
				hbinfo:'',
				sylist:[],
				isjq:true,
				issy:true
			};
		},
		onLoad(options) {
			console.log(options.obj);
			var data = JSON.parse(options.obj);
			this.hbinfo = data['基础信息'];
			if(data['交强险'] == undefined){
				this.isjq = false;
				var syprice = 0;
				for(let i=0; i<data['商业险'].length; i++){
					syprice += parseFloat(data['商业险'][i].premium);
				}
				this.sylist = data['商业险'];
				this.sy = syprice.toFixed(2);
				this.total = syprice.toFixed(2);
			}
			else if(data['商业险'] == undefined){
				this.issy = false;
				this.jq = data['交强险'].premium;
				this.ccs = data['车船税'].sumPayTax;
				this.total = (parseFloat(this.jq) + parseFloat(this.ccs)).toFixed(2);
			}
			else{
				this.jq = data['交强险'].premium;
				this.ccs = data['车船税'].sumPayTax;
				this.sylist = data['商业险'];
				var syprice = 0;
				for(let i=0; i<data['商业险'].length; i++){
					syprice += parseFloat(data['商业险'][i].premium);
				}
				this.sy = syprice.toFixed(2);
				this.total = (parseFloat(this.sy) + parseFloat(this.jq) + parseFloat(this.ccs)).toFixed(2);
			}			
		},
		methods:{
			sethebao(){
				var param = this.hbinfo;
				param.company = 'ZM';
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/Underwriting',
					method: 'POST',
					data:param,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						console.log(res.data);
						uni.hideLoading();
						if(res.data.type == 0){
							uni.showModal({
								title: '提示',
							    content: res.data.msg,
								showCancel:false
							})
						}
						else{
							var link = res.data.msg['支付链接'];
							console.log(link);
							uni.setStorageSync('zf_link', link);
							uni.redirectTo({
								url:'../cxzf/cxzf'
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
   justify-content: space-between;
   border-bottom: 1px solid #fafafa;
   padding: 20upx 30upx;
   align-items: center;
   font-size: 28upx;
   background: #fff;
   color:#333;
}
.price{
	color:#ff7337
}
.heji{
	color:#fe472f;
}
.bg-w{
	background: linear-gradient(#dbfaf7, #fff);
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
