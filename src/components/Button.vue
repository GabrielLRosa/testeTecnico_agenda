

<script>

export default {
	props: {
		style: Object,
		disabled: Boolean,
		callback: Function
	},
};
</script>

<template>
	<button class="create-new" :disabled="disabled" @click="callback" :style="style">
		<slot></slot>
	</button>
</template>

<style>
.create-new {
	border-radius: 20px;
	border: none;

	box-shadow: 0 2px 0 rgb(0 0 0 / 16%);
	background-color: var(--light-yellowish-green);

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 1rem 0.75rem;

	cursor: pointer;
}

.create-new:disabled {
	opacity: .5;
}

.create-new > img {
	margin-right: 10px;
}
</style>