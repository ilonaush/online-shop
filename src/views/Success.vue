<template functional>
	<div class="success-page">
		<div class="success-page_content">
			Thank you! Your order is awaiting for confirmation
			<div>
				<router-link :to="{name: 'home'}">Go home</router-link>
			</div>
		</div>
	</div>
</template>

<style lang="stylus" scoped>
	@import "~@/vars"

	.success-page
		padding $page-padding
		.success-page_content
			border 1px solid $lighten-4
			padding 25px
			text-align center
			width 500px
			margin 0 auto

</style>
