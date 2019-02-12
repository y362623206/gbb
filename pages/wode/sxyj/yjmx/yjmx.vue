<template>
	<view class="outbox">
		<view v-if="types == 'A'" class="table">
			<view>
			<view class="tr bg-w">
			  <view class="th">承保日期</view>    
			  <view class="th">投保人</view>
			  <view class="th">保险公司</view>
			  <view class="th">销售佣金</view>
			</view>
			</view>
		  <view v-for="(itemName,index) in listData" :key="index" @tap="info(index)">
			<view class="tr" :class="index % 2 == 0?'':'bg-w'">      
			  <view class="td">{{itemName.underwrite}}</view>      
			  <view class="td">{{itemName.insure}}</view>
			  <view class="td">{{itemName.company__insurancename}}</view>
			  <view class="td">{{itemName.market}} ></view>      
			</view>
			<view v-if="showData == index" class="mingxi">
				<view class='left'>业务员:{{itemName.salesman__admin_basics_operator_bas__jobnumber}}</view>
				<view class='left'>日期年:{{itemName.datey}}</view>
				<view class='left'>日期月:{{itemName.datem}}</view>
				<view class='left'>保险公司:{{itemName.company__insurancename}}</view>
				<view class='left'> 险种名称:{{itemName.insurance}}</view>
				<view class='left'>保单号:{{itemName.warranty}}</view>
				<view class='left'>缴费年限:{{itemName.limit}}</view>
				<view class='left'>缴费年期:{{itemName.period}}</view>
				<view class='left'>承保日期:{{itemName.underwrite}}</view>
				<view class='left'>投保人:{{itemName.insure}}</view>
				<view class='left'>被保险人:{{itemName.protege}}</view>
				<view class='left'>发放日期:{{itemName.grant}}</view>
				<view class='left'>销售佣金:{{itemName.market}}</view>
			  </view> 
		  </view>
		</view>

		<view v-else-if="types == 'B'" class="table">
			<view>
			<view class="tr bg-w">
			  <view class="th">承保日期</view>    
			  <view class="th">投保人</view>
			  <view class="th">保险公司</view>
			  <view class="th">销售佣金</view>
			</view>
			</view>
		  <view v-for="(itemName,index) in listData" :key="index" @tap="info(index)">
			<view class="tr" :class="index % 2 == 0?'':'bg-w'">      
			  <view class="td">{{itemName.underwrite}}</view>      
			  <view class="td">{{itemName.insure}}</view>
			  <view class="td">{{itemName.company__insurancename}}</view>
			  <view class="td">{{itemName.market}} ></view>      
			</view>
			<view v-if="showData == index" class="mingxi">
				<view class='left'>业务员:{{itemName.salesman__admin_basics_operator_bas__jobnumber}}</view>
				<view class='left'>日期年:{{itemName.datey}}</view>
				<view class='left'>日期月:{{itemName.datem}}</view>
				<view class='left'>保险公司:{{itemName.company__insurancename}}</view>
				<view class='left'> 险种名称:{{itemName.insurance}}</view>
				<view class='left'>保单号:{{itemName.warranty}}</view>
				<view class='left'>缴费年限:{{itemName.limit}}</view>
				<view class='left'>缴费年期:{{itemName.period}}</view>
				<view class='left'>承保日期:{{itemName.underwrite}}</view>
				<view class='left'>投保人:{{itemName.insure}}</view>
				<view class='left'>被保险人:{{itemName.protege}}</view>
				<view class='left'>发放日期:{{itemName.grant}}</view>
				<view class='left'>销售佣金:{{itemName.market}}</view>
			  </view> 
		  </view>
		</view>

		<view v-else-if="types == 'C'" class="table">
			<view>
			<view class="tr bg-w">
			  <view class="th-2">绩效名称</view>    
			  <view class="th-2">金额</view>
			</view>
			</view>
		  <view v-for="(itemName,index) in listData" :key="index" @tap="info(index)">
			<view class="tr" :class="index % 2 == 0?'':'bg-w'">      
			  <view class="td-2">{{itemName.datetype__datetype}}</view>      
			  <view class="td-2">{{itemName.scale}} ></view>    
			</view>
			<view v-if="showData == index" class="mingxi">
				<view class='left'>业务员:{{itemName.salesman__admin_basics_operator_bas__jobnumber}}</view>
				<view class='left'>日期年:{{itemName.datey}}</view>
				<view class='left'>日期月:{{itemName.datem}}</view>
				<view class='left'>绩效名称:{{itemName.datetype__datetype}}</view>
				<view class='left'>金额:{{itemName.scale}}</view>
			  </view> 
		  </view>
		</view>

		<view v-else-if="types == 'D'" class="table">
			<view>
			<view class="tr bg-w">
			  <view class="th-1">次级人员</view>    
			  <view class="th-1">金额</view>
			  <view class="th-1">奖金</view>
			</view>
			</view>
		  <view v-for="(itemName,index) in listData" :key="index" @tap="info(index)">
			<view class="tr" :class="index % 2 == 0?'':'bg-w'">      
			  <view class="td-1">{{itemName.secondary__admin_basics_operator_bas__jobnumber}}</view>      
			  <view class="td-1">{{itemName.total}}</view>
			  <view class="td-1">{{itemName.award}} ></view>    
			</view>
			<view v-if="showData == index" class="mingxi">
				<view class='left'>业务员:{{itemName.salesman__admin_basics_operator_bas__jobnumber}}</view>
				<view class='left'>日期年:{{itemName.datey}}</view>
				<view class='left'>日期月:{{itemName.datem}}</view>
				<view class='left'>次级人员:{{itemName.secondary__admin_basics_operator_bas__jobnumber}}</view>
				<view class='left'>金额:{{itemName.total}}</view>
				<view class='left'>奖金:{{itemName.award}}</view>
			  </view> 
		  </view>
		</view>

		<view v-else-if="types == 'E'" class="table">
			<view>
			<view class="tr bg-w">
			  <view class="th-2">业绩</view>    
			  <view class="th-2">奖金</view>
			</view>
			</view>
		  <view v-for="(itemName,index) in listData" :key="index" @tap="info(index)">
			<view class="tr" :class="index % 2 == 0?'':'bg-w'">      
			  <view class="td-2">{{itemName.performance}}</view>      
			  <view class="td-2">{{itemName.award}} ></view>    
			</view>
			<view v-if="showData == index" class="mingxi">
				<view class='left'>业务员:{{itemName.salesman__admin_basics_operator_bas__jobnumber}}</view>
				<view class='left'>日期年:{{itemName.datey}}</view>
				<view class='left'>日期月:{{itemName.datem}}</view>
				<view class='left'>业绩:{{itemName.performance}}</view>
				<view class='left'>奖金:{{itemName.award}}</view>
			  </view> 
		  </view>
		</view>

		<view v-if="types == 'F'" class="table">
			<view>
			<view class="tr bg-w">
			  <view class="th">承保日期</view>    
			  <view class="th">保险公司</view>
			  <view class="th">加佣比例</view>
			  <view class="th">加佣金额</view>
			</view>
			</view>
			<view v-for="(itemName,index) in listData" :key="index" @tap="info(index)">
			  <view  style="flex-direction: column;">
				<view class="tr" :class="index % 2 == 0?'':'bg-w'">      
				  <view class="td">{{itemName.underwrite}}</view>      
				  <view class="td">{{itemName.company__insurancename}}</view>
				  <view class="td">{{itemName.percentage}}</view>
				  <view class="td">{{itemName.commission}} ></view>       
				</view>
				<view v-if="showData == index" class="mingxi">
					<view class='left'>业务员:{{itemName.salesman__admin_basics_operator_bas__jobnumber}}</view>
					<view class='left'>日期年:{{itemName.datey}}</view>
					<view class='left'>日期月:{{itemName.datem}}</view>
					<view class='left'>保险公司:{{itemName.company__insurancename}}</view>
					<view class='left'> 险种名称:{{itemName.insurance}}</view>
					<view class='left'>保单号:{{itemName.warranty}}</view>
					<view class='left'>缴费年限:{{itemName.limit}}</view>
					<view class='left'>缴费年期:{{itemName.period}}</view>
					<view class='left'>承保日期:{{itemName.underwrite}}</view>
					<view class='left'>投保人:{{itemName.insure}}</view>
					<view class='left'>加佣比例:{{itemName.percentage}}</view>
					<view class='left'>加佣金额:{{itemName.commission}}</view>
					<view class='left'>被保险人:{{itemName.protege}}</view>
					<view class='left'>发放日期:{{itemName.grant}}</view>
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
				listData: [],
				showData:'m',
				types:'',
				clickItem:'m',
			};
		},
		methods:{
			info:function(e){
				if (this.clickItem == e) {
					this.clickItem='m';
					this.showData='m';
				}
				else{
				  var list = this.listData;
				  for (var i = 0; i < list.length; i++) {
					if (i == e) {
					  console.log(1);
					  this.showData=i;
					  this.clickItem=i;
					}
				  }
				}
			},
		},
		onLoad: function (options) {
			var year = options.year;
			var month = options.month;
			var Type = options.type;
			var that = this;
			uni.showLoading({
			  title: '加载中...',
			})
			uni.getStorage({
			  key: 'userid',
			  success: function (res) {
				console.log(res.data);
				var users = res.data;
				var param = {
				  UserId: users,
				  datey: year,
				  datem: month,
				  TyPe: Type
				};
				uni.request({
				  url: 'https://www.wanbaokj.xyz/MobileTerminal/WbAppSelLifeC_Sel', //仅为示例，并非真实的接口地址
				  data: param,
				  method: 'POST',
				  header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
            },
				  success: function (res) {
					uni.hideLoading();
					that.listData=res.data.msg;
					that.types=Type;					
				  }
				})


			  },
			})
		  },
	}
</script>

<style>
	.outbox{
		flex-direction: column;
		flex:1;
	}
	.table{
	  background-color: #f4f4f4;
	  flex-direction:column;
	}
	.table>view{
		flex-direction: column;
	}
	.tr {  
	  display: flex;   
	  justify-content: center;  
	  height: 88upx;  
	  align-items: center;
	  width: 750upx;
	}
	.td {    
	  width:25%;    
	  justify-content: center;    
	  text-align: center;
	  font-size: 26upx;
	  font-family: PingFang-Sc-Regular;
	  color: #686868;
	}
	.td-1 {    
	  width:250upx;  
	  font-family: PingFang-Sc-Regular;
	  color: #686868;  
	  justify-content: center;    
	  text-align: center;
	  font-size: 26upx;
	}
	.td-2 {    
	  width:50%;    
	  justify-content: center;    
	  text-align: center;
	  font-size: 26upx;
	  font-family: PingFang-Sc-Regular;
	  color:#686868;
	}

	.th {  
	  width: 25%;  
	  justify-content: center; 
	  color: #484848;  
	  display: flex;  
	  height: 88upx;  
	  align-items: center;
	  font-size: 28upx;
	  font-family: PingFang-Sc-Regular;
	  font-weight: 400;
	}
	.th-1 {  
	  width: 250upx;  
	  justify-content: center; 
	  color: #484848; 
	  font-size: 28upx; 
	  font-family: PingFang-Sc-Regular;
	  display: flex;  
	  height: 88upx;  
	  align-items: center;
	}
	.th-2 {  
	  width: 50%;  
	  justify-content: center; 
	  color: #484848;  
	  display: flex;  
	  height: 88upx;  
	  font-size:28upx;
	  align-items: center;
	}
	.bg-w{
		border-bottom: 1upx solid #dedede;
		background-color: #fff;
	}
	.mingxi{
		flex-direction: column;
	}
	.mingxi view{
	  border-bottom: 1px solid #f4f4f4;
	  padding: 5px 20px;
	  text-align: left;
	}
	.left{
	  width:100%;
	  display:inline-block;
	  text-align:center;
	  font-size: 26upx;
	}
</style>
