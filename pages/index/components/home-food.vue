<template>
	<div class="food">
		<div class="top">
			<div class="top-left">
				<div class="res-title">热门美食</div>
				<div class="res-desc">今天最好的食物已就绪</div>
			</div>
			<div class="top-right">
				<span>查看详情</span>
				<cl-icon name="arrow-right"></cl-icon>
			</div>
		</div>
		<div class="content">
			<div v-for="(item, index) in urls" :key="index">
				<div class="content-card">
					<div class="content-card_img">
						<img :src="item.url" alt="" />
					</div>
					<div class="content-card_desc">
						<div class="desc_top">
							<div class="top_name">
								{{ item.title }}
							</div>
							<div class="top_price">
								<span>A$</span>
								<span>100</span>
							</div>
						</div>
						<div class="bottom">
							<div>
								<div class="desc_sub">
									{{ item.desc }}
								</div>
								<div class="desc_rate">
									<cl-rate
										v-model="item.rate"
										:size="32"
										disabled
										color="#ffac48"
										icon="cl-icon-like-fill"
									></cl-rate>
									<span>{{ Math.floor(item.rate).toFixed(1) }}分</span>
								</div>
							</div>
							<div>
								<cl-button :width="160" :borderRadius="20" type="success">
									预定
								</cl-button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	setup() {
		const urls = ref([
			{
				url: "/static/wall.jpg",
				title: "沙拉",
				desc: "安布罗西亚酒店&餐厅",
				rate: 5,
			},
			{
				url: "/static/wall.jpg",
				title: "沙拉",
				desc: "安布罗西亚酒店&餐厅",
				rate: 5,
			},
			{
				url: "/static/wall.jpg",
				title: "沙拉",
				desc: "安布罗西亚酒店&餐厅",
				rate: 5,
			},
			{
				url: "/static/wall.jpg",
				title: "沙拉",
				desc: "安布罗西亚酒店&餐厅",
				rate: 5,
			},
		]);
		return {
			urls,
		};
	},
});
</script>

<style scoped lang="scss">
.banner-item {
	width: 300rpx;
	height: 400rpx;
	border-radius: 8px;
}
.food {
	margin-top: 40rpx;
}
.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	&-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		.res-title {
			font-size: 32rpx;
			color: #000;
		}
		.res-desc {
			font-size: 24rpx;
			color: #6b7280;
			margin-top: 12rpx;
		}
	}
	&-right {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #6b7280;
		span {
			margin-right: 12rpx;
		}
	}
}
.content {
	width: 100%;
	overflow-x: hidden;
	padding: 24rpx 0;
	margin-bottom: 24rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;

	&-card {
		width: 100%;
		height: 190rpx;
		border-radius: 8px;
		margin-right: 24rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: nowrap;
		background-color: #fff;
		margin-bottom: 24rpx;
		padding: 24rpx;
		.cl-card__container {
			width: 100%;
		}
		&_img {
			width: 150rpx;
			height: 150rpx;
			border-radius: 24rpx;
			margin-right: 40rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&_desc {
			flex: 1;
			.desc_top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.top_name {
					font-size: 30rpx;
					color: #000;
				}
				.top_price {
					font-size: 24rpx;
					color: #ffd863;
					span {
						margin-right: 4rpx;
					}
				}
			}
			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 12rpx;
				> div {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					.desc_sub {
						font-size: 24rpx;
						color: #6b7280;
					}
					.desc_rate {
						display: flex;
						flex-wrap: nowrap;
						font-size: 24rpx;
						margin-top: 12rpx;
					}
				}
			}
		}
	}
}
</style>
