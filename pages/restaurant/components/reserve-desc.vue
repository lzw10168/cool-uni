<template>
	<div class="detail-desc">
		<cl-card class="card">
			<div class="card-title">订一张桌子</div>
			<div class="card-guest border">
				<span> 客人 </span>
				<cl-input-number
					v-model="form.guest"
					@change="handleChange('guest', $event)"
					:width="120"
					:min="1"
					input
					:step="1"
				/>
			</div>
			<div class="card-date border">
				<div>日期</div>
				<DateTabs
					:value="form.date"
					@change="handleChange('date', $event)"
					color="#33a35c"
				></DateTabs>
			</div>
			<div class="card-time border">
				<div>选择时间</div>
				<div class="card-time-container">
					<div
						class="card-time-container_item"
						@click="handleChange('time', i.value)"
						:class="{
							'card-time-container_item-active': form.time === i.value,
						}"
						v-for="i in timeList"
						:key="i.value"
					>
						{{ i.label }}
					</div>
				</div>
			</div>
		</cl-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import DateTabs from "/@/uni_modules/hope-11-date-tabs/components/hope-11-date-tabs/date-tabs.vue";
const timeList = [
	{
		value: "1",
		label: "17:00",
	},
	{
		value: "2",
		label: "17:30",
	},
	{
		value: "3",
		label: "18:00",
	},
	{
		value: "4",
		label: "18:30",
	},
	{
		value: "5",
		label: "19:00",
	},
	{
		value: "6",
		label: "19:30",
	},
	{
		value: "7",
		label: "20:00",
	},
	{
		value: "8",
		label: "20:30",
	},
];
import dayjs from "dayjs";
export default defineComponent({
	components: {
		DateTabs,
	},
	setup(props, { emit }) {
		const form = reactive({
			guest: 3,
			date: dayjs().format("YYYY-MM-DD"),
			time: "1",
		});
    const handleChange = (key, value) => {
      form[key] = value;
      if (key === 'date') {
        form.date = value.dd
      }
      emit('change', form)
    };
		return {
			timeList,
			form,
      handleChange
		};
	},
});
</script>

<style scoped lang="scss">
.card {
	width: 100%;
	padding: 20rpx;
	margin-top: 10rpx;
	border-radius: 18rpx;
	background-color: #fff;
	box-sizing: border-box;
	font-size: 14px;
	.border {
		border: 1px solid #f56606;
		border-radius: 8px;
	}
	&-title {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
		width: 100%;
		margin-bottom: 20rpx;
	}
	&-guest {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 20rpx;
		margin-bottom: 20rpx;
		.cl-input-number {
			height: 60rpx;
			background-color: #33ad62 !important;
			border-radius: 4px;
			color: #fff;
		}
		::v-deep .uni-input-wrapper {
			background-color: #33ad62;
			color: #fff;
		}
	}
	&-date {
		padding: 10rpx 20rpx;
		margin-bottom: 20rpx;
		div {
			margin-bottom: 20rpx;
		}
	}
	&-time {
		padding: 10rpx 20rpx;
		margin-bottom: 20rpx;
		div {
			margin-bottom: 20rpx;
		}
		.card-time-container {
			display: flex;
			flex-wrap: wrap;
			padding-left: 10rpx;
			.card-time-container_item {
				width: 100rpx;
				height: 40rpx;
				border-radius: 4px;
				padding: 10rpx;
				border: 1px solid #33ad62;
				color: #33ad62;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				&-active {
					background-color: #33ad62;
					color: #fff;
				}
			}
		}
	}
}
</style>
