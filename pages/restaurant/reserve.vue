<template>
	<cl-page >
    <div class="page-home">

      <ReserveCard  />
      <ReserveDesc @change="handleFormChange" />
      <ReserveTable @change="handleTableChange" :tableList="resTable.value" :form="form.value" />
      <ReserveRemark @change="handleRemarkChange" :form="form.value" />
      <!-- remark -->


    </div>
    <div class="res-footer">
      <cl-button type="primary"  @click="handleReserve"  block>Confirm appointment</cl-button>
    </div>
    </cl-page>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { computed, reactive, ref } from "vue";
import { useApp, useCool, useStore, useWx } from "/@/cool";
import { useUi } from "/@/ui";
import ReserveCard from "./components/reserve-card.vue";
import ReserveDesc from "./components/reserve-desc.vue";
import ReserveTable from "./components/reserve-table.vue";
import ReserveRemark from "./components/reserve-remark.vue";
import dayjs from "dayjs";
const { service, router, refs, setRefs, storage } = useCool();
const { user } = useStore();
const resInfo = reactive<any>({
  value: {}
});
const resMenu = reactive<any>({
  value: []
});
const resTable = reactive<any>({
  value: []
});
const form = reactive<any>({
  value: {
    status: 1,
  restaurantId: router.query.id,
  date: dayjs().format("YYYY-MM-DD"),
  time: '1',
  guest: 3,
  tableId: '',
  remark: ''
}
});
onShow((data) => {
  getResInfo(router.query.id)
  getResMenu(router.query.id)
  getResTable(router.query.id, form.value.date, form.value.time)
});
const handleReserve = () => {
  if (!form.value.tableId) {
    uni.showToast({
      title: 'Please select a table',
      icon: 'none'
    })
    return;
  }
  uni.showLoading({
    title: 'Reservation in progress'
  })
  service.reservations.info.add({
    ...form.value,
    numberOfGuests: form.value.guest,
    reservationDate: form.value.date,
    reservationTime: form.value.time,
    userId: user.info.id
  }).then((res) => {
    uni.showToast({
      title: 'Appointment successful',
      icon: 'none'
    })
    router.push({
      path: '/pages/order/detail',
      query: {
        id: res.id
      }
    })
  }).finally(() => {
    uni.hideLoading()
  })
  console.log('form: ', form);
};
const getResMenu = (id) => {
  service.restaurant.info.getRestaurantMenu({
    restaurantId: id
  }).then((res) => {
    resMenu.value = res
  });
}

const getResTable = (id, date, time) => {
  service.table.info.getTablesStatus({
    restaurantId: id,
    date,
    time
  }).then((res) => {
    resTable.value = res
  });
}

const getResInfo = (id) => {
  service.restaurant.info.info({
    id: id
  }).then((res) => {
    resInfo.value = res
  });
}
const handleRemarkChange = (e) => {
  form.value = {
    ...form.value,
    ...e
  }
};
const handleFormChange = (_form) => {
  form.value = {
    ...form.value,
    ..._form
  }
  form.value.tableId = ''
  getResTable(router.query.id, form.value.date, form.value.time)
};
const handleTableChange = (id) => {
  form.value.tableId = id
};
</script>

<style lang="scss" scoped>
.page-home {
  padding-top: 12rpx;
  padding-bottom: 100rpx;
	background: #f5f5f5;
}
.res-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 0 10rpx rgba(0,0,0,.1);
  display: flex;
  justify-content: center;
  .cl-button {
    width: 60%;
  }
}
</style>
