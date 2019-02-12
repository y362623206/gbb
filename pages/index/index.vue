<template>
	<view class="index">
		<view class="status_bar">
				<view class="top_view"></view>
		</view>
		<view class="title">
			<view class="message" @tap="bindmessage">
				<image src="../../static/images/tubiao/message@3x.png" style="width:50upx;height:50upx"></image>
				<view class="shouming">消息</view>
				<view v-if="wd" class="weidu"><image src="../../static/images/tubiao/cirle.png" style="width:15upx" mode="widthFix"></image></view>
		    </view>
			<view class="search" @tap="bindsearch">
				<image src="../../static/images/tubiao/search.png" style="width:50upx;height:50upx;margin: 0 20upx;"></image>
				<input class="input" type="text" placeholder="搜索产品、计划书" disabled="true"/>
			</view>
			<view class="kefu" @tap="bindkefu">
				<image src="../../static/images/tubiao/kefu@3x.png" style="width:50upx;height:50upx"></image>
				<view class="shouming">客服</view>
			</view>
			<view class="saoma" @tap="bindsao">
				<image src="../../static/images/tubiao/saoma@3x.png" style="width:50upx;height:50upx" ></image>
				<view class="shouming">扫一扫</view>
			</view>
		</view>
		<view class="slider">
			<swiper v-bind:style="{height:imgheights[current] + 'px'}" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="#fff" indicator-active-color="#04d5c4" @change="bindchange">
				<swiper-item v-for="(item,index) in imgUrls" :key="index" @tap="bindsilder(item.id,item.type)">
					<image :src="item.slideshows" style="width:100%" mode="widthFix" @load="imageLoad"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="ct-item" @tap="jihua">
				<view class="ct-img"><image src="../../static/images/xin.png" style="width:100upx;height:100upx"></image></view>
				<view class="ct-tip">车险</view>
			</view>
			<view class="ct-item" @tap="yewu">
				<view class="ct-img"><image src="../../static/images/nian.png" style="width:100upx;height:100upx"></image></view>
				<view class="ct-tip">业务</view>
			</view>
			<view class="ct-item" @tap="huiyi">
				<view class="ct-img"><image src="../../static/images/kuai.png" style="width:100upx;height:100upx"></image></view>
				<view class="ct-tip">课堂</view>
			</view>
			<view class="ct-item" @tap="huod">
				<view class="ct-img"><image src="../../static/images/le.png" style="width:100upx;height:100upx"></image></view>
				<view class="ct-tip">活动</view>
			</view>
		</view>
        <view class="product" @tap="rmhd(huodong.id)">
		  <view class="tit">热门活动</view>
		  <image :src="huodong.candidates" style="width:100%;height:146upx;margin-top: 30upx;"></image>
		</view>
		<view class="product">
		  <view class="rexiao">
			<view class="tit">热门排行</view>
			<view class="more" @tap="product">
			  <view class="gengduo">更多</view>
			  <image src="../../static/images/tubiao/r-jt.png" style="width:10upx;margin-left: 10upx;" mode="widthFix"></image>
			</view>
		  </view>
			<view class='hotContaint'>
				<view v-for="(item,index) in list" class="rx-list" :key="index">
				 <view class="rx-item" @tap="bindrx(item.id)">
					<view class="rx-left">
						 <image :src="item.thumbnail" style="width:337upx;height:225upx;border-radius:10upx"></image>
						 <view class="rx-shuom">
							<view class="rx-tit">{{item.title}}</view>
							<view class="rx-des">{{item.labelone}}</view>
							<view class="rx-des">{{item.labeltwo}}</view>
						 </view>
					</view>
				 </view>
				</view>
			</view>	
		</view>
		
		<view class="jianyi">----您的每条建议都会得到我们的重视！----</view>
        <view class='jybtn'><button @tap='tjjy'>意见反馈</button></view>
		
		<view class="mask" v-show="showMask" @click="hide"></view>
		<view class="popup popup-middle" v-show="showState">
			<view class="section_gap">
				<view class="section_title">会议标题：</view>
				<view class="section_text">{{biaoti}}</view>
			</view>
			<view class="section_gap">
				<view class="section_title">签到时间：</view>
				<view class="section_text">{{qdsj}}</view>
			</view>
			<view class="section_gap">
				<view class="section_title">签到地点：</view>
				<view class="section_text">{{weizhi}}</view>
			</view>
			<view class="section_wap">
				<view class="section_title">说点什么：</view>
				<textarea class="speak" @input='speak' placeholder="请输入说点什么" placeholder-style="color:#ddd" maxlength="100"/>
			</view>
			<view style="justify-content: center;" @tap="confirm">
				   <text class="confirm">签到</text>
			</view>
		</view>
		<view class="popup popup-middle" v-show="showCancel">
			<view class="section_gap">
				<view class="section_title">评分：</view>
				<view class="right">
					<view @tap="starTap(index)" class="star" v-for="(item,index) in userStars" :key="index">
							<image :src="item"></image>
					</view>
				</view>
			</view>
			<view class="section_wap">
				<view class="section_title">评分理由：</view>
				<textarea class="speak" @input='liyou' placeholder="请输入理由" placeholder-style="color:#ddd" maxlength="100"/>
			</view>
			<view style="justify-content: center;" @tap="cancel">
					<text class="confirm">签退</text>
			</view>
		</view>
  </view>
</template>

<script>
	var date = require('../../components/date.js');
	export default {
		
		data(){
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 1000,
				current: 0,
				imgUrls:[],
				list:'',
				imgheights:[],
				wd:false,
				huodong:'',
				qdsj:'',
				biaoti:'',
				jingdu:'',
				weidu:'',
				weizhi:'',
				showMask:false,
				showState:false,
				duty:'',
				beizhu:'',
				showCancel:false,
				userStars: [
					'../../static/images/selected.png',
					'../../static/images/selected.png',
					'../../static/images/selected.png',
					'../../static/images/normal.png',
					'../../static/images/normal.png',
				],
				grade: 3,
				evaluate:''
			}
		},
		methods: {
		  bindmessage(){
				uni.navigateTo({
				  url: '../tongzhi/tongzhi'
				})
			},
			bindsearch(){
				uni.navigateTo({
					url: '../search/search'
				})
			},
			bindkefu(){
				uni.navigateTo({
					url: '../custom/custom'
				})
			},
			product() {
				uni.switchTab({
					url: '../product/product'
				})
			},
			yewu(){
				uni.navigateTo({
					url: '../datatable/datatable'
				})
			},
			huiyi(){
				uni.navigateTo({
					url: '../sphy/sphy'
				})
			},
			jihua(){
				uni.navigateTo({
					url: '../czxx/czxx'
				})
			},
			huod(){
				uni.navigateTo({
					url: '../tongzhi/tongzhi'
				})
			},
			tjjy(){
				uni.navigateTo({
					url: '../wode/fankui/fankui'
				})
			},
			bindsao(){
				var that = this;
				uni.scanCode({
					success: (res) => {
						console.log(res.result);
						var data = res.result;
						data = JSON.parse(data);
						that.duty = data.serial;
						that.biaoti = data.headline;
						var begin = new Date(data.begin.replace(/-/g, '/'));
						var finish = new Date(data.finish.replace(/-/g, '/'));
						if (finish.getTime() >= new Date().getTime() && begin.getTime() <= new Date().getTime()) {
							var param = {
								UserId: that.userid,
								duty: that.duty,
							};
							uni.request({
								url: 'https://www.wanbaokj.xyz/MobileTerminal/QueryMeeting',
								method: 'POST',
								data: param,
								header: {
								"Content-Type": "application/x-www-form-urlencoded",
								"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
							},
								success: function (res) {
									console.log(res.data);
									if (res.data.type == 0) {
										uni.showModal({
											title: '提示',
											content: res.data.msg,
											showCancel: false,
											success: function (res) {
												that.showMask = false;
												that.showState = false;
											}
										})
									}
									else if (res.data.type == 1) {
										that.showMask = true;
										that.showState = true;
									}
									else {
										that.showMask = true;
										that.showCancel = true;
									}
								}
							})
						}
						else {
							uni.showModal({
								title: '提示',
								content: '您的签到时间不在会议时间范围',
								showCancel: false,
								success: function (res) {
									that.showMask = false;
									that.showState = false;
								}
							})
						}
					},
				})
			},
			bindsilder(id,type){
				if (type == 'inform'){
					uni.navigateTo({
						url: '../message/message?id=' + id,
					})
				}else{
					uni.navigateTo({
						url: '../proInfo/proInfo?id=' + id,
					})
				}
			},
			rmhd(e){
				uni.navigateTo({
					url: '../proInfo/proInfo?id=' + e,
				})
			},
			bindrx(e){
				uni.navigateTo({
					url: '../proInfo/proInfo?id=' + e,
				})
			},
			starTap(e) {
				var index = e; // 获取当前点击的是第几颗星星
				var tempUserStars = this.userStars; // 暂存星星数组
				var len = tempUserStars.length; // 获取星星数组的长度
				for (var i = 0; i < len; i++) {
					if (i <= index) { // 小于等于index的是满心
						tempUserStars[i] = '../../static/images/selected.png'
					} else { // 其他是空心
						tempUserStars[i] = '../../static/images/normal.png'
					}
				}

				this.userStars = tempUserStars;
				this.grade = parseInt(index) + 1;
			},
			hide() {
				this.showMask = false;
				this.showState = false;
			},
		  imageLoad(e) {
				//获取图片真实宽度
				var imgheight = e.detail.height;			
				imgheight = uni.upx2px(imgheight)
				var imgheights = this.imgheights
				//把每一张图片的高度记录到数组里
				imgheights.push(imgheight)
				console.log(imgheights);
				this.imgheights = imgheights;
			},
			bindchange(e) {
				this.current = e.detail.current;
			},
			speak (e) {
				this.beizhu = e.detail.value;
			},
			liyou (e){
				this.evaluate = e.detail.value;
			},
			confirm: function () {
				var that = this;
				var param = {
					UserId: that.userid,
					duty: that.duty,
					longitude: that.jingdu,
					latitude: that.weidu,
					site: that.weizhi,
					speak: that.beizhu
				};
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatMeetings',
					method: 'POST',
					data: param,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false,
							success: function (res) {
								that.showMask = false;
								that.showState = false;								
							}
						})
					}
				})
			},
			cancel () {
				var that = this;
				var seldata = {
					UserId: that.userid,
					duty: that.duty,
					longitude: that.jingdu,
					latitude: that.weidu,
					site: that.weizhi,
					evaluate: that.evaluate,
					grade: that.grade
				};
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatQuit',
					method: 'POST',
					data: seldata,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false,
							success: function (res) {
								that.showMask = false;
								that.showCancel = false;
							}
						})
					}
				})
			},
			showData(){
				var that = this;
					uni.getStorage({
						key: 'userid',
						success: function (res) {
						that.userid = res.data;
						var param = {
									UserId: that.userid,
									page: 1,
									limit: 5,
								};
								uni.request({
									url: 'https://www.wanbaokj.xyz/MobileTerminal/UnreadMessage',
									method: 'POST',
									data: param,
									header: {
										"Content-Type": "application/x-www-form-urlencoded",
										"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
									},
									success: function (res) {
										if (res.data > 0) {
											that.wd = true;
										}
									}
								})
						 },
					})
					
					uni.request({
						url: 'https://www.wanbaokj.xyz/MobileTerminal/GetSlideshow',
						method: 'POST',
						header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
						},
						success: function (res) {
						var arr = [];
						if(uni.getStorageSync('userid') != ''){
							for (let i = 0; i < res.data.inform.length; i++) {
								arr.push(res.data.inform[i]);
							}
						}				
						for (let i = 0; i < res.data.product.length; i++) {
							arr.push(res.data.product[i]);
						}
						console.log(arr);
						that.imgUrls = arr;
						},
						
					})
					uni.request({
						url: 'https://www.wanbaokj.xyz/MobileTerminal/GetSellLikeHotCakes',
						method: 'POST',
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
							"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
						},
						success: function (res) {        
						var n = res.data.length;
						if(n == 0){
							 return false;
						}
						that.list = res.data;
						}
					})
					uni.request({
						url: 'https://www.wanbaokj.xyz/MobileTerminal/GetActivitiesOfTheProduct',
						method: 'POST',
						header: {
							 "Content-Type": "application/x-www-form-urlencoded",
							 "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
						},
						success: function (res) {
							that.huodong = res.data;
						}
					})
					var time = date.formatTime(new Date());
					that.qdsj = time;
// 					plus.geolocation.getCurrentPosition(function(p){
// 						console.log(p.coords.latitude);
// 						console.log(p.coords.longitude);
// 						console.log(p.addresses);
// 						that.jingdu = p.coords.longitude;
// 						that.weidu = p.coords.latitude;
// 						that.weizhi = p.addresses;
// 					}, function(e){
// 						console.log('Gelocation Error: code - ' + e.code + '; message - ' + e.message);
// 					} );
			}
		},
		onLoad() {
			this.showData();
		},
		onShow() {
			var that = this;
			uni.getStorage({
				key: 'userid',
				success: function (res) {
				that.userid = res.data;
				var param = {
							UserId: that.userid,
							page: 1,
							limit: 5,
						};
						uni.request({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/UnreadMessage',
							method: 'POST',
							data: param,
							header: {
								"Content-Type": "application/x-www-form-urlencoded",
								"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
							},
							success: function (res) {
								if (res.data > 0) {
									that.wd = true;
								}
								else{
									that.wd = false;
								}
							}
						})
				 },
			})
		},
		onPullDownRefresh() {
			this.showData();
			setTimeout(function () {
					uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style>
    .index {
        flex: 1;
        flex-direction: column;
    }
    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }
  .top_view{
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		top: 0;
		background: #fff;
		z-index: 99;
  }
  .title{
		width: 100%;
		padding: 10upx 30upx;
		align-items: center;
		position: fixed;
		top:var(--status-bar-height);
		background: #fff;
		z-index: 99;
  }
	.message{
		margin-right: 30upx;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}
	.search{
		width:400upx;
		background:#f4f4f4;
		border-radius: 50upx;
		padding:20upx 10upx;
		align-items: center;
		font-size:28upx;
	}
	.kefu{
		margin: 0 30upx;
		flex-direction: column;
		justify-content: center;
	}
	.saoma{
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
	.content{
		align-items: center;
		margin:20upx 0;
	}
	.ct-item{
		flex:1;
		justify-content: center;
		flex-direction: column;
	}
	.ct-img{
		justify-content: center;
	}
	.ct-tip{
		justify-content: center;
		font-size: 28upx;
		color:rgb(104,104,104);
	}
	.pic1{
		width:50upx;
		height:50upx;
		border-radius: 50%;
		background: red;
	}
	.product{
	  padding:20upx;
	  flex-direction: column;
	}
	.tit{
	  font-size: 32upx;
	  font-weight: 700;
	  color:#333;
	  flex-direction: column;
	}
	.rexiao{
	  justify-content: space-between;
	  align-items: center;
	}
	.more{
	  align-items: center;
	}
	.gengduo{
	  font-size: 28upx;
	  color:#999;
	}
	.rx-shuom{
		flex-direction: column;
	}
	.hotContaint{
		flex-wrap: wrap;
	}
	.rx-list{
	  margin-top:30upx;
		width: 337upx;
		margin-left:10upx;
		margin-right:8upx;
	}
	.rx-item{
		justify-content: space-between;
		align-items: center;
		margin-left: 4upx;
		margin-right: 8upx;
	}
	.rx-left{
		flex-direction: column;
	  align-items: center;
	}
	.rx-left view{
		width: 337upx;
	}
	.rx-tit{
	  font-size:28upx;
	  line-height: 48upx;
	  color:#484848;
	}
	.rx-des{
	  font-size: 24upx;
		color:#AFAEAE;
		width:337upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	  display:block;
	}
	.slider{
		flex-direction: column;
		margin-top:100upx;
		
	}
	.shouming{
	  color:#686868;
	  font-size:25upx;
	  text-align: center;
	}
	.weidu{
		position: absolute;
		top:7upx;
		right:5upx;
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

	.popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 600upx;
		height: 650upx;
		border-radius: 10upx;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		flex-direction:column;
	}
	.section_gap{
		align-items: center;
		margin:20upx 40upx;
		font-size: 28upx;
	}
	.section_wap{
		flex-direction:column;
		margin: 20upx 40upx;
		font-size: 28upx;
	}
	.section_title{
		width:200upx;
	}
	.section_text{
		width:480upx;
	}
	.speak{
		width:100%;
		border: 1px solid #ddd;
		height:150upx;
		margin-top: 10upx;
	}
	.confirm{
		background: #04D5C4;
		color:#fff;
		padding: 10upx 20upx;
		font-size: 32upx;
		margin-top: 10upx;
	}
	.right .star {
		width: 54upx;
		height: 54upx;
		text-align: center;
		line-height: 54upx;
		padding: 48upx 2upx;
	}
	.star image{
		width: 48upx;
		height: 48upx;
	}
	.jianyi{
		margin-top:30upx;
		color: #999999;
		font-size: 28upx;
		width: 750upx;
		justify-content: center;
	}
	.jybtn{
		width: 750upx;		
		margin: 40upx 0;
	}
	.jybtn button{
		padding:5upx 20upx;
		color: #999999;
		font-size: 28upx;
		line-height:40upx;
		background-color:#fff;
	}
</style>
