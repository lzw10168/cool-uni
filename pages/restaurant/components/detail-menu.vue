<template>
	<div class="detail-menu">
		<cl-card class="content">
			<div class="content-card" v-for="(item, index) in resMenu.value" :key="item.id">
				<div class="content-card_img">
					<img :src="item.mainImage" alt="" />
				</div>
				<div class="content-card_desc">
					<div class="desc_top">
						<div class="top_name">
							{{ item.title }}
						</div>
						<div class="top_price">
							<span>A$</span>
							<span>{{ item.price }}</span>
						</div>
					</div>
					<div class="bottom">
						<div class="desc_sub">
							{{ item.description }}
						</div>

						<div>
							<cl-icon
								@click="handleLike(item)"
								:size="40"
								:color="item.like ? '#33ad62' : '#6b7280'"
								name="like-fill"
							></cl-icon>
						</div>
					</div>
				</div>
			</div>
		</cl-card>
	</div>
</template>

<script lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";
export default defineComponent({
	props: {
		data: {
			type: Object,
			default: () => [],
		},
	},
	setup() {
		const { service, router, mitt, storage, upload } = useCool();
		const { user } = useStore();
    console.log('user: ', user);
		const resMenu = reactive<any>({
			value: [],
		});

    const handleLike = (item) => {
      item.like = !item.like
      if (item.like){
        user.info = {
          ...user.info,
          likeDish: user.info.likeDish ? user.info.likeDish + ',' + item.id : item.id
        }
        user.set(user.info)
        user.update(user.info)
      } else {
        user.info = {
          ...user.info,
          likeDish: user.info.likeDish.split(',').filter(i => i != item.id).join()
        }
        user.set(user.info)
        user.update(user.info)
      }
    }
		const getResMenu = (id) => {
			service.restaurant.info
				.getRestaurantMenu({
					restaurantId: id,
				})
				.then((res) => {
					resMenu.value = res.map((item) => {
            return {
              ...item,
              like: user.info.likeDish?.split(',').includes(item.id+'') ? true : false,
            };
          }) || []
				});
		};
    onShow((data) => {
			getResMenu(router.query.id);
		});
		const list = reactive<any>({
			value: [],
		});
		return {
			list,
			resMenu,
      handleLike
		};
	},
});
</script>

<style scoped lang="scss">
.content {
	width: 100%;
}

.content {
	width: 100%;
	overflow-x: hidden;
	padding: 24rpx 0;
	margin: 12rpx 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	padding: 20rpx;
	margin-top: 10rpx;
	border-radius: 18rpx;
	background-color: #f6f6f6 !important;
	box-sizing: border-box;
	font-size: 14px;

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
			display: flex;
			flex-direction: column;
			justify-content: space-between;
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
