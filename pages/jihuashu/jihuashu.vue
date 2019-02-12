<template>
	<view class="container">
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
		onLoad(options) {
			console.log(options.link);
			this.src = options.link;
		}
	}
</script>

<style>
.container{
	flex-direction: column;
	flex: 1;
}

</style>
