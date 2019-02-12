<template>
	<view class="content">
		<view v-if="type == 0" style="flex-direction: column;">
		  <view class="section">
			被保人名称：{{list.insured}}
		  </view>
		  <view class="section">
			车牌号：{{list.license}}
		  </view>
		  <view class="section" style="margin-bottom:20upx;border-bottom: 1px solid #dedede;">
			车架号：{{list.car_standing_carmessage__frame==null?'':list.car_standing_carmessage__frame}}
		  </view>
		  <view class="section">
			登记时间：{{list.car_standing_matching__register}}
		  </view>
		  <view class="section">
			营业部名称：{{list.salesname__organizationname__organizationname}}
		  </view>
		  <view class="section">
			保险公司：{{list.channel__insurancename__insurancename}}
		  </view>
		  <view class="section">
			险种：{{list.category__mainmca}}
		  </view>
		  <view class="section">
			保费：{{list.premiums}}
		  </view>
		  <view class="section">
			车船税：{{list.vehicle}}
		  </view>
		  <view class="section">
			代理人：{{list.salesman__admin_basics_operator_bas__name}}
		  </view>
		  <view class="section">
			客户经理：{{list.conclude__admin_basics_operator_bas__name}}
		  </view>
		  <view class="section">
			起保日期：{{list.confirmed==null?'':list.confirmed}}
		  </view>
		  <view class="section">
			保险止期：{{list.deadline==null?'':list.deadline}}
		  </view>
		  <view class="section">
			到期天数：{{list.residue}}
		  </view>
		</view>
		<view v-if="type == 1" style="flex-direction: column;">
		  <view class="section">
			保单号：{{list.warranty}}
		  </view>
		  <view class="section">
			被保人姓名：{{list.recognizee}}
		  </view>
		  <view class="section" style="margin-bottom:20upx;border-bottom: 1px solid #dedede;">
			被保人身份证号：{{list.recognizeeun}}
		  </view>
		  <view class="section">
			签单日期：{{list.conclude}}
		  </view>
		  <view class="section">
			保险公司名称：{{list.insurancename__insurancename__insurancename}}
		  </view>
		  <view class="section">
			营业部名称：{{list.salesname__organizationname__organizationname}}
		  </view>
		  <view class="section">
			代理人姓名：{{list.agency__admin_basics_operator_bas__name}}
		  </view>
		  <view class="section">
			代理人姓工号：{{list.agency__admin_basics_operator_bas__jobnumber}}
		  </view>
		  <view class="section">
			主附险标记：{{list.insurance__mainmca__mainmca}}
		  </view>
		  <view class="section">
			险种名称：{{list.insurance__generatormc}}
		  </view>
		  <view class="section">
			保单类型：{{list.insurance__policy__policy}}
		  </view>
		  <view class="section">
			缴费年期：{{list.periodjf__period}}
		  </view>
		  <view class="section">
			保单年度：{{list.periodbd__period}}
		  </view>
		  <view class="section">
			保额：{{list.coverage}}
		  </view>
		  <view class="section">
			保费：{{list.presell}}
		  </view>
		  <view class="section">
			生效日期：{{list.efficient == null ? '' : list.efficient}}
		  </view>
		  <view class="section">
			投保人姓名：{{list.applicant}}
		  </view>
		  <view class="section">
			推荐人姓名：{{list.referrer__admin_basics_operator_bas__name == null ? '' : list.referrer__admin_basics_operator_bas__name}}
		  </view>
		  <view class="section">
			客户经理姓名：{{list.customer__admin_basics_operator_bas__name}}
		  </view>
		  <view class="section">
			操作员姓名：{{list.operator__admin_basics_operator_bas__name}}
		  </view>
		  <view class="section">
			到期天数：{{list.residue}}
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:'',
        type:''
			};
		},
		onLoad(options) {
			console.log(options.data);
			console.log(options.type);
			var data = JSON.parse(options.data);
			this.list = data;
			this.type = options.type;
		}
	}
</script>

<style>
.content{
	background-color:#F3F3F3;
	flex-direction: column;
	flex: 1;
}
.section{
  background-color: #fff;
  border-bottom: 1upx solid #f4f4f4;
  height: 88upx;
  line-height: 88upx;
  align-items: center;
  font-size: 28upx;
  padding-left: 60upx;
  padding-right: 48upx;
}
</style>
