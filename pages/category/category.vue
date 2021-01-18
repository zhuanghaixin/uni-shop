<template>
	<view class="category">
		<SearchLink></SearchLink>
		<view class="content">
			<scroll-view :scroll-y="true" class="left">
				<view class="left-category" v-for="(item,index) in level1Categories" :key="index" @click="clickItem(index)" :class="{active:currentIndex===index}">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<scroll-view :scroll-into-view="toPosition" :scroll-top="scrollTop" :scroll-with-animation="ture" @scrolltoupper="upper"
			 @scrolltolower="lower" @scroll="scroll" :scroll-y="true" class="right">
				<image class="top-img" src="../../static/titleImage.png" mode=""></image>
				<view class="goods" v-for="(item,index) in level1Categories" :key="index" :id="'position'+index">
					<block v-for="(secondItem,secondIndex) in item.children" :key="secondIndex">
						<view class="title">
							<text>/</text>{{secondItem.cat_name}}<text>/</text>
						</view>
						<view class="items">
							<view @click="toSearch(thirdItem.cat_name)" class="item" v-for="(thirdItem,thirdIndex) in secondItem.children"
							 :key="thirdIndex">
								<image :lazy-load="true" mode="" :src="thirdItem.cat_icon"></image>
								<text>{{thirdItem.cat_name}}</text>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
			<view @tap="goTop" class="iconfont right-back-top">
				&#xe61c;
			</view>

		</view>
	</view>
</template>

<script>
	import {
		categories
	} from '../../api/category.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				scrollTop1: 0,
				old: {
					scrollTop: 0
				},
				old1: {
					scrollTop1: 0
				},
				currentIndex: 0,
				level1Categories: [], // 一级菜单
				level2Categories: [], // 二级菜单
				level3Categories: [], // 三级菜单
				toPosition: '',
				titleTopList: [], //每个节点的位置信息
			};
		},
		async onLoad() {
			const res = await categories()
			this.level1Categories = res
			this.getNodesInfo()
			// 	uni.request({
			// 			url: 'https://www.uinav.com/api/public/v1/categories'
			// 		})
			// 		.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
			// 			var [error, res] = data;
			// 			console.log('获取分类数据')
			// 			console.log(res.data);
			// 			// 一级菜单
			// 			this.level1Categories = res.data.message
			// 			// 二级菜单
			// 			// this.level2Categories = this.level1Categories.map(item => item.children).flat()
			// 			// 获取高度
			// 			this.getNodesInfo()
			// 		})
		},
		mounted() {
			// this.getNodesInfo()
		},
		methods: {
			upper(e) {
				// console.log('滚动到顶部/左边，会触发 scrolltoupper 事件')
				// console.log(e)
			},
			lower(e) {
				// console.log('	滚动到底部/右边，会触发 scrolltolower 事件')
				// console.log(e)
				setTimeout(() => {
					this.currentIndex = this.titleTopList.length - 1
				}, 100)
			},
			scroll(e) {
				// console.log('	滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}')
				// console.log(e)
				let scrollTop = e.target.scrollTop
				console.log('scrollTop......')
				console.log(scrollTop)
				for (let i = 0; i < this.titleTopList.length; i++) {
					let h1 = this.titleTopList[i]

					let h2 = this.titleTopList[i + 1]

					if (scrollTop + 60 >= h1 && scrollTop + 60 < h2) {
						this.currentIndex = i
						break
					}
				}
				this.old.scrollTop = e.detail.scrollTop
				console.log('当前距离')
				console.log(this.old.scrollTop)
			},
			goTop(e) {
				// console.log('回到顶部')
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// 点击左侧菜单改变右侧菜单的scroll-into-view属性
			clickItem(index) {
				this.currentIndex = index
				this.toPosition = "position" + index
			},
			// 获取所有右侧对应节点的到顶部到距离 放在一个数组中
			getNodesInfo() {
				const query = uni.createSelectorQuery().in(this)
				this.$nextTick(() => {
					query.selectAll('.goods').boundingClientRect().exec(
						(res) => {
							console.log('res...')
							console.log(res)
							let nodes = res[0]
							let titleTopList = []
							nodes.map(item => {
								titleTopList.push(item.top)
							})
							this.titleTopList = titleTopList
						}
					)
				})
			},
			toSearch(key) {
				console.log('key')
				console.log(key)
				uni.navigateTo({
					url: `/pages/searchList/searchList?key=${key}`
				})

			},
		}
	}
</script>

<style lang="less">
	.category {
		padding-top: 100rpx;

		.content {
			display: flex;
			position: relative;

			.left {
				flex: 0 0 198rpx;
				background-color: @color-bg;
				height: calc(100vh - 100rpx);

				&-category {
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					&.active {
						color: @color-primary;
						background-color: @color-white;
						font-size: 1.2em;
						transition: all 0.5s;
						position: relative;

						&::before {
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
							content: '';
							display: block;
							width: 10rpx;
							height: 80rpx;
							background-color: @color-primary;
						}
					}
				}
			}

			.right {
				height: calc(100vh - 100rpx);
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 20rpx 16rpx;

				.top-img {
					width: 100%;
					height: 180rpx;
				}

				.goods {
					.title {
						text-align: center;
						line-height: 110rpx;

						text {
							color: #dadada;
							margin: 0 30rpx;
						}
					}

					.items {
						display: flex;
						flex-wrap: wrap;

						.item {
							width: 33.33%;
							text-align: center;

							image {
								width: 120rpx;
								height: 120rpx;
							}

							text {
								display: block;
								font-size: 12px;
							}
						}
					}
				}
			}

			.right-back-top {
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
				font-size: 50rpx;
				color: @color-primary;
			}
		}
	}
</style>
