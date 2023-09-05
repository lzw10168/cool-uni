<template>
	<cl-page>
		<view class="page-home">
			<HomeHead />
			<HomeInput />
			<HomeBanner />
			<HomeRestaurant />
			<HomeFood />
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { useApp, useCool, useStore, useWx } from "/@/cool";
import { useUi } from "/@/ui";
import HomeHead from "./components/home-head.vue";
import HomeInput from "./components/home-input.vue";
import HomeBanner from "./components/home-banner.vue";
import HomeRestaurant from "./components/home-restaurant.vue";
import HomeFood from "./components/home-food.vue";
const { service, router, refs, setRefs, storage } = useCool();
const { user } = useStore();
// 从缓存中取是否首次进入

onShow(() => {
	const isSe = storage.get("isSe");
	if (!isSe) {
		// 首次进入
		storage.set("isSe", true);
		// 跳转到引导页
		router.push({
			path: "/pages/guide/index",
			isGuard: false,
		});
	} else {
		// 没登录去登录
		if (!user.token) {
			router.login({ reLaunch: true });
		}
		// 非首次进入
	}
});

function toLink(link: string) {
	router.push({
		path: link,
		isGuard: false,
	});
}
</script>

<style lang="scss" scoped>
.page-home {
	padding: 24rpx;
	background: #f5f5f5;
}
</style>
