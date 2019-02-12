<template>
	<view class="container">
		<view v-for="(item,index) in array" :key="index" style="flex-direction: column;">
		  <view class="li" :data-index="index" @tap='changeToggle'>
			<view class="left">{{item.name}}</view>
			<view class="right"> 
			  <image style="width: 30upx;" mode="widthFix" :src="selectedFlag == index ? '../../static/images/shang.png':'../../static/images/xia.png'"></image>
			</view>
		  </view>
		  <view v-show="selectedFlag == index" style="flex-direction: column;">
			<view :id="items.id" v-for="(items,indexs) in item.list" :key="indexs" :data-address="items.address" :data-des="items.describe" class="content" @tap='setVideo' >
			  <image style="width: 280upx;height:150upx;margin:20upx" :src="items.cover"></image>
			  <view class="content-title">
				   <view class="tit">{{items.title}}</view>
				   <view class="shijian">{{items.uploadingdata}}</view>
				   <view class="des">{{items.describe}}</view>
			  </view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				array:'',
				selectedFlag:0,
			};
		},
		methods:{
			changeToggle(e) {
				var index = e.currentTarget.dataset.index;
				if (this.selectedFlag == index) {
				  this.selectedFlag = 'm';
				} else {
				  this.selectedFlag = index;
				}
				console.log(this.selectedFlag);
			  },

			  setVideo(e){
				console.log(e.currentTarget.dataset);
				var src = e.currentTarget.dataset.address;
				var id = e.currentTarget.id;
				var des = e.currentTarget.dataset.des;
				uni.navigateTo({
				  url: '../video/video?src=' + src + '&&id=' + id + '&&des=' + des
				})
			  },
		},
		onLoad() {
			var that = this;
			uni.request({
				url: 'https://www.wanbaokj.xyz/MobileTerminal/GovernmentSchool',
				method: 'POST',
				header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
          },
				success: function (res) {
				console.log(res.data);
				var ret = res.data;
				if(res.data.msg.length == 0){
					return false;
				}
				//保存格式化后的json
				var newJson = {};
				var arr = [];
				//保存大标题数组
				var nameArr = [ret.msg[0]['catalogue__catalogue']];
				console.log(nameArr);
				//得到大标题数组
				for (var m = 0; m < ret.msg.length;m++){
					ret.msg[m].uploadingdata = ret.msg[m].uploadingdata.substring(0, 10);
					var arrStr = nameArr.join("-");
					if (arrStr.indexOf(ret.msg[m]['catalogue__catalogue'])==-1){
					nameArr.push(ret.msg[m]['catalogue__catalogue']);
					}
				}
				console.log(nameArr);
				for(var i=0;i<nameArr.length;i++){
					arr[i] = true;
				}
				//新json的格式
				for (var b = 0; b < nameArr.length; b++) {
					newJson[nameArr[b]]=[];
				}
				console.log(newJson);
				//给新JSON赋值
				for (var l = 0; l < ret.msg.length;l++){
					for (var q = 0; q < nameArr.length;q++){
					if (ret.msg[l]['catalogue__catalogue'] == nameArr[q]){
						newJson[nameArr[q]].push(ret.msg[l]);
					}
					}
				}
				console.log(newJson);
				//最终需要的json格式
				var thejson=[];
				for (var item in newJson){
					console.log(item);
					var theObj={};
					theObj.name = item;
					theObj.list = newJson[item];
					thejson.push(theObj);
				}
				console.log(thejson);
									
				that.array = thejson;
				}
			})
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex:1;
}
.li {
  background-color: #fff;
  justify-content: space-between;
  font-size: 34upx;
  padding: 0 20upx;
  height: 100upx;
  line-height: 100upx;
  border-bottom: 1upx solid #f1f1f1;
}
.bg-gray{
    background-color: #ccc!important;
    border-bottom: 1upx solid  #fff!important;
    font-size:30upx;
    padding: 20upx;
    text-align: center;
	flex-direction: column;
}

.li .icon-xiajiantou1 ,.icon-shangjiantou {
  color: #999;
}

.gray {
  color: #8e8e8e;
}

.red {
  color: #fe2e2e;
}
.content{
  width:100%;
}
.content-title{
 font-size:30upx;
 padding: 25upx;
 flex-direction: column;
 width: 380upx;
}
.tit{
  font-weight: 700;
  margin-bottom: 10upx;
}
.shijian{
  font-size:20upx;
  margin-bottom: 10upx;
}
.des{
  color:#999;
  font-size:20upx;
  width:380upx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.right{
	align-items: center;
}
</style>
