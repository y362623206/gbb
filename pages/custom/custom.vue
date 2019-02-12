<template>
	<view class="outbox">
		<image style='width:750upx;height:300upx;' src='https://wanbaoscience.oss-cn-shanghai.aliyuncs.com/c24baa3b-0d14-429e-a395-93a456f16b94.png'></image>

		<view class='question'>
		  <label>猜您遇到了以下问题</label>

		  <view class="quesInfo" @tap='toogleAns(1)'>
			<view class='quesName'>未收到佣金</view>
			<view class='icon'><image :src="index==1?img1:img2" mode="scaleToFill"></image></view>
		  </view> 
		  <view :class="['answer', isFolded!=1?'hide':'show']">
			<text>一：首佣\n
	 ①交单当月承保\n
		②交单当月或者次月10号之前完成回执回销。\n
		③交单当月或者次月18号之前回访成功。\n
		三者同时满足则在交单次月28日发放佣金对账单，核对无误月底最后一天发放佣金，以上节点遇节假日顺延。
		注：若回执回访延后完成佣金将延后一月发放。\n
		二：续佣\n
		当月缴费成功次月发放续期佣金。\n
		举例：2017年3月2日生效保单，若在2018年3月3日缴费成功，续佣将在4月底发放；若在2018年4月3日缴费成功，续佣将在5月底发放。\n
		三：师徒奖\n
		当月承保保单，符合师徒奖发放条件的将在次月底发放，不受保险公司账单影响。</text>
		  </view>

		<view class='quesInfo' @tap='toogleAns(2)'>
			<view class='quesName'>怎么上号</view>
			<view class='icon'><image :src="index==2?img1:img2" mode="scaleToFill"></image></view>
		  </view> 
		  <view :class="['answer',isFolded!=2?'hide':'show']">
			<text>1.上号流程\n
		   代理人将上号所需资料交给对应的客户经理进行预上号，有谈好的保单后及时通知客户经理在对应保险公司上号，工号出来后客户经理会反馈至代理人处，即预登记，带单上号。
		   上号时间：工作日每天下午2点统一上号。\n
		2.上号所需资料\n
		①代理人身份证正反面拍照或复印件一份\n
		②银行卡拍照或复印件一份\n
		③代理人登记表填写一份\n
		④代理人合同签署一份\n
		⑤十不准签署一份\n
		3.上号要求：工银安盛、恒大人寿、长城人寿和瑞泰人寿要求代理人保监网备案登记在湖北保重。</text>
		  </view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFolded: '',
				index:'',
				img1:'../../static/images/customIcon/down.png',
				img2: '../../static/images/customIcon/up.png',
			};
		},
		methods:{
			toogleAns:function(e){
				console.log(e);
				var indexcode = e;
				if (this.isFolded != indexcode){
					this.isFolded=indexcode;
					this.index=indexcode;
				}else{
					this.isFolded="";
					this.index="";
				}
			}
		}
	}
</script>

<style>
	.outbox{
	  flex-direction: column;
	}
	.tabbtn{
	  height: 88upx;
	  border-bottom: 1upx solid #dedede;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-bottom: 20upx;
	  background-color: #fff;
	  margin-top: -10upx;
	}
	.tabcont{
	  width: 50%;
	  display: flex;
	  justify-content: flex-start;
	  align-items: center;
	  color: #484848;
	  font-family: PingFang-SC-Bold;
	  font-size: 28upx;
	  padding-left: 30upx;
	}
	.tabcont text{
	  height: 36upx;
	  line-height: 36upx;
	  margin-left: 20upx;
	}
	.question{
	  background-color: #fff;
	  flex-direction: column;
	}
	.question label{
	  height: 56upx;
	  line-height: 56upx;
	  color: #999999;
	  width: 100%;
	  padding-left: 30upx;
	  font-size: 26upx;
	  display: block;
	  border-bottom: 1upx solid #f4f4f4;
	}
	.quesInfo{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  width: 690upx;
	  padding-left: 30upx;
	  padding-right: 30upx;
	  border-bottom: 1upx solid #f4f4f4;
	}
	.quesInfo .icon{
	  width: 88upx;
	  height: 88upx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.quesInfo .icon image{
	  width:28upx;
	  height: 16upx;
	}
	.quesName{
	  color: #484848;
	  font-size: 28upx;
	  justify-content: space-between;
	  height: 88upx;
	  line-height: 88upx;
	}
	.answer{
	  padding: 10upx 100upx;
	}
	.answer text{
	  color: #686868;
	  font-family: PingFang-SC-Bold;
	  font-size: 26upx;
	  line-height: 2;
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
	.show{

	}
</style>
