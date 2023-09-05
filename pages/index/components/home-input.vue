<template>
	<div class="search-input">
		<cl-input
			:borderRadius="20"
			:height="70"
			placeholder="Search..."
			:border="false"
			background-color="#e2e3e5"
			clearable
		>
			<template #prepend>
				<cl-icon color="#777777" name="search"></cl-icon>
			</template>
		</cl-input>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return {};
	},
});
</script>

<style scoped lang="scss">
.search-input {
	margin-top: 20rpx;
}
</style>
