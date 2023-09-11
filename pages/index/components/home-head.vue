<template>
	<div class="top-head">
		<div class="top-head_menu">
			<MenuIcon @click="handleToggle" />
			<div v-show="menuShow" @click="handleClose" class="top-head_mask"></div>

			<div
				class="top-head_menu_list"
				:class="{
					'top-head_menu_list_hide': !menuShow,
				}"
			>
      <div @click="handleChangeInfo" class="menu_list_item">
        <span>Setting</span>
      </div>
      <div @click="handleOrderList" class="menu_list_item">
        <span>Order List</span>
      </div>
      <!-- 订单中心 -->

				<div @click="handleLogOut" class="menu_list_item">
					<span>Log Out</span>
				</div>
				<!-- <div @click="handleChangePwd" class="menu_list_item">
					<span>Reset Password</span>
				</div> -->
			</div>
		</div>
		<div class="top-head_location">
			<!-- <cl-icon class="icon" color="#32b768" name="map-fill"></cl-icon>
			<span>阿格拉巴德435，吉大港</span> -->
		</div>
		<div class="top-head_avatar">
			<cl-avatar :src="avatarUrl" :size="64"></cl-avatar>
			<!-- menu -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MenuIcon from "/@/components/icons/menu-icon.vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/@/ui";

const { service, router, mitt, storage, upload } = useCool();
const { user } = useStore();
const ui = useUi();
export default defineComponent({
	components: {
		MenuIcon,
	},
	setup() {
		// icon show
    const avatarUrl = ref(user.info?.avatarUrl);
		const menuShow = ref(false);
		const handleOpen = () => {
			menuShow.value = true;
		};
		const handleClose = () => {
			menuShow.value = false;
		};
		const handleToggle = () => {
			menuShow.value = !menuShow.value;
		};

		const handleLogOut = () => {
			handleClose();
			user.logout();
		};

		const handleChangePwd = () => {
			handleClose();
			router.push({
				path: "/pages/user/reset_password",
				guard: false,
			});
		};
    const handleChangeInfo = () => {
      handleClose();
      router.push({
        path: "/pages/user/set",
        guard: false,
      });
    };
    const handleOrderList = () => {
      handleClose();
      router.push({
        path: "/pages/order/list",
        guard: false,
      });
    };

		return {
      avatarUrl,
			menuShow,
			handleOpen,
			handleClose,
			handleToggle,
			handleLogOut,
			handleChangePwd,
      handleChangeInfo,
      handleOrderList
		};
	},
});
</script>

<style lang="scss" scoped>
.top-head {
	padding-top: 40rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.top-head_location {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #4b5563;
	}
	.icon {
		margin-right: 20rpx;
	}
	.top-head_mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		backdrop-filter: blur(5px);
		transition: all 1s;
		z-index: 1;
	}
	.top-head_menu {
		position: relative;
		&_list {
			position: absolute;
			transition: all 0.5s;
			top: 100%;
			left: 0;
			width: 280rpx;
			background-color: #fff;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
			border-radius: 10rpx;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			z-index: 10;
			display: flex;
			flex-direction: column;
			align-items: left;
			.menu_list_item {
				width: 100%;
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: left;
				font-size: 24rpx;
				color: #4b5563;
				border-bottom: 1px solid #e2e3e5;
				cursor: pointer;
				&:hover {
					background-color: #f7fafc;
				}
				span {
					margin-left: 10rpx;
				}
			}
		}
	}
	.top-head_menu_list_hide {
		height: 0;
		width: 280rpx;
		padding: 0 20rpx;
		overflow: hidden;
	}
}
</style>
