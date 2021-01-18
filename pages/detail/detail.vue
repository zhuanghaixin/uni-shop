<template>
	<view class="good">
		<SwiperGoods :swiperList="swiperList" @click="previewImage"></SwiperGoods>
		<!-- 商品信息区域 -->
		<view class="info">
			<view class="price">
				￥{{ good_detail.goods_price }}
			</view>
			<view class="word">
				<view class="left text-line2">
					{{ good_detail.goods_name }}
				</view>
				<view class="line">
				</view>
				<view class="right">
					<text class="iconfont icon-shoucang"></text>收藏
					<button open-type="share">分享</button>
				</view>
			</view>
			<view class="pass">
				快递：免运费
			</view>
		</view>
		<!-- 其它信息区域 -->
		<view class="other">
			<view class="item">
				<text>促销</text><text class="colorRed">满300减30元</text>
			</view>
			<view class="item">
				<text>已选</text><text class="colorGary">黑色/S/1件</text>
			</view>
		</view>
		<view class="other">
			<view class="item">
				<text>送至</text><text class="colorGary">广东省广州市海珠区</text>
			</view>
		</view>
		<!-- 图文介绍区域 -->
		<view class="tuwen">
			<view class="title">
				<view class="item" @click="changeIndex(0)" :class="{ active: currentIndex === 0 }">
					图文介绍
				</view>
				<view class="item" @click="changeIndex(1)" :class="{ active: currentIndex === 1 }">
					规格参数
				</view>
			</view>
			<view class="content">
				<view class="one" v-if="currentIndex === 0">
					<view v-html="good_detail.goods_introduce">
					</view>
				</view>
				<view class="two" v-else>
					<view class="row" v-for="(item, index) in good_detail.attrs" :key="index">
						<view class="col">
							{{ item.attr_name }}
						</view>
						<view class="col">
							{{ item.attr_value }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部区域 -->
		<view class="footer">
			<button open-type="contact">客户</button>
			<view class="kefu">
				<text class="iconfont icon-kefu"></text>
				联系客服
			</view>
			<view class="kefu" @click="goCart">
				<text class="iconfont icon-gouwuchekong"></text>
				购物车
			</view>
			<view @click="addToCart" class="addto" style="background-color: #ffb400;">
				加入购物车
			</view>
			<view class="addto" style="background-color: #ff2d4a;">
				立即购买
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				goods_id: '',
				good_detail: {},
				swiperList: [],
				cartList: []
			};
		},
		onLoad(options) {
			this.goods_id = options.goods_id
			// 获取商品详情数据
			uni.request({
				url: `https://www.uinav.com/api/public/v1/goods/detail?goods_id=${this.goods_id}`,
				method: 'get'
			}).then(res => {
				console.log('获取商品详情数据')
				console.log(res[1].data.message)
				this.good_detail = res[1].data.message
				// 设置顶部nabbar title
				uni.setNavigationBarTitle({
					title: this.good_detail.goods_name
				});
				// 获取轮播数据
				this.swiperList = this.good_detail.pics
				// 渲染数据
			})
		},
		onShow() {
			this.cartList = uni.getStorageSync('cart') || []
		},
		methods: {
			// 改变图文介绍的选中下标
			changeIndex(index) {
				this.currentIndex = index
			},
			//预览图片
			previewImage(index) {
				// 得到轮播图大图的集合
				let imgArr = this.swiperList.map(item => {
					return item.pics_big
				})
				// 调用预览方法
				uni.previewImage({
					current: index,
					urls: imgArr // 所有图片的链接
				})
			},
			// 跳转购物车页面
			goCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			// 添加到购物车
			addToCart() {
				const index=this.cartList.findIndex(item => {
					return item.goods_id == this.goods_id
				})
				// 如果有,已有的cartlist,的num+1,否则追加商品
				if (index !== -1) {
					this.cartList[index].num += 1
				} else {
					this.cartList.unshift({
						goods_id: this.goods_id,
						num: 1,
						status: false
					})
				}
				// 将数据保存到storage
				uni.setStorageSync(
					'cart', this.cartList
				)
				// 提示用户
				uni.showToast({
					title: '添加商品成功'
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f4f4f4;
	}

	.colorRed {
		color: #ff4f94;
	}

	.colorGary {
		color: #9a92a0;
	}

	.good {
		padding-bottom: 100rpx;

		.info {
			background-color: #fff;
			padding-left: 20rpx;

			.price {
				font-size: 20px;
				color: #eb4450;
				line-height: 120rpx;
			}

			.word {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					flex: 1;
					margin-right: 80rpx;
				}

				.line {
					width: 1px;
					height: 80rpx;
					background-color: #e7e7e7;
				}

				.right {
					width: 140rpx;
					display: flex;
					flex-direction: column;
					text-align: center;
					color: #a1a1a1;
					font-size: 14px;
				}
			}

			.pass {
				color: #a1a1a1;
				line-height: 100rpx;
			}
		}

		.other {
			margin-top: 20rpx;
			background-color: #fff;
			padding-left: 20rpx;

			.item {
				line-height: 100rpx;

				text:nth-child(1) {
					margin-right: 40rpx;
				}
			}
		}

		.tuwen {
			margin-top: 20rpx;
			padding: 0 20rpx;
			background-color: #fff;

			.title {
				display: flex;
				height: 100rpx;

				.item {
					flex: 1;
					text-align: center;
					line-height: 90rpx;

					&.active {
						border-bottom: 10rpx solid #ff2c49;
						color: #ff2c49;
					}
				}
			}

			.content {
				.two {
					margin-top: 6rpx;
					border-left: 4rpx solid #d1d1d1;
					border-top: 4rpx solid #d1d1d1;

					.row {
						display: flex;

						.col {
							flex: 1;
							border-right: 4rpx solid #d1d1d1;
							border-bottom: 4rpx solid #d1d1d1;
							padding: 30rpx 0;

							&:nth-child(1) {
								display: flex;
								align-items: center;
								justify-content: center;
							}

							&:nth-child(2) {
								padding: 30rpx 40rpx;
							}
						}
					}
				}
			}
		}

		.footer {
			background-color: #fff;
			display: flex;
			height: 82rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;

			.kefu {
				flex: 2;
				display: flex;
				flex-direction: column;
				text-align: center;
				font-size: 12px;

				text {
					font-size: 20px;
				}
			}

			.addto {
				flex: 3;
				color: #fff;
				text-align: center;
				line-height: 82rpx;
			}
		}

	}
</style>
