<template>
  <div class="detail-card">
    <cl-card class="card">
      <div class="card-img">
        <img src="/static/reserve-bg.jpg" alt="" />
      </div>
      <div class="title">
        Book a table online
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
  border-radius: 18rpx;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
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
.title {
  position: absolute;
  top: 15%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-size: 40rpx;
  color: #233f7d;
  font-weight: bold;
}

</style>
