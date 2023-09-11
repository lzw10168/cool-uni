<template>
  <div class="detail-card">
    <cl-card class="card">
      <div class="card-img">
        <img :src="data.mainImage" alt="" />
      </div>
      <div class="card-title">
        {{ data.title }}
      </div>
      <!-- 开放时间 -->
      <div class="card-time">
        <cl-icon class="icon" :size="24" color="#32B768" name="time"></cl-icon>
        <span class="text">Opening Days: Monday to Sunday</span>
        <span class="tag" :class="{
          'tag-open': !data.disabled,
          'tag-close': data.disabled
        }">{{ !data.disabled ? 'Operation' : 'Resting' }}
        </span>
      </div>
      <div class="card-location">
        <cl-icon class="icon" :size="24" color="#32B768" name="map"></cl-icon>
        {{ data.location }}
      </div>
    </cl-card>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  padding: 20rpx;
  margin-top: 10rpx;
  border-radius: 18rpx;
  background-color: #fff;
  box-sizing: border-box;
}
.card-img {
  width: 100%;
  height: 340rpx;
  border-radius: 12rpx;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.card-title {
  margin-top: 20rpx;
  font-size: 32rpx;
  color: #000;
}
.card-time {
  margin-top: 10rpx;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 12rpx;
  }
  .text {
    margin-right: 12rpx;
  }
  .tag {
    padding: 2rpx;
    border-radius: 4rpx;
    font-size: 20rpx;
    color: #fff;
    &-open {
      border: 1px solid rgba(255, 143, 31, 1);
      color: rgba(255, 143, 31, 1);
    }
    &-close {
      border: 1px solid rgb(242, 227, 211);
      color: rgb(245, 228, 211);
    }
  }
}
.card-location {
  margin-top: 10rpx;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 12rpx;
  }
}
</style>
