<template>
	<div class="page-home">
		<cl-banner @change="onChange" v-model="currentIndex" :list="urls">
			<template #default="{ item, index }">
				<GuideCard :path="item.url" :title="item.title" :desc="item.desc" />
			</template>
		</cl-banner>
		<div class="banner-control">
			<div class="c-skip">
				<span @click="handleSkip" v-show="currentIndex == 0"> Skip </span>
			</div>
			<div class="c-dots">
				<div
					class="c-dot"
					v-for="(item, index) in urls"
					:key="index"
					:class="{ 'is-active': index === currentIndex }"
				></div>
			</div>
			<div class="c-next" @click="onNext">
				<cl-icon name="arrow-right" color="#32B768"></cl-icon>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool, useStore } from "/@/cool";
const { service, router, mitt, storage, upload } = useCool();
import GuideCard from "./card.vue";
import { useUi } from "/@/ui";

const { user } = useStore();
const currentIndex = ref(0);
const urls = ref([
	{
		url: "/pages/guide/static/step1.jpg",
		title: "Nearby restaurants",
		desc: `You don't have to go far to find a good restaurant, we have provided all the restaurants that is near you`,
	},
	{
		url: "/pages/guide/static/step2.jpg",
		title: "Select the Favorites Menu",
		desc: `Now eat well, don't leave the house,You can choose your favorite food only with one click`,
	},
	{
		url: "/pages/guide/static/step3.jpg",
		title: "Good food at a cheap price",
		desc: `You can eat at expensive restaurants with affordable price`,
	},
]);

function onNext() {
	if (currentIndex.value === 2) {
		handleSkip();
	}
	currentIndex.value = currentIndex.value + 1;
}
function onChange(i: number) {
	currentIndex.value = i;
}
function handleSkip() {
	if (user.token) {
		router.home();
	} else {
		router.login({
			reLaunch: true,
		});
	}
}
</script>
<style lang="scss" scoped>
.page-home {
	height: 100vh;
	background: #fff;
	.cl-banner {
		height: 80vh !important;
	}
	.banner-control {
		height: 80rpx;
		padding: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.c-skip {
		width: 60rpx;
	}
	.c-next {
		width: 40rpx;
	}
	.c-dots {
		display: flex;
		justify-content: center;
		align-items: center;
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
