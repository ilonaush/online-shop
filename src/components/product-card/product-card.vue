<template>
	<div class="product-card">
		<div class="product-card_image-holder">
			<router-link :to="{name: 'product', params: {product: product.id}}">
				<img
					class="product-card-image"
					:src="product.images[0]"
				/>
			</router-link>
		</div>
		<div class="product-card_info">

			<div class="product-card_name">{{ product.name.toUpperCase() }}</div>

			<div class="product-card_price-section">
				<span :class="{'product-card_price': true, sale: product.oldPrice}">
						{{product.price.toFixed(2)}} $
				</span>
				<span v-if="product.oldPrice" class="product-card_oldPrice">
					{{product.oldPrice.toFixed(2)}} $
				</span>
			</div>

			<div class="stars">
				<stars-rating :starQuantity="product.rating"/>
			</div>

			<v-button
				color="primary"
				v-on:click="handleAddToCart"
				class="add-cart-btn"
				btnStyle="outline">
					<font-awesome-icon :icon="['fas', 'shopping-cart']"/>
			</v-button>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from "vue-property-decorator";
	import {createNamespacedHelpers} from "vuex";
	import StarsRating from "@/components/star-rating/star-rating.vue";
	import VButton from "@/components/v-button/v-button.vue";
	import {Product, Cart} from "@/interfaces";

	const {mapActions: mapCartActions} = createNamespacedHelpers("cartModule/");

	@Component({
		components: {
			StarsRating,
			VButton
		},
		methods: {
			...mapCartActions(["checkItemExistenceInCart"]),
		}
	})
	export default class ProductCard extends Vue {
		@Prop({type: Object as () => Product.IProduct}) product!: Product.IProduct;
		checkItemExistenceInCart!: (item: Omit<Cart.ICartItem, "quantity">) => void;

		/**
		 * checks if item already added and if not adds item to the cart
		 */
		handleAddToCart() {
			this.checkItemExistenceInCart({
				id: `${this.product.id}-${this.product.colors[0]}-${this.product.availableFlowerType[0]}-${this.product.sizes[0]}`,
				name: this.product.name,
				price: this.product.price,
				img: this.product.images[0],
				size: this.product.sizes[0],
				color: this.product.colors[0],
				flower: this.product.availableFlowerType[0],
			});
		}
	}
</script>

<style lang="stylus" scoped>

	@import "~@/vars"

	.product-card-holder
		&.list
			height 340px
			.product-card
				display flex
				padding 20px 0 0 0
				.product-card_info
					margin-left 20px
					width 300px
		&.grid
			height 340px
			.product-card_image-holder
				display flex
				align-items center

	.product-card_image-holder
		height 340px
		background-color $milk
		@media(max-width 992px)
			height 300px

		.product-card-image
			display block
			margin 0 auto

	.product-card_info
		height 170px
		display flex
		align-items center
		flex-direction column
		justify-content space-between

	.product-card
		height 100%
		padding 15px
		text-align center

		.product-card_name
			margin 10px 0
			font-weight bold
			height 40px
		.product-card_price-section
			margin 10px 0

	.add-cart-btn
		margin 0 auto
		display block
		color $primary

	.added-product
		background-color white
		border 2px solid  $lighten-4
		width 90px
		padding 6px 0
		margin 6px auto
</style>
