<template>
	<view class="outbox">
		<view v-if="networkType" @tap='denglu' class="denglu" style="display: flex;">
			<image src="../../../static/images/denglu.png" style="width:70%;" mode="widthFix"></image>
		</view>
		<view v-else>
			<form @submit="formSubmit" @reset="formReset">
				<view class="section section_gap" v-for="(item,idx) in listData" :key="idx">
					<view class="section__title">{{item.subject}}</view>
					<radio-group :name="item.id">
						<label><radio value="A"/>A.{{item.answerA}}</label>
						<label><radio value="B"/>B.{{item.answerB}}</label>
						<label><radio value="C"/>C.{{item.answerC}}</label>
						<label><radio value="D"/>D.{{item.answerD}}</label>
					</radio-group>
				</view>
				<view class="btn-area">
					<button formType="submit">提交</button>
					<button formType="reset">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData:[],
				userid:'',
				networkType: false
			};
		},
		methods:{
			denglu: function (e) {
				uni.navigateTo({
				  url: '../../bindphone/bindphone',
				})
			},
			formSubmit: function (e) {
				var that=this;
				console.log('form发生了submit事件，携带数据为：', e.detail.value);
				uni.getStorage({
				  key: 'userid',
				  success: function (res) {
					console.log(res.data);
					var data = res.data;
					var param=[];
					var questions = e.detail.value;
					console.log(questions);
					for (var key in questions){
					  var items = [];
						if (questions[key] == ''){
							uni.showToast({
								title: '请答完再提交！',
								icon: 'fail',
								duration: 1000,
								mask: true
							})
							return false;
						}
					  items.push(data, key, questions[key] );
					  param.push(items);
					}
					console.log(param);
					  uni.request({
						url: 'https://www.wanbaokj.xyz/MobileTerminal/SaveTitleReq',
						method: 'POST',
						data: {
						  question: param
						},
						header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
            },
						success: function (res) {
						  console.log(res);
						  if(res.data.type==0){
							uni.showToast({
							  title: res.data.msg,
							  icon: 'fail',
							  duration: 1000,
							  mask: true
							})
						  }else{
							uni.showToast({
							  title: '提交成功，感谢参与',
							  icon: 'success',
							  duration: 1000,
							  mask: true
							})
						  }
						  setTimeout(function () {
							uni.navigateBack({
									delta: 1
							}) }, 2000)
						}
					  })
					}
				})
			},
		},
		onLoad: function (options) {
			var that=this;
			if (uni.getStorageSync('userid') == '') {
				that.networkType = true;
			}else{
				uni.getStorage({
					key: 'userid',
					success: function (res) {
						var userid=res.data;
						uni.request({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/GetTheTitle',
							method: 'POST',
							header: {
								"Content-Type": "application/x-www-form-urlencoded",
								"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
							},
							success: function (res) {
								console.log(res);
								that.listData=res.data;
							},
						})
					},
				})
			}
		},
	}
</script>

<style>
	.outbox{
		flex-direction: column;
		flex: 1;
	}
	.outbox view{
		display: block;
	}
	.ques{
	  padding: 20upx;
	}
	.ques view{
	  line-height: 1.5rem;
	  padding-left: 20upx;
	}
	.ques .title{
	  text-indent: 0em;
	}
	.ques label{
	  text-indent: 1em;
	  display: block;
	}
	.section__title{
	  padding-left: 30upx;
	  font-size: 28upx;
	  color: #484848;
	  line-height: 88upx;
	}
	label{
	  display: flex;
	  justify-content: flex-start;
	  align-items: center;
	  font-size: 26upx;
	  color: #686868;
	  margin-bottom: 10upx;
	  margin-left: 50upx;
	}
	.btn-area{
	  display: flex !important;
	  justify-content: space-around;
	}
	.btn-area button{
	  width: 40%;
	  margin-bottom: 10upx;
	  margin-top: 10upx;
	  font-size: 28upx;
	  color: #fff;
	  background: #04d5c4;
	}

	.denglu{
	  
	  justify-content: center;
	  margin-top: 100upx;
	  
	}
</style>
