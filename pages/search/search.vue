<template>
	<view class="container">
		<view class="top">
		  <view class="head">
			<view class="search">
			  <image src="../../static/images/tubiao/search.png" style="width:50upx;height:50upx;margin: 0 20upx;"></image>
			  <input class="input" type="text" placeholder="搜索产品、计划书" @input="bindKeyInput" :value="inputValue"/>
			</view>
			<view class="search-btn" @tap="search">搜索</view>
		  </view>
		</view>
		<view style="margin-top:120upx;flex-direction: column;">
		  <view v-if="showview" class="label">
			 <text class="label-item" @tap="bindLab('长城吉康人生')">长城吉康人生</text>
			 <text class="label-item" @tap="bindLab('中英人寿')">中英人寿</text>
			 <text class="label-item" @tap="bindLab('泰康人寿')">泰康人寿</text>
		  </view>
		  <view v-for="(items,index) in jsonData" :key="index" style="flex-direction: column;">
			<navigator class="content" :url="'../proInfo/proInfo?id='+items.id">
			  <image style="width:300upx;height:192upx;padding:20upx" :src="items.thumbnail"></image>
			  <view class="content-title">
				  <view class="tit">{{items.title}}</view>
				  <view class="des">{{items.labelone}}</view>
				  <view class="baofei"><view class="biaoqian">{{items.labeltwo}}</view><view class='company'>{{items.product__product}}</view></view>
			  </view>
			</navigator>
		  </view>
			<view v-if="noData" class="cover">
				<image src='https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/7423fe89-8e37-4b70-ac67-0fc9627df582.png' style="width:420upx" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue:'',
				userid:'',
				jsonData:'',
				showview:true,
				noData:false
			};
		},
		methods:{
			bindKeyInput(e) {
				this.inputValue = e.detail.value;
			},

			bindLab(e){
				this.inputValue = e;				
			},
			search(){
				var that = this;
				var param = {
				  title: that.inputValue,
				};
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/SelteteProuctJM',
				  method: 'POST',
				  data: param,
				  header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				  },
				  success: function (res) {
						if(res.data.length == 0){
							that.showview = false;
							that.jsonData = res.data;
							that.noData = true;
						}
						else{
							that.showview = false;
							that.jsonData = res.data;
							that.noData = false;
						}
						
				  }
				})
			}
		},
		onLoad() {
			var that = this;
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				that.userid = res.data;
			  }
			})
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
}
.top{
  position: fixed;
  top:0;
  width:100%;
  background: #fff;
  z-index: 999;
  flex-direction: column;
}
.search{
  background:#f4f4f4;
  border-radius: 50upx;
  padding:20upx 0;
  align-items: center;
  font-size: 32upx;
  margin: 20upx;
  width:600upx;
}
.head{
  align-items: center;
}
.search-btn{
   font-size:32upx; 
   color:#04d5c4;
}
.content{
  align-items:center;
  margin:20upx;
  display: flex;
	border-bottom: 1px solid #fafafa;
}
.content-title{
 padding-top: 10px;
 padding-bottom: 10px;
 width: 370upx;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
 flex-direction: column;
}
.baofei{
  color:#999;
  margin-bottom: 0px;
  font-size: 24upx;
  justify-content: space-between;
  align-items: center;
}
.des{
  font-size: 24upx;
  line-height: 30px;
  color: #9A9A9A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
	display: block;
}
.company{
  border: 1px solid #04d5c4;
  border-radius: 50upx;
  color: #04d5c4;
  margin-right:20upx;
  padding: 2px 5px;
}
.tips {
  color: #fff;
  position: absolute;
  top: 0px;
  right: 0px;
  background: none;
  width: 15%;
  height: 15%;
}
.tit{
  font-size: 32upx;
  line-height: 30px;
}
.biaoqian{
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
	display: block;
}
.label{
  margin-top: 40upx;
  font-size: 28upx;
}
.label-item{
  background: #f4f4f4;
  border-radius: 10px;
  padding: 10upx 20upx;
  margin: 0 20upx;
  color:#484848;
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
</style>
