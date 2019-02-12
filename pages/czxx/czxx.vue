<template>
	<view class="container">
		<view class="section-title">
			<view><image class="btx" src="../../static/images/btx.png"></image>行驶证信息</view>
			<view @tap="xszsb()" style="margin-right: 20upx;"><image style="width:70upx;height:70upx" src="../../static/images/tubiao/xiangji.png"></image></view>
		</view>
		<view class="section">
			<view>车牌号码</view>
			<view class="xsz"><input @input="cphm" :value="plateNo" /></view>
		</view>
		<view class="section">
			<view>品牌型号</view>
			<view class="xsz"><input @input="ppxh" :value="Brand" /></view>
		</view>
		<view class="section">
			<view>车辆识别代号</view>
			<view class="xsz"><input @input="clsbdh" :value="vin" /></view>
		</view>
		<view class="section">
			<view>发动机号码</view>
			<view class="xsz"><input @input="fdjhm" :value="engine" /></view>
		</view>
		<view class="section">
			<view>注册日期</view>
			<view class="xsz">
				<picker class="picker-item" mode="date" start="1970-01-01" end="2099-12-31" @change="dateChange1">
					<view>{{registerDate}}</view>
				</picker>
			</view>
		</view>
		<view class="section">
			<view>发证日期</view>
			<view class="xsz">
				<picker class="picker-item" mode="date" start="1970-01-01" end="2099-12-31" @change="dateChange2">
					<view>{{issueDate}}</view>
				</picker>
			</view>
		</view>
		<view style="background: #f4f4f4;height:16upx"></view>					
		<view class="section-title">
			<view><image class="btx" src="../../static/images/btx.png"></image>车主信息</view>
			<view @tap="sfzsb()" style="margin-right: 20upx;"><image style="width:70upx;height:70upx" src="../../static/images/tubiao/zhengjian.png"></image></view>
		</view>
		<view class="section">
			<view>车主姓名</view>
			<view class="xsz"><input @input="czxm" :value="name"/></view>
		</view>
		<view class="section">
			<view>身份证号码</view>
			<view class="xsz"><input @input="sfzhm" :value="identifyNumber"/></view>
		</view>
		<view class="tip">请检查内容的正确性！</view>	
		<view class="footer" @tap="setqueren">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plateNo:'',
				Brand:'',
				vin:'',
				engine:'',
				registerDate:'',
				issueDate:'',
				name:'',
				identifyNumber:''
			};
		},
		onLoad(options) {
// 			console.log(options.obj);
// 			var data = JSON.parse(options.obj);
//             this.plateNo = data.plateNo;
// 			this.Brand = data.Brand;
// 			this.vin = data.vin;
// 			this.engine = data.engine;
// 			this.registerDate = data.registerDate;
// 			this.issueDate = data.issueDate;
		},
		methods:{
			czxm(e){
				this.name = e.detail.value;
			},
			sfzhm(e){
				this.identifyNumber = e.detail.value;
			},
			dateChange1(evt) {
				this.registerDate = evt.detail.value;
			},
			dateChange2(evt) {
				this.issueDate = evt.detail.value;
			},
			fdjhm(e){
				this.engine = e.detail.value;
			},
			clsbdh(e){
				this.vin = e.detail.value;
			},
			ppxh(e){
				this.Brand = e.detail.value;
			},
			cphm(e){
				this.plateNo = e.detail.value;
			},
			setqueren(){
				var that = this;
				var czxx = {
					plateNo: that.plateNo,
					Brand: that.Brand,
					vin: that.vin,
					engine: that.engine,
					registerDate: that.registerDate,
					issueDate: that.issueDate,
					name:that.name,
					identifyNumber:that.identifyNumber,
					company:'ZM',
				}
				for(var key in czxx){
					if(czxx[key] == ''){
						uni.showModal({
							title: '提示',
						    content: '请完整输入后再提交！',
							showCancel:false
						})
						return false;
					}
				}
				czxx = JSON.stringify(czxx);
				uni.setStorageSync('czxx_key', czxx);
				var param = {
					vehicleNameS:that.Brand,
					company:'ZM',
					page:'1',
					limit:'10'
				}
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/ModelQueries',
					method: 'POST',
					data:param,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						if(res.data.data.length == 0){
							uni.showModal({
								title: '提示',
							    content: '请检查品牌型号是否正确！',
								showCancel:false
							})
							return false;
						}
						var obj = JSON.stringify(res.data);
						uni.navigateTo({
							url:'../cxcx/cxcx?obj='+obj
						})
					}
				})
			},
			xszsb(){
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album','camera'], 
					success: function (res) {
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title: '加载中'
						});
						uni.uploadFile({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/CQrecognition', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'imageField',
							formData: {
								'type': 'B'
							},
							success: (uploadFileRes) => {
								uni.hideLoading();
								console.log(uploadFileRes.data);
								var data = JSON.parse(uploadFileRes.data);
								if(data.type == 0){
									uni.showToast({
										title: '识别失败！',
										icon: 'none',
										duration: 2000
									})
								}
								else{
									that.plateNo = data['号牌号码'];
									that.Brand = data['品牌型号'];
									that.vin = data['车辆识别代号'];
									that.engine = data['发动机号码'];
									that.registerDate = data['注册日期'].replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
									that.issueDate = data['发证日期'].replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
								}
							},
							fail(res) {
								uni.hideLoading();
								console.log(res);
							}
						});
					}
				});
			},
			sfzsb(){
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album','camera'], 
					success: function (res) {
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title: '加载中'
						});
						uni.uploadFile({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/CQrecognition', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'imageField',
							formData: {
								'type': 'A'
							},
							success: (uploadFileRes) => {
								uni.hideLoading();
								console.log(uploadFileRes.data);
								var data = JSON.parse(uploadFileRes.data);
								if(data.type == 0){
									uni.showToast({
										title: '识别失败！',
										icon: 'none',
										duration: 2000
									})
								}
								else{
                                    that.name = data['姓名'];
                                    that.identifyNumber = data['公民身份号码'];
								}
							},
							fail(res) {
								uni.hideLoading();
								console.log(res);
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
}
.section-title{
	font-size: 34upx;
	color:#1e1e1e;
	font-weight: 700;
	padding: 20upx 0;
	border-bottom: 1px solid #fafafa;
	justify-content: space-between;
	align-items: center;
}
.section{
   justify-content: space-between;
   border-bottom: 1px solid #fafafa;
   align-items: center;
   padding: 20upx;
   font-size: 28upx;
}
.xsz{
	text-align: right;
}
.btx{
	width:8upx;
	height:50upx;
	margin-left:30upx;
	margin-right: 22upx;
}
.tip{
	color:#fe472f;
	font-size: 22upx;
	padding:20upx;
}
.footer{
	position: fixed;
	width: 100%;
	bottom: 0;
	background: #04D5C4;
	color:#fff;
	font-size: 34upx;
	justify-content: center;
	padding: 20upx 0;
	z-index: 9;
}

</style>
