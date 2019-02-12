<template>
  <view class="outbox">
	    <scroll-view :scroll-into-view="toView" scroll-y="true" style="height:100vh;"  @scroll="scroll"  :scroll-top="scrollTop">
		<view class="search" @tap='search'>
			<image src="../../static/images/tubiao/search.png" style="width:50upx;height:50upx;margin: 0 20upx;"></image>
			<input class="input" type="text" placeholder="搜索产品、计划书" disabled="true"/>
		</view>
		<view class="section">
			<view class="dalei" @tap='dalei(1)'>
					<view><image src="../../static/images/p-shou.png" style="width:90upx;height:90upx"></image></view>
					<view :class="currentTab==1?'active':''">寿险</view>
			</view>
			<view class="dalei" @tap='dalei(2)'>
					<view><image src="../../static/images/p-che.png" style="width:90upx;height:90upx"></image></view>
					<view :class="currentTab==2?'active':''">车险</view>
			</view>
			<view class="dalei" @tap='dalei(3)'>
					<view><image src="../../static/images/p-tuan.png" style="width:90upx;height:90upx"></image></view>
					<view :class="currentTab==3?'active':''">团险</view>
			</view>
		</view>
		<view class="fjx"></view>
		<view v-if="currentTab==1" class="section ubb">
		  <view class="item-tab" @tap="changexz">{{xianzhong}}<image :src="index==1?img1:img2" style="width:28upx;height:16upx;margin-left:10upx"></image></view>
		  <view class="item-tab" @tap="changegs">{{gongsi}}<image :src="index==2?img1:img2" style="width:28upx;height:16upx;margin-left:10upx"></image></view>
		</view>
		<view id="bzgl" v-if="currentTab==1" :class="scrollY>160?'product bindmenu':'product'">
			<view style="width: 750upx;" v-for="(items,index) in jsonData" :key="index" >
			  <navigator  class="content" :url="'../proInfo/proInfo?id='+items.id">
				<image style="width:300upx;height:192upx;padding:20upx" :src="items.thumbnail"></image>
				<view class="content-title">
					<view class="tit">{{items.title}}</view>
					<view class="des">{{items.labelone}}</view>
					<view class="baofei">
						<view class="biaoqian">{{items.labeltwo}}</view>
						<view class='company'>{{items.product__product}}</view>
					</view>
				</view>
			  </navigator>
			</view>
			<view v-if="noData" class="cover">
				<image src='https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/7423fe89-8e37-4b70-ac67-0fc9627df582.png' style="width:420upx" mode="widthFix"></image>
			</view>
		</view>
		<view v-else class="wkf">
			<image style="width:550upx;" src="../../static/images/wkf.png" mode="widthFix"></image>
		</view>
		
		</scroll-view>
		<view class="mask" v-show="showMask" @click="hide" catchtouchmove="ture"></view>
		<view :class="scrollY>160 ? 'topnav' : 'hide'" catchtouchmove="ture">
			<view v-if="currentTab==1" class="section ubb">
			  <view class="item-tab" @tap='toggleXz()'>{{xianzhong}}<image :src="index==1?img1:img2" style="width:28upx;height:16upx;margin-left:10upx"></image></view>
			  <view class="item-tab" @tap='toggleGs()'>{{gongsi}}<image :src="index==2?img1:img2" style="width:28upx;height:16upx;margin-left:10upx"></image></view>
			</view>
			<view class="popup" v-show="showXz">
			  <view class="popup-item" @tap="bindxz('','险种')"><image src="../../static/images/shouxian.png" style="width:50upx;height:50upx;margin: 0 20upx"></image>全部</view>
			  <view v-for="(item,index) in arrXz" :key="index" class="popup-item" @tap="bindxz(item.id,item.product)"><image src="../../static/images/shouxian.png" style="width:50upx;height:50upx;margin: 0 20upx;"></image>{{item.product}}</view>
			</view>
			<view class="popup" v-show="showGs">
				<view class="popup-flex">
					<view class="xianzhong" @tap="bindgs('','保险公司')">不限公司</view>
					<view v-for="(item,index) in arrGs" :key="index" class="xianzhong" @tap="bindgs(item.id,item.insurancename)">{{item.insurancename}}</view>
				</view>
			</view>	
		</view>
  </view>
</template>

<script>
	export default {
		data() {
			return{
				jsonData:[],
				showMask:false,
				showXz:false,
				showGs:false,
				index:'',
				img1:'../../static/images/tubiao/shang.png',
				img2: '../../static/images/tubiao/xia.png',
				arrXz:[],
                arrGs:[],
				xzid:'',
				gsid:'',
				currentTab:1,
				noData:false,
				toView:'',//锚点
				scrollTop:'0',
				scrollY: '',
				xianzhong:'险种',
                gongsi:'保险公司',
			}
		},
		onLoad: function (options) {
			this.showdata();
		},
// 		onPullDownRefresh:function(){
// 			this.showdata();
// 			setTimeout(function () {
// 					uni.stopPullDownRefresh();
// 			}, 1000);
// 		},
		methods: {
			search:function(){
				uni.navigateTo({
				  url: '../search/search'
				})
			},
			scroll:function(e){
				console.log(e.detail.scrollTop);
				this.scrollY = e.detail.scrollTop;
			},
			changexz:function(){
				this.toView='bzgl';
				this.toggleXz();
			},
			changegs:function(){
				this.toView='bzgl';
				this.toggleGs();
			},
			dalei:function(e){
				var that = this;
				if(e == 1){
					uni.request({
						url: 'https://www.wanbaokj.xyz/MobileTerminal/ProductPage', //仅为示例，并非真实的接口地址
						method: 'post',
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
							"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
						},
						success: function (res) {
                            that.arrXz = res.data['产品大类']['寿险产品'];
							that.arrGs = res.data['保险公司']['寿险公司'];
							that.currentTab = 1;
						}
					})
				}
				else if (e == 2){
					that.currentTab = 2;
				}
				else{
					that.currentTab = 3;
				}
			},
			toggleXz:function(){
				if(this.showXz){
					this.showMask = false;
					this.showXz = false;
					this.showGs = false;
					this.index = '';
				}
				else{
					this.showMask = true;
					this.showXz = true;
					this.showGs = false;
					this.index = 1;
				}
			},
			toggleGs:function(){
				if(this.showGs){
					this.showMask = false;
					this.showXz = false;
					this.showGs = false;
					this.index = '';
				}
				else{
					this.showMask = true;
					this.showXz = false;
					this.showGs = true;
					this.index = 2;
				}
			},
			hide:function(){
				this.showMask = false;
				this.showXz = false;
				this.showGs = false;
				this.index = '';
				this.toView='';
			},
			bindxz: function (id,name){
				var that = this;
				that.xzid = id;
				that.toView='';
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/SelteteProuct', //仅为示例，并非真实的接口地址
				  data: {
					products: '1',
					insurancename: that.gsid,
					product: that.xzid,
				  },
				  method: 'post',
				  header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				  },
				  success: function (res) {
						if(res.data.length == 0){
							that.jsonData = res.data;
							that.showMask = false;
							that.showXz = false;
							that.showGs = false;
							that.index = '';
							that.xianzhong = name;
							that.noData = true;
						}
						else{
							that.jsonData = res.data;
							that.showMask = false;
							that.showXz = false;
							that.showGs = false;
							that.index = '';
							that.xianzhong = name;
							that.noData = false;
						}
						
				  }
				})
			},

			bindgs: function (id,name) {
				var that = this;
				that.gsid = id;
				that.toView='';
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/SelteteProuct', //仅为示例，并非真实的接口地址
				  data: {
					products: '1',
					insurancename: that.gsid,
					product: that.xzid,
				  },
				  method: 'post',
				  header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				  },
				  success: function (res) {
						if(res.data.length == 0){
							that.jsonData = res.data;
							that.showMask = false;
							that.showXz = false;
							that.showGs = false;
							that.index = '';
							that.gongsi = name;
							that.noData = true;
						}
						else{
							that.jsonData = res.data;
							that.showMask = false;
							that.showXz = false;
							that.showGs = false;
							that.index = '';
							that.gongsi = name;
							that.noData = false;
						}
						
				  }
				})
			},
			showdata:function(){
				var that=this;
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/ProductPage', //仅为示例，并非真实的接口地址
					method: 'post',
					header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
					that.arrXz = res.data['产品大类']['寿险产品'];
					that.arrGs = res.data['保险公司']['寿险公司'];
					}
				})
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/SelteteProuct', //仅为示例，并非真实的接口地址
					data: {
						products: '1',
						insurancename: '',
						product: '',
					},
					method:'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						console.log(res.data);
						that.jsonData=res.data;
					}
				})
			}
		}
	}
</script>

<style>
.outbox{
	flex-direction: column;
	flex:1;
}
.item-tab{
	flex:1;
	margin:0 10upx;
	padding:10upx 20upx;
	justify-content:center;
	font-size:32upx;
	align-items:center;

}

.popup{
	padding: 20upx;
	font-size: 28upx;
	flex-direction: column;
}

.popup-item{
	align-items: center;
	margin: 10upx 0;
}
.popup-flex{
	flex-wrap: wrap;
}
.xianzhong{
	border:1px solid #ddd;
	padding:10upx 0;
	width:153upx;
	margin:10upx 40upx;
	border-radius:10upx;
	justify-content: center;
}
.tit{
  font-size: 32upx;
  line-height: 30px;
}
.content{
  align-items:center;
  margin:20upx;
  border-bottom: 1px solid #fafafa;
	display: flex;
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

.section{
  padding:10upx;
  flex:1;
}
.ubb{
  border-bottom: 1px solid #f4f4f4;
}
.baofei{
  color:#999;
  margin-bottom: 0px;
  font-size: 24upx;
  justify-content: space-between;
  align-items: center;
}
.biaoqian{
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.des{
  font-size: 24upx;
  line-height: 30px;
  color: #9A9A9A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.company{
  border: 1px solid #04d5c4;
  border-radius: 50upx;
  color: #04d5c4;
  margin-right:20upx;
  padding: 2px 5px;
}

.search{
  background:#f4f4f4;
  border-radius: 50upx;
  padding:20upx 0;
  align-items: center;
  flex:1;
  font-size: 32upx;
  margin: 20upx;
}
.mask {
	position: fixed;
	z-index: 998;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, .3);
}
.dalei{
  flex:1;
  text-align: center;
  font-size: 32upx;
  flex-direction: column;
  padding-bottom: 10upx;
}
.dalei view{
	display: block;
}
.active{
  color:#04d5c4;
}
.fjx{
  height:20upx;
  background:#f4f4f4;
}
.wkf{
  align-items: center;
  justify-content: center;
  padding-top: 150upx;
}
.cover{
  justify-content: center;
  background: #fff;
  position: absolute;
  width:100%;
  height:75%;
  padding-top:120upx;
}
.topnav{
	position: fixed;
	top:0;
	left:0;
	width:100%;
	z-index: 999;
	background: #fff;
	flex-direction: column;
}
.hide{
	display: none;
}
.product{
	flex-direction: column;
	min-height:600px;
}
.bindmenu{
	margin-top: 80upx;
}
</style>
