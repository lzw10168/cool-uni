<template>
	<div class="forget_password">
		<div class="content" v-show="type == 0">
			<div class="forget_password_title">Forget Password?</div>
			<div class="forget_password_subtitle">Enter your registed email below</div>
			<FormInput
				label="Email address"
				placeholder="Eg namaemail@emailkamu.com"
				v-model="email"
			/>
			<div class="forget_password_tip">
				Remember the password?
				<span style="color: #32b768" @click="handleLogin">Sign in</span>
			</div>
			<div class="forget_password_btn">
				<cl-button
					@click="handleSubmit"
					:disabled="!email"
					:height="80"
					:borderRadius="20"
					type="success"
					class="btn"
				>
					<span>Submit</span>
				</cl-button>
			</div>
		</div>
		<div class="success content" v-show="type == 1">
			<div class="success_icon">
				<img src="/static/success-icon.jpg" alt="" />
			</div>
			<div class="success_title">Success</div>
			<div class="success_subtitle">Please check your email for create a new password</div>
			<div class="success_tip">
				Can't get email? <span @click="handleBack" class="active"> Resubmit </span>
			</div>
			<div class="forget_password_btn">
				<cl-button
					@click="handleBack"
					:loading="loading"
					:height="80"
					:borderRadius="20"
					type="success"
					class="btn"
				>
					<span>Back Email</span>
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
const email = ref("");
const type = ref(0);
const loading = ref(true);
const { router } = useCool();
const handleLogin = () => {
	router.push({
		path: "/pages/user/login.vue",
	});
};
const handleSubmit = () => {
	// loading
	uni.showLoading();
	setTimeout(() => {
		uni.hideLoading();
		type.value = 1;
		loading.value = false;
	}, 500);
};
const handleBack = () => {
	type.value = 0;
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
