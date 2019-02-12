<template>
	<view>
		<view class="table">
			<view class="tr bg-w">
			  <view class="th">年</view>    
			  <view class="th">月</view>
			  <view class="th">佣金</view>
			  <view class="th">绩效</view>
			  <view class="th">更多</view>
			</view>
		<view v-for="(itemName,index) in user" :key="index">
			<view class="tr" :class="index % 2 == 0?'bg-w':''">      
			  <view class="td">{{itemName.datey}}</view>      
			  <view class="td">{{itemName.datem}}</view>
			  <view class="td">{{itemName.price}}</view>
			  <view class="td">{{itemName.brokerage}}</view>
			  <view class="td" style="color:#04c5d4;" @tap='more(itemName)'>>></view>       
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
		data(){
			return{
				user: [],
				nodata:false,
			}
		},
		methods:{
			more:function(option){
				var data = option;
				console.log(data)
				var year = data.datey;
				var month = data.datem;
				uni.navigateTo({
				  url: 'yjzj/yjzj?year=' + year + '&month=' + month
				});
			}
		},
		onLoad: function (options) {
			var that = this;
			uni.showLoading({
				title:'加载中...'
			})
			uni.getStorage({
				key: 'userid',
				success: function (res) {
					console.log(res.data);
					userId=res.data;
					uni.request({
						url: 'https://www.wanbaokj.xyz/MobileTerminal/WbAppSelLifeC_YjLb', 
						method:'POST',
						data: {
							UserId: userId
						},
						header: {
						  "Content-Type": "application/x-www-form-urlencoded",
						  "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
						},
						success: (res) => {
							console.log("佣金数据："+res.data);	
							uni.hideLoading();
							//无数据显示无数据图片
							if(res.data.msg.length == 0){
								that.nodata=true;
							}
							//将佣金保留两位小数
							for(var i=0; i<res.data.msg.length; i++){
								res.data.msg[i].price = Number(res.data.msg[i].price).toFixed(2);
							}
							that.user=res.data.msg;
							console.log(that.user);
						}
					});
				},
			})
		}
	}
</script>

<style>
	.table {  
	  border: 0px solid darkgray;
		flex-direction: column;
	}
	.tr {  
	  display: flex;   
	  justify-content: center;  
	  height: 88upx;  
	  align-items: center;
	}
	.td {    
	  width:150upx;    
	  justify-content: center;    
	  text-align: center;
	  font-size: 26upx;
	  color:#686868;
	}
	.bg-w{  
	  background: #f4f4f4;
	  display: flex; 
	  align-items: center; 
	  justify-content: center;
	}
	.bg-g{  
	  background: #E6F3F9;
	}
	.th {  
	  width: 150upx;   
	  background: #fff;   
	  height: 88upx;  
	  line-height: 88upx;
	  font-size: 28upx; 
	  text-align: center;  
	  border-bottom: 1upx solid #dedede; 
	  color:#484848; 
	  justify-content: center;
	  font-weight: 400;
	}
	.cover{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  margin-top: 200upx;
		position:absolute;
		width:750upx;
	}
</style>
