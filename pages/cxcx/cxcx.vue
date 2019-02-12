<template>
	<view class="container">
		<view class="title">{{brand}}</view>
		<radio-group class="radio-group" @change="radioChange">
			<view v-for="(item,index) in list" :key="index" class="section">
				<view class="radio"><radio :checked="item.checked" :value="item.id"/></view>
				<view class="content">
					<view class="content-xh">{{item.vehicleDescription}}</view>
					<view class="content-jg">新车指导价:{{item.purchasePrice}}</view>
				</view>
			</view>
		</radio-group>
		<view class="nodata">以上车型都不是</view>
		<view class="footer" @tap="setbaojia">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				brand:'',
				list:[],
				xzcx:'',
				page:2
			};
		},
		onLoad(options) {
			console.log(options.obj)
			var data = JSON.parse(options.obj);
			this.brand = data.data[0].brand;
			uni.setStorageSync('cx_chewei',data.data[0].approvedPassengersCapacity);
			var min = data.data[0].purchasePrice;
			for(let i=0; i<data.data.length; i++){
				data.data[i].checked = false;
				data.data[i].id = "" + i;
				if(data.data[i].purchasePrice < min){
					min = data.data[i].purchasePrice;
				}
			}
			
			for(let i=0; i<data.data.length; i++){
				if(min == data.data[i].purchasePrice){
					data.data[i].checked = true;
					this.xzcx = data.data[i].id;
					break;
				}
			}
			console.log(data.data);
			this.list = data.data;
			
		},
		methods:{
			radioChange: function (e) {
				this.xzcx = e.detail.value;
								
			},
			setbaojia(){
				var that = this;
				var xz;
				for(let i=0; i<that.list.length; i++){
					if(that.xzcx == that.list[i].id){
						xz = that.list[i];
					}
				}
				xz = JSON.stringify(xz);
				uni.setStorageSync('cx_key', xz);
				uni.navigateTo({
					url:'../cxbj/cxbj'
				})
			}
		},
// 		onReachBottom(){
// 			var that = this;
// 			uni.showLoading({
// 				title: '加载中',
// 			})
// 			var param = {
// 				vehicleNameS:that.brand,
// 				company:'ZM',
// 				page: that.page,
// 				limit: 10,
// 			};
// 			uni.request({
// 			    url: 'http://101.132.187.72:8001/MobileTerminal/ModelQueries',
// 				method: 'POST',
// 				data: param,
// 				header: {
// 				  "Content-Type": "application/x-www-form-urlencoded",
// 				  "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
// 				},
// 				success: function (res) {
// 					if(res.data.data.length == 0){
// 						uni.showToast({
// 							title: '没有更多数据了',
// 							icon: 'none',
// 							duration: 2000
// 						})
// 					}
// 					else{
// 						var newArr = that.list.concat(res.data.data);
// 						that.list = newArr;
// 						that.page = that.page + 1;
// 					}
// 					uni.hideLoading();
// 				}
// 			})
// 			
// 		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
	background: #f4f4f4;
	margin-bottom: 80upx;
}
.title{
	justify-content: center;
	padding: 30upx 0;
	color:#333;
	background: #fff;
	font-size: 42upx;
}
.section{
	padding: 20upx;
	border-bottom: 1px solid #F4F4F4;
	background: #fff;
	align-items: flex-start;
}
.content{
	flex-direction: column;
}
.radio{
	margin-left: 40upx;
	margin-right: 20upx;
}
.content-xh{
	font-size: 28upx;
	color:#333;
	margin-bottom: 20upx;
	font-weight: 700;
}
.content-jg{
	font-size: 28upx;
    color:#999;
}
.nodata{
	width:244upx;
	margin: 30upx auto;
	padding: 10upx 0;
	justify-content: center;
	font-size: 28upx;
	color:#04D5C4;
	border: 1px solid #04D5C4;
	border-radius: 50upx;
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
