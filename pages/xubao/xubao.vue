<template>
	<view class="index">
		<view v-if="networkType" class="denglu" @tap='denglu'><image src="../../static/images/denglu.png" style="width:70%;" mode="widthFix"></image></view>
		<view v-else class="index">
		<view class="top">
		  <view class="tubiao">

		  </view>
		  <view class="swiper-tab">
			  <view class="swiper-tab-item" @tap="clickTab(0)"><image src="../../static/images/che.png" style="width:80upx;height:80upx;margin-right:20upx"></image><text class="tit-item" :class="currentTab==0?'active':''">车险查询</text></view>
			  <view class="swiper-tab-item" @tap="clickTab(1)"><image src="../../static/images/shou.png" style="width:80upx;height:80upx;margin-right:20upx"></image><text class="tit-item" :class="currentTab==1?'active':''">寿险查询</text></view>
		  </view>
		</view>
		
		<view style="margin-top:200upx;height:20upx;background:#f4f4f4"></view>
		
		<view v-if="currentTab == 0" style="flex-direction: column;">
		  <view v-for="(item,index) in list" :key="index" style="flex-direction: column;">
			<view class="item" @tap='detail(item)'>
			  <view class="content">
					<view><image src="../../static/images/xu-che.png" style="width:120upx;height:120upx"></image></view>
					<view style="flex-direction: column;margin-left:70upx">
						<view class="cp">{{item.license}}</view>
						<view class="tip"><image src="../../static/images/time.png" style="width:30upx;height:30upx;margin-right:6upx"></image>剩余{{item.residue}}</view>
						<view class="lb">{{item.insured}} {{item.category__mainmca}}</view>
					</view>
			  </view>    
			</view>
		  </view>
			<view v-if="nodata" class="cover">
				<image src='https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/7423fe89-8e37-4b70-ac67-0fc9627df582.png' style="width:420upx" mode="widthFix"></image>
			</view>
		</view>
		<view v-if="currentTab == 1" style="flex-direction: column;">
		  <view v-for="(item,index) in array" :key="index" style="flex-direction: column;">
			<view class="item" @tap='detail(item)'>
			  <view class="content">
				<view><image src="../../static/images/xu-shou.png" style="width:120upx;height:120upx"></image></view>
				<view style="flex-direction: column;margin-left:70upx">
				  <view class="cp">{{item.insurance__generatormc}}</view>
				  <view class="tip"><image src="../../static/images/time.png" style="width:30upx;height:30upx;margin-right:6upx"></image>{{item.residue}}</view>
				  <view class="lb">{{item.recognizee}} {{item.warranty}}</view>
				</view>
			  </view>    
			</view>
		  </view>
			<view v-if="noData" class="cover">
				<image src='https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/7423fe89-8e37-4b70-ac67-0fc9627df582.png' style="width:420upx" mode="widthFix"></image>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				currentTab: 0,
				userid:'',
				nodata:false,
				list:'',
				noData:false,
				array:'',
				pages:2,
				page:2,
				networkType:false
			}		   
		},
		methods: {
		  clickTab(e) {
				var that = this;
				if (that.currentTab === e) {
				  return false;
				} else {
				  that.currentTab = e;
				}
			},
			denglu (e) {
				uni.navigateTo({
					url: '../bindphone/bindphone',
				})
			},
			detail(e){
				console.log(e);
				var data = JSON.stringify(e)
				uni.navigateTo({
					url: '../xbxq/xbxq?data=' + data + '&&type=' + this.currentTab
				})
			},
			showdata(){
				var that = this;
				uni.getStorage({
					key: 'userid',
					success: function (res) {
						console.log(res.data);
						that.userid = res.data;
						var param = {
							UserId: that.userid,
							page:1,
							limit:5,
						};
						uni.request({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/CarRenewalQuery',
							method: 'POST',
							data: param,
							header: {
								"Content-Type": "application/x-www-form-urlencoded",
								"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
								
							},
							success: function (res) {
								if(res.data.data.length == 0){
									that.nodata = true;
								}
								that.list = res.data.data;
							}
						})
						uni.request({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/LIfeRenewalQuery',
							method: 'POST',
							data: param,
							header: {
								"Content-Type": "application/x-www-form-urlencoded",
								"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
							},
							success: function (res) {
								if (res.data.data.length == 0) {
									that.noData = true;
								}
								that.array = res.data.data;
							}
						})
					}
				})
			}
		},
		onLoad() {
			var that = this;
			if (uni.getStorageSync('userid') == '') {
				that.networkType = true;
			}
			that.showdata();
		},
		onPullDownRefresh() {
			this.showdata();
			setTimeout(function () {
					uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log(1);
			var that = this;
			if (that.list.length < 5 || that.array.length < 5){
					 return false;
			}
			if (that.currentTab == 0){
				uni.showLoading({
					title: '加载中',
				})
				var param = {
					UserId: that.userid,
					page: that.pages,
					limit: 5,
				};
				uni.request({
          url: 'https://www.wanbaokj.xyz/MobileTerminal/CarRenewalQuery',
					method: 'POST',
					data: param,
					header: {
					  "Content-Type": "application/x-www-form-urlencoded",
					  "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						if(res.data.data.length == 0){
							uni.showToast({
								title: '没有更多数据了',
								icon: 'none',
								duration: 2000
							})
						}
						var newArr = that.list.concat(res.data.data);
						that.list = newArr;
						that.pages = that.pages + 1
						uni.hideLoading();
					}
				})
			}
			else{
				var param = {
					UserId: that.userid,
				    page: that.data.pages,
					limit: 5,
				};
				uni.request({	
					url: 'https://www.wanbaokj.xyz/MobileTerminal/LIfeRenewalQuery',
					method: 'POST',
					data: param,
					header: {
					  "Content-Type": "application/x-www-form-urlencoded",
					  "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						if (res.data.data.length == 0) {
							uni.showToast({
								title: '没有更多数据了',
								icon: 'none',
								duration: 2000
							})
						}
						var newArr = that.array.concat(res.data.data);
						that.array = newArr;
						that.page = that.page + 1;
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
.index{
	flex-direction: column;
	flex:1;
}
.top{
  position: fixed;
  top:0;
  width:100%;
  flex-direction: column;
}
.swiper-tab{
  width: 630upx;
  background: #fff;
  height:162upx;
  border-radius: 20upx;
  position: absolute;
  color:#484848;
  top:0;
  left:60upx;
  box-shadow: #DFDFDF 0upx 0upx 10upx 1upx; 
}
.swiper-tab-item{
  flex:1;
  align-items: center;
  justify-content: center;
  margin: 10upx 0 25upx;
}
.active{
  color:#04d5c4;
}
.br-l{
  border-left:1px solid #dcdbdb;
  flex-direction: column;
}
.tit-item{
  padding: 10upx 0;
}
.item{
  padding: 0 60upx;
  border-bottom:1px solid #fafafa;
}
.content{
  padding: 40upx 0;
  align-items: flex-start; 
	
}
.cp{
  color:#342c2a;
  font-weight: bold;
  margin-bottom: 20upx;
  font-size: 32upx;
}

.lb{
  font-size: 28upx;
  color:#686868;
}
.tip{
  color:#ff6928;
  font-size: 28upx;
  margin-bottom: 20upx;
}
.tubiao{
  background: #04d5c4;
  height:60upx;
}
.img{
  flex:1;
  justify-content: center;
}
.cover{
  justify-content: center;
  background: #fff;
  position: absolute;
  top:220upx;
  width:100%;
  height:75%;
  padding-top:120upx;
}
.denglu{
  justify-content: center;
  margin-top: 100upx;
  
}
</style>
