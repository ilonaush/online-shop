<template>
	<div :class="['product-list', className]">
		<div
			:class="['product-card-holder', className]"
			v-for="product in products"
			 :key="product.id">
				<product-card :product="product"></product-card>
		</div>
		<div v-if="!products.length">По заданным параметрам не найдена ни одна модель</div>
	</div>
</template>

<script lang="ts">
	import {Vue} from "vue-property-decorator";
	import ProductCard from "../product-card/product-card.vue";
	import {Product} from "@/interfaces";
	import {PropType} from "vue";

	export default Vue.extend({
		props: {
			products: Array as PropType<Product.IProduct[]>,
			className: {
				type: String,
				default: "grid"
			}
		},
		components: {
			ProductCard
		},
	});
</script>

<style lang="stylus">
	.header-navigation
		a
			display block
			margin-left auto
			.fa-shopping-cart, .fa-flower-tulip
				color white

	.product-list
		max-width 930px
		display flex
		width 100%
		flex-wrap wrap

		&.grid
			display flex
			width 100%
			flex-wrap wrap
			margin-left -20px

			.product-card-holder
				width calc(100% / 3)
		&.list
			.product-card-holder
				width 100%
				margin-bottom 10px
				height 340px

	.product-card-holder
		height 510px
		box-sizing border-box
</style>

