<template>
    <view class="container">
        <view class="page-body">
            {{title}}
            <view class="page-section page-section-gap">
                <view class="progress-box">
                    <progress :percent="percent" show-info stroke-width="30" />
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                title: '正在下载中,请稍候！',
                percent: 0
            }
        },
        onLoad: function (option) {
            if (option.url) {
                this.up_app(option.url);
            } else {
                uni.navigateBack({
                    delta: 1,
                });
                return;
            }

        },
        onHide: function () {

        },
        onShow: function () {

        },
        methods: {
            up_app: function (url) {
                plus.screen.lockOrientation('portrait-primary'); //锁定
                this.download(url)
            },
            download: function (url) {
                console.log(url)
                var that = this;
                const downloadTask = uni.downloadFile({
                    url: url, 
                    success: function (res) {
                        if (res.statusCode === 200) {
                            console.log(JSON.stringify(res))
                            console.log('下载成功');
                            var tempFilePaths = res.tempFilePath;
                            that.install(tempFilePaths);
                            return;
                        }
                    }
                });

                downloadTask.onProgressUpdate(function (res) {
                    that.percent = res.progress;
                    //console.log('下载进度' + res.progress);
                    //console.log('已经下载的数据长度' + res.totalBytesWritten);
                    //console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
                });
            },
            install: function (path) {//安装
                console.log(path)
                plus.runtime.install(path, {
                    force: true
                }, function () {
                    //uni.hideNavigationBarLoading();
                    console.log("加载完成！");
                    uni.navigateBack({
                        delta: 1,
                    });
                }, function (e) {

                    console.log(JSON.stringify(e));

                });
            }

        }
    }
</script>

<style>
	.container{
		flex-direction: column;
		flex:1;
	}
	.container view{
		display: block;
	}
    progress {
        width: 100%;
    }

    .progress-box {
        display: flex;
        height: 50px;
        margin-bottom: 60px;
    }

    .progress-cancel {
        margin-left: 40px;
    }
</style>
