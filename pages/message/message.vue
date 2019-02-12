<template>
	<view class="container">
		<view class="title">{{list.title}}</view>
		<wxParse :content="article" @preview="preview" @navigate="navigate" />
	</view>
</template>

<script>
	import marked from '../../components/marked';
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue';
	var mdcontend = "";
	export default {
		components: {
			wxParse
		},
		data() {
			return {
				article: '',
				userid:'',
				list:''
			};
		},
		methods: {
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
			}
		},
		onLoad(options) {
			console.log(options.id);
			var that = this;
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				console.log(res.data);
				that.userid = res.data;
				var param = {
				  id: options.id,
				  UserId:that.userid
				};
				console.log(param);
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/GetDetail',
				  method: 'POST',
				  data: param,
				  header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
				  success: function (res) {
					that.list = res.data.data[0];
					mdcontend = res.data.data[0].detail;
					that.article = marked(mdcontend);
				  }
				})
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/TagHasBeenRead',
				  method: 'POST',
				  data: { UserId: that.userid, id: options.id},
				  header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				  },
				  success: function (res) {

				  }
				})

			  }
			})
		}
	}
</script>

<style>
    @import url("../../components/mpvue-wxparse/src/wxParse.css");
	view{
		display: block;
		word-break:break-all;
        overflow:auto;

	}
	.container{
        width:100%;
		padding-top: 20upx;
	}
	.title{
	  text-align: center;
	  font-size:16px;
	  font-weight: 700;
	}
</style>
