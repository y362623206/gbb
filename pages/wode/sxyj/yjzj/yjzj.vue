<template>
	<view class="container">
		<view class="section">
		  <view class="xinxi">工号：{{list.jobnumber}}</view>
		</view>
		<view class="section">
		  <view class="xinxi">姓名：{{list.name}}</view>
		</view>
		<view class="section" style="margin-bottom:20upx;border-bottom:1upx solid #dedede;">
		  <view class="xinxi">电话：{{list.iphone}}</view>
		</view>
		<view :data-code="list.initial" class="section" @tap="sqbf">
		  <view>首期部分：{{list.initial}}</view>
		  <view v-if="list.initial != 0" class="more"><image style="width: 10px;" mode="widthFix" src="../../../../static/images/wodeIcon/pointer@2x.png"></image>
		  </view>
		</view>
		<view :data-code="list.Noinitial" class="section" @tap='xqbf'>
		  <view>续期部分：{{list.Noinitial}}</view>
		  <view v-if="list.Noinitial != 0" class="more"><image style="width: 10px;" mode="widthFix" src="../../../../static/images/wodeIcon/pointer@2x.png"></image>
		  </view>
		</view>
		<view :data-code="list.brokerage" class="section" @tap='jxbf'>
		  <view>绩效部分：{{list.brokerage}}</view>
		  <view v-if="list.brokerage != 0" class="more"><image style="width: 10px;" mode="widthFix" src="../../../../static/images/wodeIcon/pointer@2x.png"></image>
		  </view>
		</view>
		<view :data-code="list.liferebate" class="section" @tap='tjjbf'>
		  <view>推荐奖部分：{{list.liferebate}}</view>
		  <view v-if="list.liferebate != 0" class="more"><image style="width: 10px;" mode="widthFix" src="../../../../static/images/wodeIcon/pointer@2x.png"></image>
		  </view>
		</view>
		<view :data-code="list.lifemanagement" class="section" @tap='gljtbf'>
		  <view>管理津贴部分：{{list.lifemanagement}}</view>
		  <view v-if="list.lifemanagement != 0" class="more"><image style="width: 10px;" mode="widthFix" src="../../../../static/images/wodeIcon/pointer@2x.png"></image>
		  </view>
		</view>
		<view :data-code="list.commission" class="section" @tap='jyfn'>
		  <view>加佣方案：{{list.commission}}</view>
		  <view v-if="list.commission != 0" class="more"><image style="width: 10px;" mode="widthFix" src="../../../../static/images/wodeIcon/pointer@2x.png"></image>
		  </view>
		</view>
	</view>
</template>

<script>
	var year;
  var month;
	export default {
		data() {
			return {
				list:{}
			};
		},
		methods:{
			sqbf:function(e){
				 var code = e.target.dataset.code;
				 if(code != 0){
				   uni.navigateTo({
					 url: '../yjmx/yjmx?year=' + year + '&month=' + month + '&type=A'
				   });
				 }
			  },

			  xqbf: function (e) {
				var code = e.target.dataset.code;
				if (code != 0) {
				  uni.navigateTo({
					url: '../yjmx/yjmx?year=' + year + '&month=' + month + '&type=B'
				  });
				}
			  },

			  jxbf: function (e) {
				var code = e.target.dataset.code;
				if (code != 0) {
				  uni.navigateTo({
					url: '../yjmx/yjmx?year=' + year + '&month=' + month + '&type=C'
				  });
				}
			  },

			  tjjbf: function (e) {
				var code = e.target.dataset.code;
				if (code != 0) {
				  uni.navigateTo({
					url: '../yjmx/yjmx?year=' + year + '&month=' + month + '&type=D'
				  });
				}
			  },

			  gljtbf: function (e) {
				var code = e.target.dataset.code;
				if (code != 0) {
				  uni.navigateTo({
					url: '../yjmx/yjmx?year=' + year + '&month=' + month + '&type=E'
				  });
				}
			  },

			  jyfn: function (e) {
				var code = e.target.dataset.code;
				if (code != 0) {
				  uni.navigateTo({
					url: '../yjmx/yjmx?year=' + year + '&month=' + month + '&type=F'
				  });
				}
			  },
		},
		onLoad(options) {
			year = options.year;
			month = options.month;
			var that = this;
			uni.showLoading({
			  title: '加载中...',
			})
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				console.log(res.data);
				var users = res.data;
				var param = {
				  UserId: users,
				  datey: year,
				  datem: month,
				};
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/WbAppSelLifeC_YjHz', //仅为示例，并非真实的接口地址
				  data: param,
				  method: 'POST',
				  header: {
					  "Content-Type": "application/x-www-form-urlencoded",
					  "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
				  success: function (res) {
					console.log(res.data);
					uni.hideLoading();
					that.list = res.data;
				  }
				})


			  },
			})
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
	background-color:#F3F3F3;
}
.section{
  padding-left:60upx;
  border-bottom: 1px solid #f4f4f4;
  height: 88upx;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  font-family: PingFang-Sc-Regular;
}
.section view{
  font-size:28upx;
  color:#484848;
  font-family: PingFang-Sc-Regular;
}
.more{
  padding-right: 10px;
}
.xinxi{
  color:#999999;
  font-size: 26upx;
}
</style>
