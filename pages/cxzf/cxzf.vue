<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:"",
			};
		},
		onLoad() {
			var link = uni.getStorageSync('zf_link');
			this.src = link;
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex: 1;
}
</style>
