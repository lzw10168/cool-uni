<template>
	<div class="guide-card">
		<div class="card-img">
			<img :src="path" alt="" />
		</div>
		<div class="card-title">
			{{ title }}
		</div>
		<div class="card-desc">
			{{ desc }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, nextTick, PropType, reactive, ref } from "vue";

const props = defineProps({
	path: String,
	title: String,
	desc: String,
});
</script>

<style lang="scss" scoped>
.guide-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx;
	font-family: Source Han Sans CN;
	color: #1f2937;

	.card-img {
		width: 90%;
		height: 580rpx;
	}
	.card-title {
		font-size: 48rpx;
		font-weight: normal;
		margin-bottom: 30rpx;
	}
	.card-desc {
		font-size: 24rpx;
		font-weight: normal;
		text-align: center;
	}
}
</style>
