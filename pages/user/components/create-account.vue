<template>
	<div class="create-account">
		<FormInput label="Full Name" placeholder="Enter your full name" v-model="nickname" />
		<FormInput label="Email address" placeholder="Eg namaemail@emailkamu.com" v-model="email" />
		<FormInput password label="Password" placeholder="Enter your password" v-model="password" />

		<cl-button
			@click="handleCreate"
			:height="80"
			:border="false"
			:borderRadius="20"
			:disabled="!nickname || !email || !password"
			class="btn"
			type="success"
			>Register</cl-button
		>

		<cl-button
			@click="handleGoogleCreate"
			isImg
			icon="/static/google-icon.jpg"
			:height="80"
			:borderRadius="20"
			class="btn"
		>
			<span>Sign up with Google</span>
		</cl-button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import FormInput from "/@/components/form-input.vue";
import { useCool, useUi } from "/@/cool";
const { service, router, mitt, storage, upload } = useCool();

export default defineComponent({
	name: "create-account",
	components: {
		FormInput,
	},
	setup(props, { emit }) {
		const nickname = ref("");
		const email = ref("");
		const password = ref("");
		const checkParams = () => {
			const emailExp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
			const passwordExp = /^.{6,}$/;
			if (!emailExp.test(email.value)) {
				uni.showToast({
					title: "Email format is incorrect",
					icon: "none",
				});
				return;
			}
			if (!passwordExp.test(password.value)) {
				uni.showToast({
					title: "Password must be at least 6 characters",
					icon: "none",
				});
				return;
			}
		};
		const handleGoogleCreate = () => {
			uni.showToast({
				title: "Google sign up is not available yet",
				icon: "none",
			});
		};
		const handleCreate = () => {
			if (!checkParams) {
				return;
			}
			service.user.login
				.register({
					nickname: nickname.value,
					email: email.value,
					password: password.value,
				})
				.then((res) => {
					uni.showToast({
						title: "Register success",
						icon: "none",
					});
					emit("success");
				})
				.catch((err) => {
					uni.showToast({
						title: err.message,
						icon: "none",
					});
				});
		};
		return {
			nickname,
			email,
			password,
			handleCreate,
			handleGoogleCreate,
		};
	},
});
</script>

<style lang="scss" scoped>
.create-account {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20rpx;
	.btn {
		margin-top: 40rpx;
		margin-left: 0;
		width: 500rpx;
	}
}
</style>
