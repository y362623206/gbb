<template>
	<view class="container">
		<view class="section">
		  <view @tap="starTap" :data-index="index"  class="star" v-for="(item,index) in userStars" :key="index">
			<image :src="item"></image>
		  </view>
		</view>
		<view class="section">
		  {{pfz}}
		</view>
		<view class="liyou">
		  <textarea @input='liyou' placeholder="请输入评价" placeholder-style="color:#ddd" maxlength="100" style="width:100%;height:200upx"/>
		</view>
		<view class="confirm">
		  <text class="btn" @tap='confirm'>确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pfz:'点触星星评分',
				grade: '',
				userid:'',
				huiyid:'',
				evaluate:'',
				userStars: [
				  '../../static/images/normal.png',
				  '../../static/images/normal.png',
				  '../../static/images/normal.png',
				  '../../static/images/normal.png',
				  '../../static/images/normal.png',
				]
			};
		},
		methods:{
			starTap(e) {
				var that = this;
				var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
				var tempUserStars = this.userStars; // 暂存星星数组
				var len = tempUserStars.length; // 获取星星数组的长度
				for (var i = 0; i < len; i++) {
				  if (i <= index) { // 小于等于index的是满心
					tempUserStars[i] = '../../static/images/selected.png'
				  } else { // 其他是空心
					tempUserStars[i] = '../../static/images/normal.png'
				  }
				}
				console.log(index);
				switch (index) {
				  case 0:
					that.pfz = '很差';
					break;
				  case 1:
					that.pfz = '较差';
					break;
				  case 2:
					that.pfz = '一般';
					break;
				  case 3:
					that.pfz = '推荐';
					break;
				  case 4:
					that.pfz = '力荐';
					break;
				}
				that.userStars = tempUserStars;
				that.grade =  parseInt(index) + 1;
			  },

			  liyou: function (e) {
				this.evaluate = e.detail.value;
			  },

			  confirm:function(){
				var that = this;
				if (that.grade == ''){
				  uni.showModal({
					title: '提示',
					content: '请评分后再提交',
					showCancel: false,

				  })
				  return false;
				}
				if (that.evaluate.length < 10 || that.evaluate.length > 100){
				  uni.showModal({
					title: '提示',
					content: '评论请在10~100的字符之间',
					showCancel: false,

				  })
				  return false;
				}
				var seldata = {
				  UserId: that.userid,
				  evaluate: that.evaluate,
				  grade: that.grade,
				  id: that.huiyid,
				};
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/GovernmentSchool_evaluate',
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
						uni.navigateBack({
						  delta: 1
						})
					  }
					})
					
				  }
				})
			  },
		},
		onLoad(options) {
			console.log(options);
			this.userid = options.userid;
			this.huiyid = options.id;

		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
}
.section{
  justify-content: center;
}
.star {
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
.liyou{
  border:1px solid #f0eff4;
  margin: 40upx;
  padding: 20upx;
  flex-direction: column;
}
.confirm{
  color:#04D5C4;
  margin-top:80upx;
  justify-content: center;
}
.btn{
  border: 1px solid #04D5C4;
  border-radius: 10upx;
  padding: 20upx 50upx;
}
</style>
