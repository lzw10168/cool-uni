<template>
	<cl-page>
		<view class="page-user-edit">
			<view class="form">
				<cl-form label-position="top">
					<cl-form-item label="Name">
						<cl-input v-model="form.nickName" type="nickname" :border="true" />
					</cl-form-item>
					<cl-form-item label="Phone">
						<cl-input v-model="form.phone" type="phone" :border="true" />
					</cl-form-item>
				</cl-form>
			</view>

			<view class="save-btn">
				<cl-button :width="220" round type="primary" :loading="loading" @tap="save">
					Save
				</cl-button>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";

const { router } = useCool();
const { user } = useStore();
const ui = useUi();

const form = reactive(user.info || {});
const loading = ref(false);

async function save() {
	loading.value = true;
	await user.update(form).catch((err) => {
		uni.showToast({
			title: err.message,
			icon: "none",
		});
	});
	loading.value = false;
  uni.showToast({
    title: 'Success',
    icon: "none",
  });
    // router.back()
}
</script>

<style lang="scss" scoped>
.page-user-edit {
	.form {
		padding: 20rpx 24rpx;
	}

	.save-btn {
		padding: 20rpx 24rpx;
		display: flex;
		justify-content: center;
	}
}
</style>
