<script>
	export default {
		onLaunch: function () {
// 			uni.request({
// 				url: 'https://www.wanbaokj.xyz/MobileTerminal/AppSetVersions',
// 				method: 'POST',
// 				header: {
// 					"Content-Type": "application/x-www-form-urlencoded",
// 					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
// 			    },
// 				success: function (res) {
// 					console.log(res.data);
// 					var url = 'http://wanbaoapp.oss-cn-shanghai.aliyuncs.com/guaibaobaoapp.apk';
// 					var vers = plus.runtime.version;
// 					var arr1 = res.data[0].versions.split(".");
// 					var arr2 = vers.split(".");
// 					var str = res.data[0].remarks.replace(/↵/g,"\n");
// 					if(vers == res.data[0].versions){
// 						if(uni.getStorageSync('userid') == ''){
// 							uni.showModal({
// 								title: '提示',
// 								content: '您还没有登录，请先登录！',
// 								showCancel:false,
// 								success: function (res) {
// 									uni.navigateTo({
// 										url: '../bindphone/bindphone'
// 									})
// 								}
// 							});
// 						}
// 						return false;
// 					}
// 					if(arr1[0] != arr2[0]){
// 						if(plus.os.name === 'Android'){
// 							uni.showModal({ 
// 								title: '更新提示',
// 								content: str,
// 								showCancel: false,
// 								confirmText:'下载',
// 								success: (res) => {									
// 									uni.navigateTo({
// 										url: "/pages/update/update?url=" + url
// 									})
// 								}
// 							})
// 						}
// 						else{
// 							uni.showModal({ 
// 								title: '更新提示',
// 								content: "请在app store更新,以免影响使用！",
// 								showCancel: false,
// 							})
// 						}
// 						return false;
// 					}
// 					if(arr1[0] == arr2[0] && arr1[1] != arr2[1]){
// 						if(plus.os.name === 'Android'){
// 							uni.showModal({ 
// 								title: '更新提示',
// 								content: str,
// 								confirmText:'下载',
// 								success: (res) => {
// 									if(res.confirm){
// 										uni.navigateTo({
// 											url: "/pages/update/update?url=" + url
// 										})
// 									}									
// 								}
// 							})
// 						}
// 						else{
// 							uni.showModal({ 
// 								title: '更新提示',
// 								content: "请在app store更新,以免影响使用！",
// 								showCancel: false,
// 							})
// 						}
// 						return false;
// 					}
// 				}
// 			})
						
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */

	page,
	view {
		display: flex;/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	page {
		min-height: 100%;
	}

</style>
