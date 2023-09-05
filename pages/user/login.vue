<template>
	<cl-page>
		<cl-topbar :border="false" title="Login" background-color="transparent" />
		<div class="gap"></div>
		<GuideCard
			path="/pages/user/static/bg.jpg"
			title="Welcome"
			desc="Before Enjoying Foodmedia Services Please Register First"
		/>
		<div class="footer">
			<cl-button
				@click="handleCreate"
				:height="80"
				:border="false"
				:borderRadius="20"
				class="f-btn"
				type="success"
				>Create Account</cl-button
			>
			<cl-button
				@click="handleLogin"
				:border="false"
				:borderRadius="20"
				:height="80"
				backgroundColor="#D1FAE5"
				color="#10B981"
				class="f-btn"
				type="success"
				>Login</cl-button
			>

			<text class="text">
				By Logging In Or Registering, You Have Agreed To
				<text class="text-active">The Terms And Conditions</text> And
				<text class="text-active"> Privacy Policy. </text>
			</text>
		</div>
		<cl-popup v-model="visible" direction="bottom" border-radius="40rpx 40rpx 0 0">
			<div class="login-popup">
				<div @click="handleClose" class="p-rectangle"></div>
				<div class="p-tabs">
					<cl-tabs
						v-model="tabsActive"
						unColor="#89909E"
						:border="false"
						justify="center"
						fill
						:list="tabList"
					></cl-tabs>
					<CreateAccount @success="handleCreateSuccess" v-show="tabsActive == 0" />
					<AccountLogin @success="handleLoginSuccess" v-show="tabsActive == 1" />
				</div>
			</div>
		</cl-popup>
	</cl-page>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { useApp, useCool, useStore, useWx } from "/@/cool";
import { useUi } from "/@/ui";
import GuideCard from "../guide/card.vue";
import CreateAccount from "./components/create-account.vue";
import AccountLogin from "./components/account-login.vue";
const { service, router, refs, setRefs, storage } = useCool();
const { user } = useStore();
const app = useApp();
const ui = useUi();
const wx = useWx();
const visible = ref(false);
const tabsActive = ref(0);
const tabList = ref([
	{
		label: "Create Account",
		value: 0,
	},
	{
		label: "Login",
		value: 1,
	},
]);
// 手机号
const handleCreate = () => {
	visible.value = true;
	tabsActive.value = 0;
};
const handleLogin = () => {
	visible.value = true;
	tabsActive.value = 1;
};
const handleClose = () => {
	visible.value = false;
};

const handleCreateSuccess = () => {
	tabsActive.value = 1;
};

const handleLoginSuccess = () => {
	visible.value = false;
	router.push("/pages/index/home");
};
// 微信登录
</script>

<style lang="scss" scoped>
.gap {
	height: 160rpx;
}
.text {
	font-size: 20rpx;
	.text-active {
		color: #32b768;
	}
}
.footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 80rpx;
	text-align: center;
	.f-btn {
		width: 500rpx;
		margin-bottom: 40rpx;
	}
}
.login-popup {
	height: 1000rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.p-rectangle {
		width: 100rpx;
		border: 6rpx solid #d2d4d8;
		border-radius: 10rpx;
		margin-bottom: 50rpx;
	}
	.p-tabs {
		width: 100%;
	}
}
</style>
