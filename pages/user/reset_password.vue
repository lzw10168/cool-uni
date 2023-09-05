<template>
	<div class="forget_password">
		<div class="content" v-show="type == 0">
			<div class="forget_password_title">Change New Password</div>
			<div class="forget_password_subtitle">Enter a different password with the previous</div>
			<FormInput
				label="Old Password"
				placeholder="Enter the old password"
				v-model="oldPassword"
			/>
			<FormInput
				label="New Password"
				password
				placeholder="Enter the new password"
				v-model="newPassword"
			/>
			<FormInput
				password
				label="Confirm Password"
				placeholder="Confirm the new password"
				v-model="confirmPassword"
			/>
			<div class="forget_password_btn">
				<cl-button
					@click="handleSubmit"
					:disabled="!confirmPassword || !newPassword || !oldPassword"
					:height="80"
					:borderRadius="20"
					type="success"
					class="btn"
				>
					<span>Submit</span>
				</cl-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";

import FormInput from "/@/components/form-input.vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";
const { user } = useStore();

const ui = useUi();
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const type = ref(0);
const { router, service } = useCool();

const handleCheck = () => {
	if (oldPassword.value === newPassword.value) {
		uni.showToast({
			title: "The new password cannot be the same as the old password",
			icon: "none",
		});
		return false;
	}
	if (newPassword.value !== confirmPassword.value) {
		uni.showToast({
			title: "The new password and the confirmation password are inconsistent",
			icon: "none",
		});
		return false;
	}
	// length 6
	if (newPassword.value.length < 6) {
		uni.showToast({
			title: "The password length cannot be less than 6 digits",
			icon: "none",
		});
		return false;
	}
	return true;
};
const handleSubmit = () => {
	if (!handleCheck()) return;
	// loading
	uni.showLoading({
		title: "Loading...",
	});
	service.user.info
		.updatePassword({
			oldPassword: oldPassword.value,
			newPassword: newPassword.value,
		})
		.then((res) => {
			uni.hideLoading();
			uni.showToast({
				title: "Password changed successfully",
				icon: "none",
			});
			// setTimeout(() => {
			user.logout();
			// }, 1000);
		})
		.catch((err) => {
			uni.hideLoading();
			uni.showToast({
				title: err.message,
				icon: "none",
			});
		})
		.finally(() => {
			uni.hideLoading();
		});
};
</script>

<style scoped lang="scss">
.forget_password {
	height: 90vh;
	position: relative;
	background: #fff;
	padding: 48rpx;
	box-sizing: border-box;
	overflow: hidden;
	.content {
		height: calc(100%);
		margin-top: 100rpx;
		position: relative;
		overflow: hidden;
	}
	&_title {
		font-size: 40rpx;
		font-weight: bold;
	}
	&_subtitle {
		font-size: 30rpx;
		color: #9ca3af;
		margin-bottom: 100rpx;
	}
	&_tip {
		color: #9ca3af;
		font-size: 24rpx;
	}
	&_btn {
		width: 100%;
		display: flex;
		position: absolute;
		bottom: 200rpx;
		justify-content: center;
		.btn {
			margin-top: 40rpx;
			margin-left: 0;
			width: 500rpx;
		}
	}
	.success {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		&_icon {
			padding-top: 200rpx;
			width: 250rpx;
			height: 250rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&_title {
			font-size: 24px;
			font-weight: bold;
		}
		&_subtitle {
			font-size: 16px;

			color: #6b7280;
		}
		&_tip {
			margin-top: 100rpx;
			font-size: 16px;
			font-weight: bold;
			color: #6b7280;
			.active {
				color: #32b768;
			}
		}
	}
}
</style>
