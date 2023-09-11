<template>
  <div class="pr">
    <div class="checked">
			<cl-icon v-if="checked" name="success-fill" color="#33ad62" size="20px" />
		</div>
	<div
		class="table-item"
		:class="{
			disabled: disabled,
		}"
	>
		<div class="item_bg">
			<img :src="tableBg" alt="" />
		</div>
		<!-- 右上角勾选角标 -->
	
		<div class="header">
			{{ title }}
		</div>
		<div class="footer">
			{{ disabled ? "被预约" : "可预约" }}
		</div>
		<div class="center">G-{{ capacity }}</div>
	</div>
</div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import tableBg from "./tableIcon.jpg";
export default defineComponent({
	props: {
		disabled: Boolean,
		title: String,
		capacity: Number,
		checked: Boolean,
	},
	setup() {
		return {
			tableBg,
		};
	},
});
</script>

<style scoped lang="scss">
.pr {
  position: relative;

	.checked {
		position: absolute;
		top: -10px;
		right: 0px;
    z-index: 100;
		width: 20px;
		height: 20px;
	}
}
.table-item {
	position: relative;
	padding: 12px;
	border-radius: 8px;
	width: 120px;
	height: 120px;
	border: 1px solid #33ad62;
	background-color: #fff;
	margin: 0 12px 12px 0;
	.item_bg {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		padding: 6px;
		border: 1px dashed #f3f3f3;
		box-sizing: border-box;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-weight: bold;
		font-size: 14px;
		color: #000;
	}
	.header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		border-radius: 6px 6px 0 0;
		color: #fff;
		background-color: rgba(51, 173, 98, 0.9);
	}
	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 0 0 6px 6px;
		font-size: 12px;
		color: #fff;
		background-color: rgba(51, 173, 98, 0.9);
	}
	&.disabled {
		border: 1px solid #dad8d8 !important;
		color: #000;
		.item_bg {
			border: 1px dashed #f3f3f3;
			color: #000;
		}
		.header {
			background-color: rgba(235, 235, 235, 0.9);
			color: #000;
		}
		.footer {
			background-color: rgba(235, 235, 235, 0.9);
			color: #000;
		}
	}
}
</style>
