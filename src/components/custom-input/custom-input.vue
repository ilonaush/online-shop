<template functional>
	<label class="custom-input_label">
		{{props.label}}
		<input
			v-bind:value="props.value"
			v-on:input="listeners.input($event.target.value)"
		/>
	</label>

</template>

<style lang="stylus">
	.custom-input_label
		display block
		input
			display flex
			border 1px solid mediumaquamarine
</style>
