<template>
	<div class="detail-desc">
		<cl-card class="card">
			<div class="card-title">Remark</div>
      <div class="card-container">
        <cl-input placeholder="Please Input" clearable @change="handleChange" :value="form.value" />
      </div>
		</cl-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import TableItem from "./reserve-table-item.vue";
export default defineComponent({
  components: {
    TableItem
  },
  props: {
    tableList: {
      type: Object,
      default: () => []
    },
    form: {
      type: Object,
      default: () => {
        return {
          remark: ''
        }
      }
    }
  },
	setup(props, { emit }) {
    const handleChange = (e) => {
      console.log('e: ', e);
      emit("change", {
        remark: e
      });
    };
		return {
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
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .card-item {
    }
  }
}
</style>
