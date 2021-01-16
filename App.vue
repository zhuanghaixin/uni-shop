<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	// 为什么这里需要在lang="less"
	/*每个页面公共css */
	view,
	image {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	image {
		vertical-align: middle;
	}

	@import url('./static/css/iconfont.css');
	@import url("./uni.less");
	@import url("./style/variable.less");
</style>
