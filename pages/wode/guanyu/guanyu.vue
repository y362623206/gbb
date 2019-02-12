<template>
	<view class="outbox">
		<view class="title">
		 <image src="../../../static/images/icon.png" mode="widthFix" style="width:180upx;height:180upx;border-radius:40upx;"></image>
		</view>
		<view class="bangben">
		1.1.3版本
		</view>
		<view class="gengxin" @tap="update">
		检查更新
		</view>

		<view>
		  <label>用户协议</label>
		  <view class='cont'>
			<text>为保证您更好的使用服务，请您认真阅读用户协议。</text>
		  </view>
		</view>

		<view>
		  <label>隐私条款</label>
		  <view class='cont'>
			<text>我们会将在境内运营过程中收集和产生的你的个人信息存储于中华人民共和国境内，不会将上述信息传输至境外。我们仅会在为提供“乖保保”及服务之目的所必需的期间内保留你的个人信息；</text>
		  </view>
		</view>

		<view>
		  <label>关于我们</label>
		  <view class='cont'>
			<text :class="[answer,isFolded?'hide':'show']"  @tap="toogleAns()">湖北保重保险代理有限公司，机构编号D10431XLQ ；2005年12月31日，经中国保险监督管理委员会批准设立。经营范围：在湖北省行政辖区内代理销售保险产品；代理收取保险费；根据保险公司的委托，代理相关业务的损失勘查和理赔。是中国首批保险经融服务企业。
		保重人扎根于湖北，经过十一年艰苦创业，深耕细作建立了具有保重特色的运营体系和模式，获得了广大客户的一致好评，也收获了满意的成绩。伴随中国保险业深化改革的东风，中国保险业将“风雨砥砺鼓征帆，快马扬鞭自奋蹄”。建设中国最具价值的互联网+金融保险服务平台，打造行业具有影响力的保险服务品牌，做中国综合金融保险的领先者，立足湖北，服务全国，是保重人共同的企业使命。
			保重十一年砥砺前行，一直坚守着科学务实、严谨高效、诚实守信、创新求远的经营理念；基于员工幸福、客户满意、市场认同的价值观念；坚守先利人再利己，感恩于心，责任于行，中立公正、立信行业、守信大众、造福社会的行为准则。

		“一声保重，保重一生”。保重人一直致力于中国保险文化的研究与探索，倡导社会大众健康的保险消费习惯，积极关注社会民生，承担社会责任；为客户提供一站多元专业优质的保险金融服务；

		保重人重视企业健康可持续发展和品牌影响力如同生命，积极传播保险思想，保险让生活更美好！保险让家人更幸福！</text>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFolded: true,
			};
		},
		methods:{
			toogleAns: function () {
				console.log(this.isFolded);
				this.isFolded=!this.isFolded;
			},
			update:function() {
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/AppSetVersions',
					method: 'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						console.log(res.data);
						var url = 'http://wanbaoapp.oss-cn-shanghai.aliyuncs.com/guaibaobaoapp.apk';
						var vers = plus.runtime.version;
						var arr1 = res.data[0].versions.split(".");
						var arr2 = vers.split(".");
						var str = res.data[0].remarks.replace(/↵/g,"\n");
						if(vers == res.data[0].versions){
							uni.showModal({ 
								title: '提示',
								content: '已是最新版本，无需更新',
								showCancel: false,

							})
							return false;
						}
						if(arr1[0] != arr2[0]){
							if(plus.os.name === 'Android'){
								uni.showModal({ 
									title: '更新提示',
									content: str,
									showCancel: false,
									confirmText:'下载',
									success: (res) => {
										
										uni.navigateTo({
											url: "/pages/update/update?url=" + url
										})
									}
								})
							}
							else{
								uni.showModal({ 
									title: '更新提示',
									content: "请在app store更新,以免影响使用！",
									showCancel: false,
								})
							}
							return false;
						}
						if(arr1[0] == arr2[0] && arr1[1] != arr2[1]){
							if(plus.os.name === 'Android'){
								uni.showModal({ 
									title: '更新提示',
									content: str,
									confirmText:'下载',
									success: (res) => {
										if(res.confirm){
											uni.navigateTo({
												url: "/pages/update/update?url=" + url
											})
										}									
									}
								})
							}
							else{
								uni.showModal({ 
									title: '更新提示',
									content: "请在app store更新,以免影响使用！",
									showCancel: false,
								})
							}
							return false;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.outbox{
	  background-color:#f4f4f4;
	  flex-direction: column;
	}
	.outbox>view{
		flex-direction: column;
	}
	.title{
	  margin: 20upx 0 10upx;
	  display: block;
	  text-align: center;
	  width: 750upx;
	}
	.bangben{
	  text-align: center;
	  color:#1d1d1d;
	  font-size: 28upx;
	  font-weight: bold;
	}
	.gengxin{
		text-align: center;
		color:#04d5c4;
		font-size: 28upx;
		font-weight: bold;
	}
	label{
	  font-size: 28upx;
	  color: #484848;
	  font-family: PingFang-SC-Bold;
	  padding-left: 30upx;
	  margin-top: 44upx;
	  font-weight: bold;
	  display: block;
	}
	.cont{
	  padding: 20upx;
	  background-color: #fff;
	}
	.cont text{
	  color: #686868;
	  font-size: 26upx;
	  line-height: 1.5em;
	  text-indent: 2em;
	}
	.hide{
	  /*关键属性（必须有的）  */
	  display: -webkit-box; 
	  /*规定子元素的排列方向 */
	  -webkit-box-orient: vertical; 
	   /*限制文本显示的行数  */
	  -webkit-line-clamp:4;
	  /*实现多余的文字隐藏并用省略号来代表被隐藏的文字  */
	  overflow: hidden;
	  text-overflow:ellipsis;
	}
	.show{}
</style>
