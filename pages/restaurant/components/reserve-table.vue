<template>
	<div class="detail-desc">
		<cl-card class="card">
			<div class="card-title">Restaurant table</div>
      <div class="card-container">
        <div class="card-item" v-for="item in tableList" :key="item.id">
          <TableItem @click="handleClick(item)"  :checked="item.id == form.tableId" :disabled="item.disabled" :title="item.title" :capacity="item.capacity" />
        </div>
      </div>
		</cl-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import TableItem from "./reserve-table-item.vue";
const statusOptions = [
	{ label: "Reserved", value: 1 },
	{ label: "Completed", value: 2 },
	{ label: "Cancelled", value: -1 }
];

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
          tableId: ''
        }
      }
    }
  },
	setup(props, { emit }) {
    const handleClick = (item) => {
      if (item.disabled) {
        return
      }
      emit("change", item.id);
    };
		return {
      handleClick
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
