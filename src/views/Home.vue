<template>
	<div class="home-page">
		<h2>PROMOTION</h2>
		<product-list :products="promotionProducts"/>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import ProductList from "@/components/product-list/product-list.vue";
	import {createNamespacedHelpers} from "vuex";

	const {mapGetters} = createNamespacedHelpers("productsModule/");

	export default Vue.extend({
		components: {
			ProductList
		},
		computed: {
			...mapGetters(["promotionProducts"])
		}
	})

</script>

<style lang="stylus" scoped>
	@import "~@/vars";

	.home-page
		padding $page-padding
		.product-list
			max-width 1100px
			margin 0 auto
			.product-card-holder
				width 24%
		h2
			text-align center
</style>
