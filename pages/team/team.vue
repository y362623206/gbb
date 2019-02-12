<template>
	<view class="outbox">
		<view class="topfixed">
		  <view class='tiaojian'>
			<view class='timeBox'>
			<picker mode="date" :value="date" start="1990-01-01" end="2028-1-18" @change="bindStartDateChange">  
			  <view class="picker">  
				开始: {{startTime}}  
			  </view>  
			</picker> 
			</view>
			<view class='timeBox'>
			<picker mode="date" :value="date" start="1990-01-01" end="2028-1-18" @change="bindEndDateChange">  
			  <view class="picker">  
				结束: {{endTime}}  
			  </view>  
			</picker>
			</view>
			<button class='confirm' @tap='changeTime'>查询</button>
		  </view>
		</view>

		<view class="section">
		  <view class="item-man">直辖人力：{{selData.manpower}}</view>
		  <view class="item-man">出单人力：{{selData.issuing}}</view>
		</view>
		  <!--表格-->
		<view v-for="(item,index) in listData" :key="index">
		  <view class='box'>
			<label class='title'>{{item.name}}:</label>
			<view class="td">
			  <label>工号：</label>
			  <view>{{item.jobnumber}}</view>
			</view>
			<view class="td">
			  <label>预收保费：</label>
			  <view>{{item.presell}}</view>
			</view> 
			<view class="td">
			  <label>承保保费：</label>
			  <view>{{item.underwrite}}</view>
			</view>  
		  </view>
		</view>

		<view v-if="nodata" class="cover">
			<image src='https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/7423fe89-8e37-4b70-ac67-0fc9627df582.png' style="width:420upx" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	var tools = require('../../components/common.js');
	export default {
		data() {
			return {
				startTime: tools.setinput(-3),
				endTime: tools.setinput(0),
				index: 0,//当前页码在页码数组中的位置
				array: [1, 2, 3, 4, 5],//页码数组
				curPage: '1',//当前页码
				useLast: true,//上一页是否禁用
				useNext: false,//下一页是否禁用
				listData:[],
				selData:[],
				nodata: false,
			};
		},
		methods:{
			bindStartDateChange: function (e) {
				this.startTime=e.detail.value;
			},
			bindEndDateChange: function (e) {
				this.endTime=e.detail.value;
			},
			changeTime: function () {
				this.showdata();
			},
			showdata:function(){
				var that = this;
				uni.showLoading({
					title: '加载中',
				})
				uni.getStorage({
					key: 'userid',
					success: function (res) {
						var param = {
							UserId: res.data,
							BeginDate: that.startTime,
							EndDate: that.endTime,
						}
						uni.request({
							url: 'https://www.wanbaokj.xyz/MobileTerminal/WeChat_GetLifeGroup',
							method: 'POST',
							data: param,
							header: {
									"Content-Type": "application/x-www-form-urlencoded",
									"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
								},
							success: function (res) {
								setTimeout(function () {
									uni.hideLoading()
								}, 1000)
								console.log(res.data);
								var data = res.data.msg;
								if (data.count == 0) {
									that.nodata=true;
								}

								that.listData=data.data.component;
								that.selData=data.data.statistics[0];
									console.log(that.selData);
							}
						})
					}
				})
			}
		},
		onLoad: function () {
			this.showdata();			
		},

	}
</script>

<style>
/* pages/zzgj/zzgj.wxss */
.outbox{
  background-color: #f4f4f4;
  flex-direction: column;
}
.topfixed{
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:100;
  background:#fff;
}
.timeBox{
  width: 40%;
  font-size:28upx;
}
.confirm{
  border: 1upx solid #04d5c4;
  color: #04d5c4;
  background-color: #fff;
  font-size:28upx;
	line-height: 56upx;
}
.tiaojian{
  padding:20upx;
  width: 750upx;
  align-items: center;
}

.section{
  display: flex;
  border-bottom:1upx solid #ddd;
  margin-top:120upx;
  background-color: #fff;
  width: 750upx;
}
.item-man{
  width:50%;
  padding: 30upx;
  font-size: 26upx;
  font-weight: 700;
}
.table {  
  border: 0px solid darkgray;
}
.tr {  
  display: flex;   
  justify-content: center;  
  height: 88upx;  
  align-items: center;
}
.td {    
  width:250upx;    
  justify-content: center;    
  text-align: center;
  font-size: 26upx;
}
.bg-w{  
  background: #E5FBF7;
}
.bg-g{  
  background: #E6F3F9;
}
.th {  
  width: 250upx;  
  justify-content: center; 
  background: #04d5c4;  
  color: #fff;  
  display: flex;  
  height: 88upx; 
  align-items: center;
}
.toolBar{
  position: fixed;
  bottom: 5px;
  left: 0;
  right: 0;
  line-height:2.55555556;
  font-size: 26upx;
  background-color: #fff;
  padding-left: 10upx;
}
.toolBar view,.toolBar view label,.toolBar view picker{
  float: left;
  line-height:2.55555556;
  text-align: center;
  height: 56upx;
  justify-content: center;
}
.toolBar view{
  width:300upx;
}
.toolBar view label{
  width: 50upx;
}
.toolBar view picker view{
  width: 197upx;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.toolBar button{
  width: 215upx;
  float: left;
  font-size: 26upx;
  background-color:#04d5c4;
  color:#fff;
}
.box{
  background-color: #fff;
  margin-bottom: 20upx;
  flex-direction: column;
}
.title{
  font-family: PingFang-Sc-Regular;
  font-size: 32upx;
  height: 56upx;
  color: #04d5c4;
  padding-left: 60upx;
  width: 690upx;
  display: block;
  border-bottom: 1upx solid #f4f4f4;
  line-height: 70upx;
  overflow: hidden;
}
.td{
  height: 88upx;
  line-height: 88upx;
  color: #686868;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: PingFang-Sc-Regular;
  font-size: 26upx;
  padding-left: 60upx;
  width: 690upx;
  background-color: #fff;
  border-bottom: 1upx solid #f4f4f4;
}
.td label{
  width: 200upx;
  text-align: left;
}
.td view{
  display: inline-block;
}
.cover{
  display: flex;
  justify-content: center;
  position: absolute;
  background: #fff;
  padding-top:200upx;
  width:100%;
  height:70%;

}
</style>
