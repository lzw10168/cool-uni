<template>
  <div class="order-detail">
    <div class="content">
      <div class="img">
        <img :src="data.value?.restaurantInfo.mainImage" alt="">
      </div>
      <div class="footer">
        <div class="title">
          {{ data.value?.restaurantInfo.title }}
        </div>
        <div class="date">
          Appointment:  {{ data.value.reservationDate }}    {{ timeMap[data.value.reservationTime] }}
        </div>
        <!-- <div class="date">
          备注:  {{ data.value?.remark }}
        </div> -->
        <div class="desc">
          <div class="desc-item">
            <div class="desc-item__title">
              Guest
            </div>
            <div class="desc-item__value">
              {{ data.value?.numberOfGuests }}人
            </div>
          </div>
          <div class="desc-item">
            <div class="desc-item__title">
              Floor
            </div>
            <div class="desc-item__value">
              01
            </div>
          </div>
          <div class="desc-item">
            <div class="desc-item__title">
              Table
            </div>
            <div class="desc-item__value">
              {{ data.value?.tableInfo.title }}
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="code">
          <div class="code-img">
            <img src="./code.jpg" alt="">
          </div>
          <div class="title">
            ID-{{ data.value?.id }}
          </div>
        </div>
      </div>
    </div>
    <div v-show="data.value?.status == 1" class="cancel" @click="handleCancelOrder">
      Cancel Order
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";
import { onShow } from '@dcloudio/uni-app';
import { statusMap, timeMap } from '/@/cool/utils/comm';

const { service, router, mitt, storage, upload } = useCool();
const { user } = useStore();
const data = reactive<any>({
  value: {
    restaurantInfo: {},
    tableInfo: {}
  }
})
const getDetail = (id) => {
  service.reservations.info.getInfoDetail({
    id
  }).then((res) => {
    data.value = res
  });
}
const handleCancelOrder = () => {
  uni.showModal({
    title: 'Cancel Order',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    content: 'Are you sure you want to cancel this order?',
    success: function (res) {
      if (res.confirm) {
        service.reservations.info.update({
          id: data.value.id,
          status: -1
        }).then((res) => {
          uni.showToast({
            title: 'Cancel Success',
            icon: 'none',
            duration: 2000
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1
            });
          }, 2000);
        });
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}

onShow(() => {
  getDetail(router.query.id)
})

</script>

<style scoped lang="scss">
.content {
  margin: 50rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
  .footer {
    padding: 30rpx;
  }
  .img {
    width: 100%;
    height: 400rpx;
    border-radius: 20rpx 20rpx 0 0;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .title {
    font-size: 40rpx;
    font-weight: bold;
    padding: 10rpx;
  }
  .date {
    font-size: 30rpx;
    color: #999;
    padding: 10rpx;
  }
  .desc {
    display: flex;
    padding: 20rpx 10rpx;
    margin-top: 20rpx;
    background-color: #33ad62;
    border-radius: 20rpx;
    color: #fff;
    .desc-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .desc-item__title {
        font-size: 30rpx;
      }
      .desc-item__value {
        font-size: 30rpx;
        margin-top: 10rpx;
      }
    }
  }
  .split {
    border-top: 2rpx dashed #eee;
    margin: 40rpx 0;
  }
  .code {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .code-img {
      width: 200rpx;
      height: 200rpx;
      margin-right: 20rpx;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .title {
      font-size: 40rpx;
      font-weight: bold;
    }
  }
}
.cancel {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  color: #898787;
  font-size: 30rpx;
  text-decoration: underline;
}
</style>
