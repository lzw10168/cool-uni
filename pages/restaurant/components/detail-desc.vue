<template>
  <div class="detail-desc">
    <cl-card class="card" >
      <div v-html="data.description">
        
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

<style scoped>
.card {
  width: 100%;
  padding: 20rpx;
  margin-top: 10rpx;
  border-radius: 18rpx;
  background-color: #fff;
  box-sizing: border-box;
  font-size: 14px;
  color: #999
}
</style>
