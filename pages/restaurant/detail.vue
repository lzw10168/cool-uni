<template>
	<cl-page >
    <div class="page-home">

      <DetailCard :data="resInfo.value" />
      <DetailDesc :data="resInfo.value" />
      <DetailMenu :data="resMenu.value" />

    </div>
    <div class="res-footer">
      <cl-button type="primary" :disabled="resInfo.value.status == 0" @click="handleReserve"  block>Book Now</cl-button>
    </div>
    </cl-page>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { computed, reactive, ref } from "vue";
import { useApp, useCool, useStore, useWx } from "/@/cool";
import { useUi } from "/@/ui";
import DetailCard from "./components/detail-card.vue";
import DetailDesc from "./components/detail-desc.vue";
import DetailMenu from "./components/detail-menu.vue";
const { service, router, refs, setRefs, storage } = useCool();
const { user } = useStore();
// 从缓存中取是否首次进入
const resInfo = reactive<any>({
  value: {}
});
const resMenu = reactive<any>({
  value: []
});
onShow((data) => {
  getResInfo(router.query.id)
  getResMenu(router.query.id)
});
const handleReserve = () => {
  router.push({ path: "/pages/restaurant/reserve", query: { id: router.query.id } });
};
const getResMenu = (id) => {
  service.restaurant.info.getRestaurantMenu({
    restaurantId: id
  }).then((res) => {
    resMenu.value = res
  });
}

const getResInfo = (id) => {
  service.restaurant.info.info({
    id: id
  }).then((res) => {
    resInfo.value = res
  });
}
</script>

<style lang="scss" scoped>
.page-home {
  padding-top: 12rpx;
  padding-bottom: 60rpx;
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
