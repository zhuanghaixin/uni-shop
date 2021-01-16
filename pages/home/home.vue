<template>
	<view class="home">
		<!-- 搜索框 -->
		<SearchLink />
		<!-- 轮播图 -->
		<SwiperBanner :swiperList="swiperList" @click="goGoodDetail"></SwiperBanner>
		<!--  分类-->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navList" :key="index">
				<image class="nav_item_img" :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floors">
			<view class="floor" v-for="(item,index) in floorLists" :key="index">
				<view class="title">
					<image class="title_img" mode="aspectFit" :src="item.floor_title.image_src"></image>
				</view>
				<view class="goods">
					<view class="good" v-for="(product,i) in item.product_list" :key="i">
						<image class="good_img" :src="product.image_src"></image>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>
<script>
	import {
		homeSwiper,
		homeCatItems,
		homeFloorData
	} from '../../api/home.js'
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorLists: []
			};
		},
		onLoad() {
			Promise.all([homeSwiper(), homeCatItems(), homeFloorData()]).then(res => {
					this.swiperList=res[0]
					this.navList=res[1]
					this.floorLists=res[2]
			})
		},
		// 	uni.request({
		// 			url: 'https://www.uinav.com/api/public/v1/home/swiperdata'
		// 		})
		// 		.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
		// 			var [error, res] = data;
		// 			console.log('轮播图数据')
		// 			console.log(res.data);
		// 			this.swiperList=res.data.message
		// 		})
		// 	uni.request({
		// 			url: 'https://www.uinav.com/api/public/v1/home/catitems'
		// 		})
		// 		.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
		// 			var [error, res] = data;
		// 			console.log('导航数据')
		// 			console.log(res.data);
		// 			this.navList=res.data.message
		// 		})
		// 	uni.request({
		// 			url: 'https://www.uinav.com/api/public/v1/home/floordata'
		// 		})
		// 		.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
		// 			var [error, res] = data;
		// 			console.log('楼层数据')
		// 			console.log(res.data);
		// 			this.floorLists=res.data.message
		// 		})
		// },
		methods: {
			goGoodDetail(params) {
				uni.navigateTo({
					url: `/pages/detail/detail?goods_id=${params.goods_id}`,

				})
			}
		}
	}
</script>
<style lang="less">
	.home {
		padding-top: 100rpx;
		background-color: @color-bg;

		.nav {
			display: flex;
			height: 194rpx;
			align-items: center;
			padding: 0 20rpx;
			justify-content: space-between;
			background-color: @color-white;

			&_item {
				width: 140rpx;
				height: 128rpx;

				&_img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.floors {
			.floor {
				.title {
					height: 88rpx;
					display: flex;
					align-items: center;

					&_img {
						height: 88rpx;
					}
				}
			}
		}

		.goods {
			background-color: @color-white;
			padding: 20rpx 17rpx;
			display: grid;
			grid-gap: 10rpx;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 1fr 1fr;
			height: 480rpx;

			.good {
				&_img {

					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
