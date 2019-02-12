<template>
	<view class="outbox">
		<form @submit="formSubmit" @reset="formReset">
		  <view class="flex-wrp yijian">
			<view class="flex-item toptitle hanggao">
			  <view style='font-size:28upx;color:#484848;'><view style='color:red;display:inline;'>﹡</view>问题与建议：</view>
			  <view v-if="fkjl" style="color:#2EBA4C;font-size:28upx;color:#484848;" @tap="feedback">反馈记录</view>
			</view>
			<view class="flex-item">
			  <textarea placeholder="请在此描述问题和建议（必填）" @input="deleteEmoji" name="suggest"/>
			</view>
			<view class="flex-item hanggao">
			  联系方式：
			</view>
			<view class="flex-item">
			  <input name="phonenum" placeholder="输入电话号码" :value='iphone'/>
			</view>
			<view class="flex-item hanggao">
			  姓名：
			</view>
			<view class="flex-item">
			  <input name="name" placeholder="输入姓名" :value='name'/>
			</view>
		  </view>
		  <button formType="submit"> 提交 </button>
		</form>
	</view>
</template>

<script>
	var userid = "";
	export default {
		data() {
			return {
				name:'',
				iphone:'',
				fkjl:false,
			};
		},
		methods:{
			deleteEmoji:function(event){
				var reg1 = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]/g;
				event.detail.value = event.detail.value.replace(reg1, '');
				console.log();
			},
			feedback:function(){
				uni.navigateTo({
				  url: '../feedback/feedback',
				})
			},
			formSubmit: function (e) {
				console.log('form发生了submit事件，携带数据为：', e.detail.value); 
				var jianyi = e.detail.value.suggest;    
				console.log(jianyi);
				if (!jianyi || jianyi.length<5){
				  uni.showToast({
					title: '意见必填且至少为5字符',
					icon: 'none',
					duration: 2000
				  })
				  return false;
				}
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatOpinion', //仅为示例，并非真实的接口地址
				  method:'post',
				  data: {
					iphone: e.detail.value.phonenum,
					opinion: e.detail.value.suggest,
					name: e.detail.value.name,
					UserId: userid,
				  },
				  header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
				  success: function (res) {
					console.log(res.data);
					uni.showToast({
					  title: res.data.msg,
					  icon: 'success',
					  duration: 2000
					})
				  }
				})			   
			},
		},
		onLoad: function (options) {
			var that = this;
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				console.log(res.data);
				userid = res.data;
				var param = {
				UserId: userid
				};
				uni.request({
				url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChatFundamental',
				method: 'POST',
				data: param,
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				},
				success: function (res) {
					console.log(res.data);
					that.name= res.data[0].admin_basics_operator_bas__name;
					that.iphone= res.data[0].admin_basics_operator_bas__iphone;
					that.fkjl = true;
				}
				})
			  }
			})
		},
	}
</script>

<style>
	.outbox{
	  font-size: 28upx;
	  color: #484848;
	  font-family: PingFang-SC-Bold;
	  flex-direction: column;
	}
	.yijian{
	  padding: 0upx 20upx;  
	  flex-direction: column;

	}
	.yijian textarea,.yijian input{
	  background-color: #F6F8F8;
	  border-radius: 20upx;
	  padding: 20upx;
	  width: 670upx; 
	  
	  /* text-indent:2em; */
	  /*overflow-wrap: break-word;*/
	}
	form button{
	  left: 20upx;
	  width: 710upx;
	  position: fixed;
	  bottom: 50upx;  
	  border-radius: 50upx;
	  color:#fff;
	  background-color:#04d5c4;
	  font-size: 28upx;
	}
	.button-hover {
	  background-color: #fff;
	  color: #04d5c4;
	  font-size: 28upx;
	}
	.toptitle{
	  display: flex;
	  justify-content: space-between;
	}
	.hanggao{
	  line-height: 2em;
	  padding-top: 20upx;
	}
</style>
