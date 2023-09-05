<template>
	<div class="page-banner">
		<cl-banner :radius="20" @change="onChange" v-model="currentIndex" :list="urls"> </cl-banner>
		<div class="banner-control">
			<div class="c-dots">
				<div
					class="c-dot"
					v-for="(item, index) in urls"
					:key="index"
					:class="{ 'is-active': index === currentIndex }"
				></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useCool } from "/@/cool";
const { router, service } = useCool();
import GuideCard from "./card.vue";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		const currentIndex = ref(0);
		const urls = ref([
			{
				url: "/static/banner.jpg",
			},
			{
				url: "/static/banner.jpg",
			},
			{
				url: "/static/banner.jpg",
			},
		]);

		function onChange(i: number) {
			currentIndex.value = i;
		}
		return {
			urls,
			currentIndex,
			onChange,
		};
	},
});
</script>
<style lang="scss" scoped>
.page-banner {
	padding: 40rpx 0;
	.banner-control {
		height: 40rpx;
		padding: 20rpx;
		padding-top: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.c-dots {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		.c-dot {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: #e6e6e6;
			margin: 0 5px;
			&.is-active {
				background: #32b768;
			}
		}
	}
}
</style>
