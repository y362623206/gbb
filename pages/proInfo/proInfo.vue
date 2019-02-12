<template>
	<view class="outbox">
		<scroll-view :scroll-into-view="toView" scroll-y="true" style="height:100vh;"  @scroll="scroll"  :scroll-top="scrollTop">
		<!-- 产品图 -->
		<view class='proImg'>
			<image :src='thumbnail'></image>
			<view class="title">
				<view style="font-weight:700">{{title}}</view>
				<view class="gongsi">{{gongsi}}承保</view>
			</view>
		</view>

		<!-- 菜单栏 -->
		<view class='subMenu'>
		  <view :class="now=='bzgl'?'wx-this':'normal'" @tap="changeMenu('bzgl')">保障概览</view>
		  <view :class="now=='cpts'?'wx-this':'normal'" @tap="changeMenu('cpts')">产品特色</view>
		  <view :class="now=='bxzr'?'wx-this':'normal'" @tap="changeMenu('bxzr')">保险责任</view>
		  <view :class="now=='tkzl'?'wx-this':'normal'" @tap="changeMenu('tkzl')">条款资料</view>
		</view>

		<!-- 内容 -->
		  <view id='bzgl'><image mode='widthFix' :src='safeguard'></image></view>
		  <view id='cpts'><image mode='widthFix' :src='feature'></image></view>
		  <view id='bxzr'><image mode='widthFix' :src='responsibility'></image></view>
		  <view id='tkzl' style="margin-bottom: 80rpx;"><image mode='widthFix' :src='terms'></image></view>
			
		<view :class="scrollY>228 ? 'topnav' : 'hide'">
				<view class='subMenu'>
					<view :class="now=='bzgl'?'wx-this':'normal'" @tap="changeMenu('bzgl')">保障概览</view>
					<view :class="now=='cpts'?'wx-this':'normal'" @tap="changeMenu('cpts')">产品特色</view>
					<view :class="now=='bxzr'?'wx-this':'normal'" @tap="changeMenu('bxzr')">保险责任</view>
					<view :class="now=='tkzl'?'wx-this':'normal'" @tap="changeMenu('tkzl')">条款资料</view>
				</view>
		</view>
		</scroll-view>

		<button @tap='copylink(external)'>计划书</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgarr:[],
				paylink:'',
				now:'bzgl',
				toView:'bzgl',//锚点
				thumbnail:'',//缩略图
				title:'',//标题
				safeguard:'',//保障概览
				feature:'',//产品特色
				responsibility:'',//保险责任
				terms:'',//条款资料
				external:'',//计划书链接
				gongsi:'',
				scrollTop:'0',
                scrollY: '',
			};
		},
		methods:{
			copylink:function(e){
				var link = e;
				uni.navigateTo({
					url:'../jihuashu/jihuashu?link=' + link
				})
			},
			changeMenu: function (event){
				var thisname = event;
				console.log(thisname);
				this.now=thisname;
				this.toView=thisname;
			},
			scroll:function(e){
				this.scrollY = e.detail.scrollTop;
			},
		},
		onLoad: function (options) {
			var that=this;
			var id = options.id;
			uni.request({
				url: 'https://www.wanbaokj.xyz/MobileTerminal/SelteteProuctS', //仅为示例，并非真实的接口地址
				data: {
					id:id,
				},
				method: 'post',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				},
				success: function (res) {
					console.log(res.data);
					that.thumbnail=res.data[0].thumbnail;//缩略图
					that.title=res.data[0].title;//标题
					that.safeguard=res.data[0].safeguard;//保障概览
					that.feature=res.data[0].feature;//产品特色
					that.responsibility=res.data[0].responsibility;//保险责任
					that.terms= res.data[0].terms;//条款资料
					that.external= res.data[0].external;//计划书链接
					that.gongsi = res.data[0].insurancename__insurancename;
				}
			})
		},
	}
</script>

<style>
	.outbox{
	  background-color: #f4f4f4;
	  flex-direction: column;
	  width: 750upx;
	}
	.proImg{
	  width: 100%;
		flex-direction: column;
	}
	.proImg image{
	  width: 100%;
	  height: 360upx;
	}
  .title{
		padding:20upx;
		font-size: 32upx;
		background: #fff;
		margin-bottom: 10upx;
		justify-content: space-between;
	}
	.gongsi{
		font-size: 24upx;
		color:#999;
	}
	.subMenu{
	  width: 100%;
		justify-content: space-around;
		align-items: center;
		font-weight: 200;
		font-family: PingFang-Sc-Regular;
		background: #fff;
	}
	.wx-this{
	  color: #fe7e29;
	  font-size: 32upx;
	  line-height: 68upx;
		border-bottom: 1px solid #fe7e29;
	}
	.normal{
	  color: #484848;
	  font-size: 32upx;
	  line-height: 68upx;
	}

	scroll-view image{
	  width: 750upx;
	  height: auto;
	}
	button{
	  left: 20upx;
	  width: 710upx;
	  position: fixed;
	  bottom: 20upx;  
	  border-radius: 50upx;
	  color:#fff;
	  background-color:#04d5c4;
	  font-size: 28upx;
	}
	.topnav{
		position: fixed;
		top:0;
		left:0;
		width:100%;
		background: #fff;
	}
	.hide{
		display: none;
	}
</style>
