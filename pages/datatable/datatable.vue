<template>
	<view class="container">
		<view v-if="networkType" class="denglu" @tap='denglu'><image src="../../static/images/denglu.png" style="width:70%;" mode="widthFix"></image></view>
		<view v-else class="container">
			<view class="topfixed">
			<view class='tiaojian'>
				<view class='timeBox'>
				<picker mode="date" start="1990-01-01" end="2028-1-18" @change="bindStartDateChange">  
				<view class="picker">  
					开始: {{startTime}}  
				</view>  
				</picker> 
				</view>
				<view class='timeBox'>
				<picker mode="date" start="1990-01-01" end="2028-1-18" @change="bindEndDateChange">  
				<view class="picker">  
					结束: {{endTime}}  
				</view>  
				</picker>
				</view>
				<button class='confirm' @tap='changeTime'>查询</button>
				<view class="cf"></view>
			</view>

			<!--条件筛选栏结束-->

			<!--顶部导航栏-->
			<view class="flex-wrp" style="flex-direction:row;">
				<view id='che' data-num='1' data-name='che' :class="[itemClass ,num == 1 ? activeClass : '']" @tap='tabBanner'>车险</view>
				<view id='shou' data-num='3' data-name='shou' :class="[itemClass ,num == 3 ? activeClass : '']" @tap='tabBanner'>寿险</view>
				<view id='tuan' data-num='2' data-name='tuan' :class="[itemClass ,num == 2 ? activeClass : '']" @tap='tabBanner'>团险</view>
			</view>
			</view>
			<!--顶部导航栏-->

			<view v-if="tabName=='che'">
				<!--表格-->
				<view class="table">
				<view class="tr bg-w">
					<view class="th">日期</view>    
					<view class="th">车牌</view>
					<view class="th">险种</view>     
					<view class="th">金额</view>
				</view>
				<block v-for="(item ,index) in listData" :key="index">        
					<view :data-code="index" @tap='showInfo' class="tr" v-if="index % 2 == 0">      
					<view class="td">{{item.car_standing_matching__register}}</view>      
					<view class="td">{{item.license}}</view>
					<view class="td">{{item.category__mainmca}}</view>       
					<view class="td">{{item.premiums}} > </view>     
					</view>    
					<view :data-code="index" @tap='showInfo' class="tr bg-w" v-else>      
					<view class="td">{{item.car_standing_matching__register}}</view>      
					<view class="td">{{item.license}}</view>
					<view class="td">{{item.category__mainmca}}</view> 
					<view class="td">{{item.premiums}} > </view>        
					</view>
					<view v-if="Info==index" class="mingxi">
					<view class='left'>日期:{{currentData.car_standing_matching__register}}</view>
					<view class='right'>车牌:{{currentData.license}}</view>
					<view class='left'>被保险人:{{currentData.insured}}</view>
					<view class='right'>保险公司:{{currentData.channel__insurancename__insurancename}}</view>
					<view class='left'>险种:{{currentData.category__mainmca}}</view>
					<view class='right'>保费:{{currentData.premiums}}</view>
					<view class='left'>车船税:{{currentData.vehicle}}</view>
					<view class='right'>代理人:{{currentData.salesman__admin_basics_operator_bas__name}}</view>
					</view>     
				</block>  
				</view>
				<!--表格-->
			</view>
			<view v-else-if="tabName=='shou'">
				<!--表格-->
				<view class="table">
				<view class="tr bg-w">
					<view class="th">日期</view>    
					<view class="th">投保人</view>
					<view class="th">主/附险</view>     
					<view class="th">金额</view>
				</view>
				<block v-for="(item,index) in listData" :key="index">        
					<view :data-code="index" @tap='showInfo' class="tr" v-if="index % 2 == 0">      
					<view class="td">{{item.conclude}}</view>      
					<view class="td">{{item.applicant}}</view>
					<view class="td">{{item.insurance__mainmca__mainmca}}</view>      
					<view class="td">{{item.presell}} > </view>    
					</view>    
					<view :data-code="index" @tap='showInfo' class="tr bg-w" v-else>      
					<view class="td">{{item.conclude}}</view>      
					<view class="td">{{item.applicant}}</view> 
					<view class="td">{{item.insurance__mainmca__mainmca}}</view>     
					<view class="td">{{item.presell}} > </view>   
					</view>
					<view v-if="Info==index" class="mingxi">
					<view class='left'>保单号:{{currentData.warranty}}</view>
					<view class='right'>保单年度:{{currentData.periodbd__period}}</view>
					<view class='left'>保险公司:{{currentData.insurancename__insurancename__insurancename}}</view>
					<view class='right'>代理人:{{currentData.agency__admin_basics_operator_bas__name}}</view>
					<view class='left'>规模保费:{{currentData.presell}}</view>
					<view class='right'>缴费年期:{{currentData.periodjf__period}}</view>
					<view class='left'>签单日期:{{currentData.conclude}}</view>
					<view class='right'>投保人:{{currentData.applicant}}</view>
					<view class='left'>险种名称:{{currentData.insurance__generatormc}}</view>
					</view>     
				</block>  
				</view>
				<!--表格-->
			</view>
			<view v-else-if="tabName=='tuan'">
				<!--表格-->
				<view class="table">
				<view class="tr bg-w">
					<view class="th">日期</view>    
					<view class="th">业务员</view>    
					<view class="th">金额</view>
				</view>
				<block v-for="(item,index) in listData" :key="index">        
					<view :data-code="index" @tap='showInfo' class="tr" v-if="index % 2 == 0">      
					<view class="td">{{item.conclude}}</view>      
					<view class="td">{{item.agency__admin_basics_operator_bas__name}}</view>      
					<view class="td">{{item.presell}} > </view>    
					</view>    
					<view :data-code="index" @tap='showInfo' class="tr bg-w" v-else>      
					<view class="td">{{item.conclude}}</view>      
					<view class="td">{{item.agency__admin_basics_operator_bas__name}}</view>      
					<view class="td">{{item.presell}} > </view>   
					</view>
					<view v-if="Info==index" class="mingxi">
					<view class='left'>被保险:{{currentData.protege}}</view>
					<view class='right'>保险公司:{{currentData.insurancename__insurancename__insurancename}}</view>
					<view class='left'>机构:{{currentData.salesname__salesname}}</view>
					<view class='right'>录入日期:{{currentData.conclude}}</view>
					<view class='left'>签单保费:{{currentData.presell}}</view>
					<view class='right'>业务员:{{currentData.agency__admin_basics_operator_bas__name}}</view>
					<view class='left'>起保日期:{{currentData.efficient==null?"":currentData.efficient}}</view>
					<view class='right'>单（卡）号:{{currentData.warranty}}</view>
					</view>     
				</block>  
				</view>
				<!--表格-->
			</view>


			<!--工具栏开始-->
			<view class='toolBar'>
				<button @tap='lastPage' :disabled='useLast'>上一页</button>  
				<view>
				<label>第</label>
					<picker @change="setPage" :value="index" :range="array">
					<view class="picker">
						{{array[index]}}
					</view>
					</picker>
				<!-- <input bindblur='setPage' value='{{curPage}}'/> -->
				<label>页</label>
				</view>
				<!-- <button bindtap='refresh'>确定</button> -->
				<button @tap='nextPage' :disabled='useNext'>下一页</button>
			</view>
			<!--工具栏结束-->

			<!--遮罩开始-->
			<view class='zhezhao' v-if="showFold">
				<view>
				<image :src="img" mode="scaleToFill"></image>
				</view>
			</view>
			<!--遮罩结束-->

			<!-- 无数据遮罩 -->
			<view v-if="nomsg" class='nodata'>
			<image src='https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/7423fe89-8e37-4b70-ac67-0fc9627df582.png' style="width:420upx" mode="widthFix">
			</image>
			</view>
		</view>
	</view>
</template>

<script>
	var url;
	var tools = require("../../components/common.js");
	var startDate = tools.setinput(-3);
	var endData = tools.setinput(0);
	var cuxx;//查询信息
	var currentTab = "che";//当前tab页面
	var cdy;//出单员（对应车团寿卡四张表）
	var pageCount;//总页数 
	var clickRow;//当前行点击标志
	
	export default {
		data() {
			return {
				itemClass:'flexItem',
				activeClass:'flexHover',
				userid:'',
				num: '1',
				condition: false,
				tabName: 'che',
				listData: [],
				Info: 'n',//是否显示明细
				currentData: '',
				startTime: startDate,//开始时间
				endTime: endData,//结束时间
				index: 0,//当前页码在页码数组中的位置
				array: [1, 2, 3, 4, 5],//页码数组
				curPage: '1',//当前页码
				useLast: true,//上一页是否禁用
				useNext: false,//下一页是否禁用
				showFold: false,//遮罩是否显示
				img: '../../static/images/zhezhao.gif',
				nomsg:false,
				networkType:false
			};
		},
		methods:{
			changeTime () {
				this.getData(url);
			},

			  denglu (e) {
				uni.navigateTo({
				  url: '../bindphone/bindphone',
				})
			  },

			  bindStartDateChange(e) {
				console.log(e.detail.value)
				this.startTime = e.detail.value;
			  },
			  bindEndDateChange(e) {
				console.log(e.detail.value)
				this.endTime = e.detail.value;
			  },

			  total() {
				uni.navigateTo({
				  url: '../tongji/tongji?name=' + param.name + '&start=' + this.data.startTime + '&end=' + this.data.endTime
				})
			  },
			  /**
			   * 工具栏
			   */
			  setPage(e) {
				this.index = e.detail.value;
				this.curPage = Number(e.detail.value) + 1;
				if (this.curPage > pageCount) {
				  uni.showModal({
					title: '提示',
					content: '请输入正确的页码',
					success: function (res) {
					  if (res.confirm) {
						return false;
					  } else if (res.cancel) {
						return false;
					  }
					}
				  })
				}
				//获取数据
				this.getData(url);
			  },
			  //上一页
			  lastPage () {
				var that = this;
				that.index = Number(this.index) - 1;
				that.curPage = Number(this.curPage) - 1;
				//获取数据
				that.getData(url);
			  },
			  //下一页
			  nextPage () {
				var that = this;
				that.index = Number(this.index) + 1;
				that.curPage = Number(this.curPage) + 1;
				//获取数据
				that.getData(url);
			  },
			  /**
			   * 车团寿卡导航
			   */
			  tabBanner (e) {
				var that = this;
				currentTab = e.currentTarget.dataset.name;
				console.log(currentTab);
				switch (currentTab) {
				  case 'che':
					url = "https://www.wanbaokj.xyz/MobileTerminal/CarPerformance";
					break;
				  case 'shou':
					url = "https://www.wanbaokj.xyz/MobileTerminal/LifePerformance";
					break;
				  case 'tuan':
					url = "https://www.wanbaokj.xyz/MobileTerminal/GroupPerformance";
					break;
				};
				that.tabName = e.target.dataset.name;
				that.num = e.target.dataset.num;
				that.curPage = 1;
				that.index = 0;
				//获取数据
				that.getData(url);
			  },
			  /*表格行点击事件 */
			  showInfo (e) {
				var allData = this.listData;
				//若该行已经被点击，则再次点击隐藏明细
				if (clickRow == e.currentTarget.dataset.code) {
					console.log(1);
				  this.Info = 'n';
				  //清空点击标记
				  clickRow = 'm';
				  return false;
				}
				console.log(allData);
				for (var i = 0; i < allData.length; i++) {
				  if (i == e.currentTarget.dataset.code) {
					this.Info =  e.currentTarget.dataset.code;
					this.currentData = allData[i];
					//记录被点击的行
					clickRow = e.currentTarget.dataset.code;
				  }
				}
			  },
			  getData(url) {
				var that = this;
				that.showFold = true;
				var param = {
				  UserId: that.userid,
				  begindata: that.startTime,
				  enddata: that.endTime,
				  page: that.curPage,
				  limit: 10,
				}

				uni.request({
				  url: url,
				  method: 'POST',
				  data: param,
				  header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
				  },
				  success: function (res) {
					console.log(res.data);
					if (res.data.count == 0) {
					  that.nomsg = true;
					}

					setTimeout(function () {
						that.showFold = false;
					}, 1000)
					//计算出总页数
					var pageNum = Math.ceil(res.data.count / 10);
					var pageArr = [];
					for (var i = 1; i <= pageNum; i++) {
					  pageArr.push(i);
					}
					that.array = pageArr;
					//将总页数保存到变量中
					pageCount = pageNum;
					console.log(pageNum);
					if (that.curPage == 1) {
					  that.useLast = true;
					} else {
					  that.useLast = false;
					}
					if (that.curPage == pageNum) {
					  that.useNext = true;
					} else {
					  that.useNext = false;
					}
					console.log(res.data);
					that.listData = res.data.data;
					that.info = 'n';
				  }
				})
				
			  }
		},
		onLoad() {
			var that = this;
			if (uni.getStorageSync('userid') == '') {
				that.networkType = true;
			}
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				console.log(res.data);
				var data = res.data;
				console.log(data);
				that.userid = data;
				url = 'https://www.wanbaokj.xyz/MobileTerminal/CarPerformance';
				that.getData(url);
				
			  },
			})
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex: 1;
	background-color: #f4f4f4;
}
.flex-wrp{
  margin-bottom: 10px;
  flex-direction: column;
}
.flexItem{
  width: 33.3%;
  text-align: center;
  justify-content: center;
  color: #484848;
  border-bottom: 1px solid #dedede;
  padding: 10px 0;
  background-color: #fff;
}
.flexHover{
  border-bottom: 2px solid #04d5c4;
}
.section{
  border: 1px solid red;
  margin:5px 10px;
  padding: 5px 10px;
}
.section input{
  width:400upx;
  vertical-align:middle;
  line-height:2.3;
}
.section button{
  color:red;
  background-color:#fff;
  margin-top:-2px;
}
.flex-wrp::after{
  content: '';
  clear: both;
  display: block;
}
.table {  
  border: 0px solid darkgray;
  padding: 180upx 0 100upx;
  flex-direction: column;
  flex:1;
}
.tr {  
  justify-content: center;  
  height: 88upx;  
  align-items: center;
}
.td {    
  flex:1;  
  justify-content: center;    
  text-align: center;
  font-size: 26upx;
  color: #686868;
  line-height: 88upx;
}
.bg-w{  
  background: #fff;
}
.bg-g{  
  background: #E6F3F9;
}
.th {  
  flex:1;
  justify-content: center; 
  background: #fff;  
  color: #484848;   
  height: 88upx; 
  font-size: 28upx;
  line-height: 88upx; 
  align-items: center;
}
.scroll-view_H{
  white-space:nowrap;
}
.scroll-view-item_H {
  width:100%;
}
.left,.right{
  width:100%;
  text-align:center;
  font-size: 28upx;
}
.mingxi{
  background-color: #f5f5f5;
  flex-direction: column;
	flex:1;
}
.mingxi view{
  border-bottom: 1px solid #F1EFEF;
  padding: 5px 20px;
  text-align: left;
  border-left:2px solid #CCC;
  flex-direction: column;
}
.timeBox{
  width: 40%;
  font-size:28upx;
  line-height:50upx;
}
.confirm{
  border: 1px solid #04d5c4;
  color: #04d5c4;
  background-color: #fff;
  font-size:28upx;
  line-height:50upx;
}
.tiaojian{
  padding: 10upx 20upx;
  background-color: #fff;
}

.toolBar{
  position: fixed;
  bottom: 5px;
  left: 0;
  right: 0;
  font-size: 28upx;
  background-color: #fff;
  padding-left: 10upx;
  align-items: center;
}
.toolBar view,.toolBar view label,.toolBar view picker{
  text-align: center;
  align-items: center;
  height: 50upx;
  line-height: 50upx;
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
  font-size: 28upx;
  background-color:#04d5c4;
  color:#fff;
}
.zhezhao{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.3);
	z-index: 99;
}
.zhezhao view{
  width: 50px;
  height: 50px;
  margin: 200px auto;
  color: #fff;
  flex-direction: column;
}
.zhezhao view image{
  width: 50px;
  height: 50px;
}
.topfixed{
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:100;
  flex-direction: column;
}
.cf{
  clear:both;
}
.ft-l{
  font-size: 28upx;
  font-weight: 700;
}
.ft-r{
  font-size: 28upx;
  color:#04d5c4;
}
.nodata{
  position:absolute;
  top:150upx;
  bottom:0;
  width:100%;
  background-color: #fff;
  justify-content: center;
  padding-top:200upx;
}

.denglu{
  justify-content: center;
  margin-top: 100upx;
  
}

</style>
