<template>
	<div class="restaurant">
		<div class="top">
			<div class="top-left">
				<div class="res-title">Book a restaurant</div>
				<div class="res-desc">Popular restaurants, make online reservations for convenient dining。</div>
			</div>
			<div class="top-right">
				<!-- <span>查看详情</span>
				<cl-icon name="arrow-right"></cl-icon> -->
			</div>
		</div>
		<div class="content">
			<div v-for="(item, index) in list.value" :key="index">
				<cl-card class="content-card" @click="goRes(item)">
					<div class="content-card_img">
						<img :src="item.mainImage" alt="" />
					</div>
					<div class="content-card_title">
						{{ item.title }}
					</div>
					<div class="content-card_location">
						<cl-icon class="icon" :size="24" color="#32B768" name="map-fill"></cl-icon>
						{{ item.location }}
					</div>
					<div class="content-card_tip">
						Reservation Now
						<cl-icon name="arrow-right"></cl-icon>
					</div>
				</cl-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import FormInput from "/@/components/form-input.vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";


export default defineComponent({
	setup() {
    const { service, router, mitt, storage, upload } = useCool();
    const { user } = useStore();
    onMounted(() => {
      getRes()
    })
    const goRes = (item) => {
      router.push({
        path: '/pages/restaurant/detail',
        query: {
          id: item.id
        }
      })
    }
    const getRes = () => {
      service.restaurant.info.list().then((res) => {
        list.value = res?.sort((a, b) => {
          return b.score - a.score
        }) || []
      });
    }
		const list = reactive({
      value: []
    });
		return {
			list,
      goRes
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
	height: 450rpx;
	width: 100%;
	overflow-x: scroll;
	padding: 24rpx 0;
	margin-bottom: 24rpx;
	box-sizing: border-box;
	display: flex;
	flex-wrap: nowrap;
	overflow-y: hidden;
	&-card {
		width: 300rpx;
		border-radius: 8px;
		margin-right: 24rpx;
		box-sizing: border-box;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
		&_img {
			width: 100%;
			height: 200rpx;
			border-radius: 8px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&_title {
			font-size: 30rpx;
			width: 100%;
			box-sizing: border-box;
			color: #000;
			margin-top: 12rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		&_location {
			align-items: center;
			font-size: 24rpx;
			color: #6b7280;
			margin-top: 12rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			.icon {
				margin-right: 6rpx;
				display: inline-block;
			}
		}
		&_tip {
			display: flex;

			font-size: 24rpx;
			color: #32b768;
			margin-top: 12rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
