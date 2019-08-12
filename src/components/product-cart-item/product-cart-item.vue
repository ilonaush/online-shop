<template>
	<div class="cart-item">
		<div class="cart-item_remove" @click="removeCartItem">
			x
		</div>
		<div class="cart-item_img">
			<img :src="cartItem.img" alt="">
		</div>

		<div class="cart-item_info">

			<div class="cart-item_title">
				{{cartItem.name}}
			</div>
			<div class="description">
				{{cartItem.size}}, {{cartItem.color}}, {{cartItem.flower}}
			</div>
			<div class="cart-item_details">
				<div class="cart-item_price">
					{{cartItem.price}} $
				</div>
				<div class="cart-item_controls">
					<button v-on:click="itemQuantity--">-</button>
					<input type="number"
								 v-model.number="itemQuantity"
								 v-on:change="setQuantity">
					<button v-on:click="itemQuantity++">+</button>
				</div>
			</div>
		</div>

		<div class="cart-item-total_sum">
			{{(cartItem.quantity * cartItem.price).toFixed(2)}} $
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue, Prop, Watch} from "vue-property-decorator";
	import {Cart} from "@/interfaces";

	@Component
	export default class ProductCartItem extends Vue {
		@Prop({type: Object as () => Cart.ICartItem}) cartItem!: Cart.ICartItem;

		itemQuantity: number = this.cartItem.quantity || 0;

		@Watch("itemQuantity")
		setQuantity() {
			if (this.itemQuantity > 0) {
				this.$store.commit("cartModule/setCartItemQty", {id: this.cartItem.id, quantity: this.itemQuantity});
			} else {
				this.removeCartItem();
			}
		}

		removeCartItem() {
			this.$store.commit("cartModule/deleteItemFromCart", this.cartItem.id);
		}
	}
</script>

<style lang="stylus">
	.cart-item
		display flex
		border-color gray
		position relative
		padding 5px

	.cart-item_remove
		position absolute
		left 0
		top 0

	.cart-item_img
		width 150px

		img
			max-width 100%

	.cart-item_info
		padding 0 5px
		width 400px

	.cart-item_details
		display flex
		margin-top 5px

	.cart-item_price
		margin-right 5px

	.cart-item_controls
		button
			width 20px
			text-align center
			padding 1px 0

		input
			width 35px
			text-align center
			border-radius: 3px;
			flex: 1 0;
			vertical-align: top;
			// Firefox-specific hack
			-moz-appearance: textfield;

			&::-webkit-inner-spin-button
			&::-webkit-outer-spin-button
				-webkit-appearance: none;
				margin: 0;

			&:focus
				outline: 0;
				box-shadow: 0 0 0 0.2rem $link-color;

	.cart-item_title
		max-width 250px

	.cart-item-total_sum
		margin-left auto
		text-align right
		flex-grow 1
</style>
