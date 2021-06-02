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

<style lang="scss">
	@import "uview-ui/index.scss";
	// @import './common/animate.css';
	// @import './common/common.css';

	uni-page-body,
	html,
	body {
	  height: 100%;
	  background: #f5f5f5;
	}
</style>
