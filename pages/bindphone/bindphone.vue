<template>
	<view class="content">
	  <view class="section">
		  <view class='icon'><image src='../../static/images/phone.png'></image></view>
		  <view>
			   <input type='number' @input='bindKeyInput' placeholder="请输入手机号"/>
		  </view>
		</view>
		<view class="section">
		  <view class='icon'><image src='../../static/images/code.png'></image></view>
		  <view class="section-code">
			  <input type='number' class='yzm' @input='confirm' placeholder="请输入验证码" />
			  <button :disabled='disabled' @tap="setText" class='getCode'>{{butTxt}}</button>
		  </view>
		</view>
		<view v-if="showView" class="section">
		  <view class='label'>姓名：</view>
		  <view>
			  <input placeholder='请输入您的姓名' @input='enterName' :value="name"/>
		  </view>
		</view>
		<button class='bd' @tap="sign">{{btnText}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				butTxt: '获取验证码',
        disabled: true,
				phone: '',//手机号码
				showView:false,
				name:'',//姓名
				AuthCod:'',
				btnText:'登录'
			};
		},
		methods: {
			enterName(e) {
				var that = this;
				var insertName = e.detail.value;
				that.name = insertName;	           
			},
			confirm(e) {
				var that = this;
				var enterYzm = e.detail.value;
				that.AuthCod = enterYzm;
			},
			bindKeyInput(e) {
				var that = this;
				var insertNum = e.detail.value;
				var countdown = 60;
				var mobile = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
				if (mobile.test(insertNum)) {
				  that.disabled = false;
				  that.phone = insertNum;
				} else {
				  that.disabled = true;
				}
			},
			setText() {
				var that = this;
				if (that.disabled == true) {
				  return false;
				}

				var countNum = 60;
				var B = setInterval(function () {
				  that.disabled = true;
				  that.butTxt = countNum + 'S后可再获取';
				  if (countNum == 1) {
					clearInterval(B);
					that.disabled = false;
					that.butTxt = '获取验证码';
				  }
				  countNum--;
				}, 1000);
				var yzmParam = {
				  iphone: that.phone,
				};
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/APPVerification', //仅为示例，并非真实接口地址。
					data: yzmParam,
					method:'post',
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: (res) => {
						console.log(res.data);
						var content = res.data.msg;
						if(res.data.type == 0){
							that.showView = false;
							uni.showModal({
								title: '提示',
								content: content,
								showCancel: false,
							})
						}
						else if(res.data.type == 2){
						  that.showView = true;
							that.btnText = '注册';
							uni.setNavigationBarTitle({
									title: '注册'
							});
						}
					}
				});
			},
			sign(){
				var that = this;
				if (that.showView){
				  var zcParam = {
					iphone: that.phone,
					name: that.name,
					AuthCod: that.AuthCod
				  };
					if (zcParam.iphone == '' || zcParam.AuthCod == ''|| zcParam.name == ''){
						uni.showModal({
						title: '提示',
						content: '请完整填写！',
						showCancel: false,
						})
						return false;
					}
					uni.request({
						url: 'http://101.132.187.72:8001/MobileTerminal/AppRegister',
						method: 'POST',
						data: zcParam,
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
							"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
						},
						success: (res) =>{
						console.log(res.data);
						if (res.data.type == 1) {
							uni.showModal({
							title: '提示',
							content: res.data.msg.hint,
							showCancel: false,
							success: function (ret) {
								uni.setStorage({
								key: "userid",
								data: res.data.msg.UserId
								});
								uni.reLaunch({
								url: '../wode/wode'
								})
							}
							})
						} 
						else {
							uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false,
							})
						}
						}
					})
				  
				}
				else{
					var zcParam = {
						iphone: that.phone,
						AuthCod: that.AuthCod
					};
					if (zcParam.iphone == '' || zcParam.AuthCod == ''){
					  uni.showModal({
						title: '提示',
						content: '请完整填写！',
						showCancel: false,
					  })
					  return false;
					}
					uni.request({
					  url: 'http://101.132.187.72:8001/MobileTerminal/AppLoading',
                      method: 'POST',
					  data: zcParam,
					  header: {
							"Content-Type": "application/x-www-form-urlencoded",
							"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
						},
						success: (res) =>{
						console.log(res.data);
						if (res.data.type == 1) {
						  uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false,
							success: function (ret) {
							  uni.setStorage({
								key: "userid",
								data: res.data.UserId
							  });
							  uni.reLaunch({
								url: '../wode/wode'
							  })
							}
						  })
						} 
						else {
						  uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false,
						  })
						}
					  }
					})
				}
				
			}
		}
	}
</script>

<style>
.content{
	flex-direction: column;
	flex:1;
}
.icon{
  padding-right:40upx;
  width: 60upx;
  border-radius:100upx;
}
.icon image{
  width:60upx;
  height:60upx;
}
.yzm{
  width:300upx;
  height:30px
}
.getCode{
  width:50%;
  background-color:#04d5c4;
  font-size: 12px;
  color:#fff;
}
.bd{
  background-color: #04d5c4;
  margin:60upx 40upx;
  color:#fff;
}
.section{
	padding:30upx 0;
	margin: 0 40upx;
	border-bottom: 1px solid #f1f1f1;
	align-items: center;
	font-size: 30upx;
}
.bd-content{
	margin-top: 20upx;
}
.label{
  padding-left:50upx;
  width:80px;
}
.section-code{
	justify-content: space-between;
	width:100%;
}

</style>
