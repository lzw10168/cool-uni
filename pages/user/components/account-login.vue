<template>
	<div class="account-login">
		<FormInput label="Email address" placeholder="Eg namaemail@emailkamu.com" v-model="email" />
		<FormInput password label="Password" placeholder="Enter your password" v-model="password" />
		<div @click="handleForget" class="forget_password">Forget Password?</div>

		<cl-button
			@click="handleLogin"
			:height="80"
			:border="false"
			:borderRadius="20"
			:disabled="!email || !password"
			class="btn"
			type="success"
			>Login</cl-button
		>

		<cl-button
			@click="handleGoogleCreate"
			isImg
			icon="/static/google-icon.jpg"
			:height="80"
			:borderRadius="20"
			class="btn"
		>
			<span>Login with Google</span>
		</cl-button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import FormInput from "/@/components/form-input.vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";

const { service, router, mitt, storage, upload } = useCool();
const { user } = useStore();
const ui = useUi();

export default defineComponent({
	name: "account-login",
	components: {
		FormInput,
	},
	setup(props, { emit }) {
		const email = ref(storage.get("email"));
		const password = ref(storage.get("password"));

		// check storage

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
		const handleLogin = () => {
			if (!checkParams) {
				return;
			}
			service.user.login
				.account({
					email: email.value,
					password: password.value,
				})
				.then(async (res) => {
					// 设置token
					user.setToken(res);
					uni.showToast({
						title: "Login success",
						icon: "none",
					});
					await user.get();
					setTimeout(() => {
						// 设置用户信息

						// 登录跳转
						router.nextLogin();
					}, 1000);
				})
				.catch((err) => {
					const { message } = err;
					uni.showToast({
						title: message,
						icon: "none",
					});
				})
				.finally(() => {
					// 设置缓存
					storage.set("email", email.value);
					storage.set("password", password.value);
				});
		};
		const handleForget = () => {
			router.push({
				path: "/pages/user/forget_password",
				isGuard: false,
			});
		};
		return {
			email,
			password,
			handleLogin,
			handleForget,
			handleGoogleCreate,
		};
	},
});
</script>

<style lang="scss" scoped>
.account-login {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20rpx;
	.forget_password {
		color: #32b768;
		font-size: 24rpx;
		text-align: right;
		width: 100%;
	}
	.btn {
		margin-top: 40rpx;
		margin-left: 0;
		width: 500rpx;
	}
}
</style>
