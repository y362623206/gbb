<template>
	<view class="container">
		<view class="section">
			<view>交强险</view>
			<view><switch checked @change="switch1Change" /></view>
		</view>
		<view v-show="isjq" class="section">
			<view>交强起期</view>
			<view class="xsz">
				<picker class="picker-item" mode="date" start="1970-01-01" end="2099-12-31" @change="jqrq">
					<view>{{jqdate}}</view>
				</picker>
			</view>
		</view>
		<view class="section">
			<view>商业险</view>
			<view><switch checked @change="switch2Change" /></view>
		</view>
		<view v-show="issy" class="section" style="border:0">
			<view>商业起期</view>
			<view class="xsz">
				<picker class="picker-item" mode="date" start="1970-01-01" end="2099-12-31" @change="syrq">
					<view>{{sydate}}</view>
				</picker>
			</view>
		</view>
	
		<view v-show="issy" class="title">
			险种选择
		</view>
		<view v-show="issy" class="table">
			<view class="tr bg-w">
				<view class="th">险种</view>    
				<view class="th">保额</view>
				<view class="th">不计免赔</view>     
			</view>
			<view>      
				<view class="td">机动车损失险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList1" @change="textChange1">
						<view>{{textList1[textValue1]}}</view>
					</picker>
				</view>
				<view class="td">
					<checkbox-group @change="checkboxChange1">
						<checkbox value="Y" :disabled="disabled1" :checked="checked1"/>
					</checkbox-group>
				</view>         
			</view>
			<view>      
				<view class="td">第三者责任险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList2" range-key="text" @change="textChange2">
						<view>{{textList2[textValue2].text}}</view>
					</picker>
				</view>
				<view class="td">
					<checkbox-group @change="checkboxChange2">
						<checkbox value="Y" :disabled="disabled2" :checked="checked2"/>
					</checkbox-group>
				</view>         
			</view> 
			<view>      
				<view class="td">司机责任险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList3" range-key="text" @change="textChange3">
						<view>{{textList3[textValue3].text}}</view>
					</picker>
				</view>
				<view class="td">
					<checkbox-group @change="checkboxChange3">
						<checkbox value="Y" :disabled="disabled3" :checked="checked3"/>
					</checkbox-group>
				</view>            
			</view> 
			<view>      
				<view class="td">乘客责任险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList4" range-key="text" @change="textChange4">
						<view>{{textList4[textValue4].text}}</view>
					</picker>
				</view>
				<view class="td">
					<checkbox-group @change="checkboxChange4">
						<checkbox value="Y" :disabled="disabled4" :checked="checked4"/>
					</checkbox-group>
				</view>           
			</view> 
			<view>      
				<view class="td">全车盗抢险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList5" @change="textChange5">
						<view>{{textList5[textValue5]}}</view>
					</picker>
				</view>
				<view class="td">
					<checkbox-group @change="checkboxChange5">
						<checkbox value="Y" :disabled="disabled5" :checked="checked5"/>
					</checkbox-group>
				</view>         
			</view> 
			<view>      
				<view class="td">玻璃破碎险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList6" range-key="text" @change="textChange6">
						<view>{{textList6[textValue6].text}}</view>
					</picker>
				</view>
				<view class="td">
				</view>            
			</view> 
			<view>      
				<view class="td">自燃损失险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList7" @change="textChange7">
						<view>{{textList7[textValue7]}}</view>
					</picker>
				</view>
				<view class="td">
					<checkbox-group @change="checkboxChange7">
						<checkbox value="Y" :disabled="disabled7" :checked="checked7"/>
					</checkbox-group>
				</view>          
			</view> 
			<view>      
				<view class="td">车身划痕险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList8" @change="textChange8">
						<view>{{textList8[textValue8]}}</view>
					</picker>
				</view>
				<view class="td">
					<checkbox-group @change="checkboxChange8">
						<checkbox value="Y" :disabled="disabled8" :checked="checked8"/>
					</checkbox-group>
				</view>           
			</view>
			<view>      
				<view class="td">发动机涉水险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList9" @change="textChange9">
						<view>{{textList9[textValue9]}}</view>
					</picker>
				</view>
				<view class="td">
					<checkbox-group @change="checkboxChange9">
						<checkbox value="Y" :disabled="disabled9" :checked="checked9"/>
					</checkbox-group>
				</view>         
			</view>
			<view>      
				<view class="td">无法找到第三方险</view>      
				<view class="td">
					<picker class="picker-item" mode="selector" :range="textList" @change="textChange">
						<view>{{textList[textValue]}}</view>
					</picker>
				</view>
				<view class="td">
				</view>          
			</view>			  
		</view>
		<view class="footer" @tap="baojia">
			报价
		</view>
		<view class="mask" v-show="showMask" @click="hide"></view>
		<view class="popup popup-middle" v-show="showState">
			<view class="zbxx">
				<view v-if="jqzb" class="zb-item">
					<view>交强转保：</view>
					<view class="zb-input"><input @input="qusJQ" :value="AnswerJQ"/></view>
					<view><image style="width: 180upx; height: 60upx;" :src="jqsrc" ></image></view>
				</view>
				<view v-if="syzb" class="zb-item">
					<view>商业转保：</view>
					<view class="zb-input"><input @input="qusSY" :value="AnswerSY"/></view>
					<view><image style="width: 180upx; height: 60upx;" :src="sysrc" ></image></view>
				</view>
				<view class="confirm">
					<view class="zb-btn" @tap="zb_bj">确定</view>
				</view>				
			</view>
		</view>
	</view>
</template>

<script>
	var tools = require("../../components/common.js");
	var chewei = parseInt(uni.getStorageSync('cx_chewei'))-1;
	var syparma = [{
					KindCode:'01',
					KindName:'机动车损失险',
					Amount:'0'
				},{
					KindCode:'02',
					KindName:'第三者责任险',
					Amount:'1000000',
				},{
					KindCode:'041',
					KindName:'司机责任险',
					Amount:'10000',
					UnitAmount:'10000',
					Quantity:1,
				},{
					KindCode:'044',
					KindName:'乘客责任险',
					Amount:chewei*10000,
					UnitAmount:'10000',
					Quantity:chewei,
				},{
					KindCode:'601',
					KindName:'车损失不计免赔',
					Amount:'0',
				},{
					KindCode:'602',
					KindName:'商三不计免赔',
					Amount:'0',
				},{
					KindCode:'6041',
					KindName:'车上人员不计免赔（司机）',
					Amount:'0',
				},{
					KindCode:'6044',
					KindName:'车上人员不计免赔（乘客）',
					Amount:'0',
				}];
	export default {
		data() {
			return {
				isjq:true,
				issy:true,
				showMask: false,
				showState: false,
				jqzb: false,
				syzb: false,
				jqsrc:'',
				sysrc:'',
				jqzbno:'',
				syzbno:'',
				AnswerJQ:'',
				AnswerSY:'',
				textList1: [
					'投保',
					'不投保'
				],
				textValue1: 0,
				textList2: [
					{text:'不投保',value:''},
					{text:'5万',value:'50000'},
					{text:'10万',value:'100000'},
					{text:'15万',value:'150000'},
					{text:'20万',value:'200000'},
					{text:'30万',value:'300000'},
					{text:'50万',value:'500000'},
					{text:'100万',value:'1000000'},
					{text:'150万',value:'1500000'},
					{text:'200万',value:'2000000'},
				],
				textValue2: 7,
				textList3: [
					{text:'不投保',value:''},
					{text:'1万/座',value:'10000'},
					{text:'2万/座',value:'20000'},
					{text:'3万/座',value:'40000'},
					{text:'4万/座',value:'40000'},
					{text:'5万/座',value:'50000'},
					{text:'10万/座',value:'100000'}
				],
				textValue3: 1,
				textList4: [
					{text:'不投保',value:''},
					{text:'1万/座',value:'10000'},
					{text:'2万/座',value:'20000'},
					{text:'3万/座',value:'40000'},
					{text:'4万/座',value:'40000'},
					{text:'5万/座',value:'50000'},
					{text:'10万/座',value:'100000'}
				],
				textValue4: 1,
				textList5: [
					'投保',
					'不投保'
				],
				textValue5: 1,
				textList6: [
					{text:'不投保',value:''},
					{text:'国产玻璃',value:'1'},
					{text:'进口玻璃',value:'2'},
				],
				textValue6: 0,
				textList7: [
					'投保',
					'不投保'
				],
				textValue7: 1,
				textList8: [
					'不投保',
					'2000',
					'5000',
					'10000',
				],
				textValue8: 0,
				textList9: [
					'投保',
					'不投保'
				],
				textValue9: 1,
				textList: [
					'投保',
					'不投保'
				],
				textValue: 1,
				disabled1:false,
				disabled2:false,
				disabled3:false,
				disabled4:false,
				disabled5:true,
				disabled7:true,
				disabled8:true,
				disabled9:true,
				checked1:true,
				checked2:true,
				checked3:true,
				checked4:true,
				checked5:false,
				checked7:false,
				checked8:false,
				checked9:false,
				jqdate:tools.setinput(1),
				sydate:tools.setinput(1),
			};
		},
		onShow() {
			syparma = [{
				KindCode:'01',
				KindName:'机动车损失险',
				Amount:'0'
			},{
				KindCode:'02',
				KindName:'第三者责任险',
				Amount:'1000000',
			},{
				KindCode:'041',
				KindName:'司机责任险',
				Amount:'10000',
				UnitAmount:'10000',
				Quantity:1,
			},{
				KindCode:'044',
				KindName:'乘客责任险',
				Amount:chewei*10000,
				UnitAmount:'10000',
				Quantity:chewei,
			},{
				KindCode:'601',
				KindName:'车损失不计免赔',
				Amount:'0',
			},{
				KindCode:'602',
				KindName:'商三不计免赔',
				Amount:'0',
			},{
				KindCode:'6041',
				KindName:'车上人员不计免赔（司机）',
				Amount:'0',
			},{
				KindCode:'6044',
				KindName:'车上人员不计免赔（乘客）',
				Amount:'0',
			}];
			this.textValue1 = 0;
			this.textValue2 = 7;
			this.textValue3 = 1;
			this.textValue4 = 1;
			this.textValue5 = 1;
			this.textValue6 = 0;
			this.textValue7 = 1;
			this.textValue8 = 0;
			this.textValue9 = 1;
			this.textValue = 1;
			this.disabled1 = false;
			this.disabled2 = false;
			this.disabled3 = false;
			this.disabled4 = false;
			this.disabled5 = true;
			this.disabled7 = true;
			this.disabled8 = true;
			this.disabled9 = true;
		},
		methods:{
			jqrq(e) {
				this.jqdate = e.detail.value;
			},
			syrq(e) {
				this.sydate = e.detail.value;
			},
			qusJQ(e) {
				this.AnswerJQ = e.detail.value;
			},
			qusSY(e) {
				this.AnswerSY = e.detail.value;
			},
			hide() {
				this.showMask = false;
				this.showState = false;
			},
			textChange1(evt) {
				this.textValue1 = evt.detail.value;
				if(evt.detail.value == 0){
					var json = {
						KindCode:'01',
						KindName:'机动车损失险',
						Amount:'0',
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '01'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
					this.disabled1 = false;
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '01'){
							syparma.splice(i,1);
						}
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '601'){
							syparma.splice(i,1);
						}
					}
					this.disabled1 = true;
					this.checked1 = null;
				}
				console.log(syparma);
			},
			textChange2(evt) {
				this.textValue2 = evt.detail.value;
				if(evt.detail.value == 0){
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '02'){
							syparma.splice(i,1);
						}
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '602'){
							syparma.splice(i,1);
						}
					}
					this.disabled2 = true;
					this.checked2 = null;
				}
				else{
					var json = {
						KindCode:'02',
						KindName:'第三者责任险',
						Amount:this.textList2[this.textValue2].value,
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '02'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
					this.disabled2 = false;
				}
			},
			textChange3(evt) {
				this.textValue3 = evt.detail.value;
				if(evt.detail.value == 0){
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '041'){
							syparma.splice(i,1);
						}
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '6041'){
							syparma.splice(i,1);
						}
					}
					this.disabled3 = true;
					this.checked3 = null;
				}
				else{
					var json = {
						KindCode:'041',
						KindName:'司机责任险',
						Amount:this.textList3[this.textValue3].value,
						UnitAmount:this.textList3[this.textValue3].value,
						Quantity:1,
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '041'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
					this.disabled3 = false;
				}
			},
			textChange4(evt) {
				this.textValue4 = evt.detail.value;
				if(evt.detail.value == 0){
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '044'){
							syparma.splice(i,1);
						}
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '6044'){
							syparma.splice(i,1);
						}
					}
					this.disabled4 = true;
					this.checked4 = null;
				}
				else{
					var json = {
						KindCode:'044',
						KindName:'乘客责任险',
						Amount:(this.textList4[this.textValue4].value)*chewei,
						UnitAmount:this.textList4[this.textValue4].value,
						Quantity:chewei,
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '044'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
					this.disabled4 = false;
				}
			},
			textChange5(evt) {
				this.textValue5 = evt.detail.value;
				if(evt.detail.value == 0){
					var json = {
						KindCode:'03',
						KindName:'全车盗抢险',
						Amount:'0',
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '03'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
					this.disabled5 = false;
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '03'){
							syparma.splice(i,1);
						}
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '603'){
							syparma.splice(i,1);
						}
					}
					this.disabled5 = true;
					this.checked5 = null;
				}
			},
			textChange6(evt) {
				this.textValue6 = evt.detail.value;
				if(evt.detail.value == 0){
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '11'){
							syparma.splice(i,1);
						}
					}
				}
				else{
					var json = {
						KindCode:'11',
						KindName:'玻璃破碎险',
						Amount:'0',
						ModeCode:this.textList6[this.textValue6].value,
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '11'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
				}
			},
			textChange7(evt) {
				this.textValue7 = evt.detail.value;
				if(evt.detail.value == 0){
					var json = {
						KindCode:'13',
						KindName:'自燃损失险',
						Amount:'0',
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '13'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
					this.disabled7 = false;
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '13'){
							syparma.splice(i,1);
						}
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '131'){
							syparma.splice(i,1);
						}
					}
					this.disabled7 = true;
					this.checked7 = null;
				}
			},
			textChange8(evt) {
				this.textValue8 = evt.detail.value;
				if(evt.detail.value == 0){
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '21'){
							syparma.splice(i,1);
						}
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '211'){
							syparma.splice(i,1);
						}
					}
					this.disabled8 = true;
					this.checked8 = null;
				}
				else{
					var json = {
						KindCode:'21',
						KindName:'车身划痕险',
						Amount:this.textList8[this.textValue8],
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '21'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
					this.disabled8 = false;
				}
			},
			textChange9(evt) {
				this.textValue9 = evt.detail.value;
				if(evt.detail.value == 0){
					var json = {
						KindCode:'23',
						KindName:'发动机涉水险',
						Amount:'0',
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '23'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
					this.disabled9 = false;
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '23'){
							syparma.splice(i,1);
						}
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '231'){
							syparma.splice(i,1);
						}
					}
					this.disabled9 = true;
					this.checked9 = null;
				}
			},
			textChange(evt) {
				this.textValue = evt.detail.value;
				if(evt.detail.value == 0){
					var json = {
						KindCode:'30',
						KindName:'无法找到第三方险',
						Amount:'0',
					}
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '30'){
							syparma.splice(i,1);
						}
					}
					syparma.push(json);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '30'){
							syparma.splice(i,1);
						}
					}
				}
			},
			switch1Change(e) {
				console.log('switch1 发生 change 事件，携带值为' + e.detail.value)
				if(e.detail.value){
					this.isjq = true;
				}
				else{
					this.isjq = false;
				}
			},
			switch2Change(e) {
				console.log('switch2 发生 change 事件，携带值为' + e.detail.value)
				if(e.detail.value){
					this.issy = true;
				}
				else{
					this.issy = false;
				}
			},
			checkboxChange1: function (e) {
				if(e.detail.value == 'Y'){
					var json = {
						KindCode:'601',
						KindName:'车损失不计免赔',
						Amount:'0',
					}
					syparma.push(json);
					console.log(syparma);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '601'){
							syparma.splice(i,1);
						}
					}
					console.log(syparma);
				}
			},
			checkboxChange2: function (e) {
				if(e.detail.value == 'Y'){
					var json = {
						KindCode:'602',
						KindName:'商三不计免赔',
						Amount:'0',
					}
					syparma.push(json);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '602'){
							syparma.splice(i,1);
						}
					}
				}
			},
			checkboxChange3: function (e) {
				if(e.detail.value == 'Y'){
					var json = {
						KindCode:'6041',
						KindName:'车上人员不计免赔（司机）',
						Amount:'0',
					}
					syparma.push(json);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '6041'){
							syparma.splice(i,1);
						}
					}
				}
			},
			checkboxChange4: function (e) {
				if(e.detail.value == 'Y'){
					var json = {
						KindCode:'6044',
						KindName:'车上人员不计免赔（乘客）',
						Amount:'0',
					}
					syparma.push(json);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '6044'){
							syparma.splice(i,1);
						}
					}
				}
			},
			checkboxChange5: function (e) {
				if(e.detail.value == 'Y'){
					var json = {
						KindCode:'603',
						KindName:'盗抢不计免赔',
						Amount:'0',
					}
					syparma.push(json);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '603'){
							syparma.splice(i,1);
						}
					}
				}
			},

			checkboxChange7: function (e) {
				if(e.detail.value == 'Y'){
					var json = {
						KindCode:'131',
						KindName:'自燃损失险不计免赔',
						Amount:'0',
					}
					syparma.push(json);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '131'){
							syparma.splice(i,1);
						}
					}
				}
			},
			checkboxChange8: function (e) {
				if(e.detail.value == 'Y'){
					var json = {
						KindCode:'211',
						KindName:'车身划痕损失险不计免赔',
						Amount:'0',
					}
					syparma.push(json);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '211'){
							syparma.splice(i,1);
						}
					}
				}
			},
			checkboxChange9: function (e) {
				if(e.detail.value == 'Y'){
					var json = {
						KindCode:'231',
						KindName:'发动机涉水损失险不计免赔',
						Amount:'0',
					}
					syparma.push(json);
				}
				else{
					for(let i=0;i<syparma.length;i++){
						if(syparma[i].KindCode == '231'){
							syparma.splice(i,1);
						}
					}
				}
			},
			baojia(){
				var that = this;
				var cz = uni.getStorageSync('czxx_key');
				var cx = uni.getStorageSync('cx_key');
				cz = JSON.parse(cz);
				cx = JSON.parse(cx);
				var jsondata = Object.assign(cx, cz);
				if(that.issy  == false && that.isjq == false){
					uni.showModal({
						title: '提示',
					    content: '请选择交强险或商业险！',
						showCancel:false
					})
					return false;
				}
				if(that.issy){
					jsondata.SYcoverage = JSON.stringify(syparma);
					jsondata.validDateSY = that.sydate;
				}
				if(that.isjq){
					jsondata.validDateJQ = that.jqdate;
				}
				jsondata.seedJQ = that.isjq;
				jsondata.seedSY = that.issy;
				jsondata.AnswerJQ = that.AnswerJQ;
				jsondata.AnswerSY = that.AnswerSY;
				jsondata.QueryJQ = that.jqzbno;
				jsondata.QuerySY = that.syzbno;
				console.log(jsondata);
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'https://www.wanbaokj.xyz/MobileTerminal/VehiclesOffer',
					method: 'POST',
					data:jsondata,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"device-code": "c0c9ec72-f3b3-11e8-9c8f-0235d2b38928",
					},
					success: function (res) {
						uni.hideLoading();
						var result = res.data.msg;
						if(res.data.type == 0){
							uni.showModal({
								title: '提示',
							    content: result,
								showCancel:false
							})
						}
						else{
							if(result['交强转保'] == undefined && result['商业转保'] == undefined){
								var obj = JSON.stringify(result);
								uni.redirectTo({
									url:'../cxhb/cxhb?obj='+obj
								})
// 								uni.navigateTo({
// 									url:'../cxhb/cxhb?obj='+obj
// 								})
							}
							else{
								if(result['交强转保'] != undefined && result['商业转保'] == undefined){
									that.showMask = true;
									that.showState = true;
									that.jqzb = true;
									that.jqsrc = "data:image/gif;base64," + result['交强转保'].question;
									that.jqzbno = result['交强转保'].demandNo; 
								}
								else if(result['交强转保'] == undefined &&result['商业转保'] != undefined){
									that.showMask = true;
									that.showState = true;
									that.syzb = true;
									that.sysrc = "data:image/gif;base64," + result['商业转保'].question;
									that.syzbno = result['商业转保'].demandNo;
								}
								else{
									that.showMask = true;
									that.showState = true;
									that.jqzb = true;
									that.jqsrc = "data:image/gif;base64," + result['交强转保'].question;
									that.jqzbno = result['交强转保'].demandNo; 
									that.syzb = true;
									that.sysrc = "data:image/gif;base64," + result['商业转保'].question;
									that.syzbno = result['商业转保'].demandNo;
								}
							}
							

						}

					},
					fail:function(res){
						uni.hideLoading();
						uni.showModal({
							title: '提示',
						    content: JSON.stringify(res),
							showCancel:false
						})
					}
				})
			},
			zb_bj(){
				this.baojia();
				this.showMask = false;
				this.showState = false;
				this.jqzb = false;
				this.jqsrc = '';
				this.jqzbno = ''; 
				this.syzb = false;
				this.sysrc = '';
				this.syzbno = '';
				this.AnswerJQ = '';
				this.AnswerSY = '';
			}
		}
	}
</script>

<style>

.container{
	flex-direction: column;
	flex: 1;
}
.title{
	color:#999;
	font-size: 28upx;
  align-items: center;
	padding-left: 20upx;
	height:78upx;
	background: linear-gradient(#dbfaf7, #e7fcfa);
	border-bottom: 1px solid #fff;
}
.section{
   justify-content: space-between;
   border-bottom: 1px solid #fafafa;
   padding: 20upx;
	 align-items: center;
   font-size: 28upx;
   background: #fff;
	 color:#333;
}
.xsz{
	text-align: right;
}
.table {  
  flex-direction: column;
  flex:1;
	margin-bottom: 100upx;
}
.tr {  
  justify-content: center;  
  height: 94upx;  
  align-items: center;
}
.th {  
  flex:1;
  justify-content: center; 
  color: #484848;   
  height: 94upx; 
  font-size: 34upx;
  align-items: center;
  font-weight:700;
}
.td {    
  flex:1;  
  justify-content: center;    
  text-align: center;
  font-size: 28upx;
  color: #686868;
  line-height: 94upx;
}
.bg-w{
	background: linear-gradient(#e7fcfa,#fff);
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
}
.mask {
	position: fixed;
	z-index: 998;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, .3);
}

.popup {
	position: fixed;
	z-index: 999;
	background-color: #ffffff;
	-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
}

.popup-middle {
	width: 600upx;
	height: 300upx;
	border-radius: 10upx;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
.zbxx{
	flex:1;
	flex-direction: column;
	margin: 30upx;
	font-size: 28upx;
}
.zb-item{
	margin-bottom: 20upx;
	align-items: center;
}
.confirm{
  margin-bottom: 20upx;
  justify-content: center;
}

.zb-btn{
	background: #04D5C4;
	color:#fff;
	border-radius: 10upx;
	padding: 20upx 50upx;
}
.zb-input{
	border: 1px solid #ddd;
	margin: 0 20upx;
	flex:2
}

</style>
