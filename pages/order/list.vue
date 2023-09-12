<template>
		<div class="content">
			<div @click="handleClick(item)" v-for="(item, index) in list.value" :key="index">
				<div class="content-card">
					<div class="content-card_desc">
						<div class="desc_top">
							<div class="top_name">
								Restaurant: {{ item.restaurantTitle }}
							</div>
							<div class="top_price">
								<span :class="{
                  'cl-text--success': item.status == 2,
                  'cl-text--danger': item.status == 1,
                  'cl-text--warning': item.status == -1,
                }">{{statusMap[item.status]}}</span>
							</div>
						</div>
						<div class="bottom">
							<div>
								<div class="desc_sub">
									Table: {{ item.tableTitle }}
								</div>
								<div class="desc_sub">
                  Guest: {{ item.numberOfGuests }} 
								</div>
                <div class="desc_sub">
                  Date: {{ item.reservationDate }}    {{ timeMap[item.reservationTime] }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { defineComponent, ref, onMounted, reactive } from "vue";
import FormInput from "/@/components/form-input.vue";
import { useCool, useStore } from "/@/cool";
import { statusMap, timeMap } from '/@/cool/utils/comm';
import { useUi } from "/@/ui";

export default defineComponent({
	setup() {
    const { service, router, mitt, storage, upload } = useCool();
    const { user } = useStore();
    onShow(() => {
      getRes()
    })
    const getRes = () => {
      service.reservations.info.page({
        userId: user.info.id,
        size: 99999,
        page: 1
      }).then((res) => {
        list.value = res.list.map(item => {
          return {
            ...item,
          }
        }) || []
      });
    }
    const handleClick = (item) => {
      router.push({
        path: "/pages/order/detail",
        query: {
          id: item.id
        },
      });
    }
		const list = reactive<any>({
      value: []
    });
		return {
			list,
      statusMap,
      timeMap,
      handleClick
		};
	},
});
</script>

<style scoped lang="scss">


.content {
	width: 100%;
	overflow-x: hidden;
	padding: 24rpx 24rpx;
	margin-bottom: 24rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
  background-color: #f9fafb;
  .cl-text--success {
    color: #10b981;
  }
  .cl-text--danger {
    color: #f59e0b;
  }
  .cl-text--warning {
    color: #999;
  }
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
          font-weight: bold;
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
