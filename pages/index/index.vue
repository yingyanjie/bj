<template>
	<view class="content">
		<u-navbar back-text="返回" title="剑未配妥，出门已是江湖"></u-navbar>
		233
		<image class="logo" src="/static/bigSB.jpeg"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="list">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '北京欢迎您'
			}
		},
		onLoad() {
			console.log(this.$u.config.v);

		},
		methods: {

		}
	}
</script>

<style>
	.list{
		width: 100%;
		height: 1200upx;
		background-color: #09BB07;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
