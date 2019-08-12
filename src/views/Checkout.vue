<template>
	<div class="checkout-page">
		<h4>Placing the order</h4>
		<div class="checkout-page_content">
			<checkout-form/>
			<div class="checkout-items">
				<div class="checkout-item" v-for="item in items">
					<div class="checkout-item_img">
						<img :src="item.img" alt="">
					</div>
					<div class="checkout-item_info">
						<div class="checkout-item_title">
							{{item.name}}
						</div>
						<div class="checkout-item_price">
							<div class="checkout-item_quantity">
								{{item.quantity}} {{'item' | pluralize(item.quantity)}}
							</div>
							<div class="checkout-item_generalPrice">
								{{(item.price * item.quantity).toFixed(2)}} $
							</div>
						</div>
					</div>
				</div>
				Total: {{generalPrice.toFixed(2)}} $
				<v-button block color="primary" @click="openModal(modalType.cart)">Edit order</v-button>
			</div>
		</div>
		<v-button v-on:click="placeOrder" color="primary">Place the order</v-button>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {createNamespacedHelpers} from "vuex";
	import CheckoutForm from "@/components/checkout-form/checkout-form.vue";
	import VButton from "@/components/v-button/v-button.vue";
	import {MODAL_TYPE} from "../store/enums";
	import {openModal} from "@/services/RouteService";

	const {mapState, mapGetters} = createNamespacedHelpers("cartModule/");

	@Component({
		components: {CheckoutForm, VButton},
		computed: {
			...mapState(["items"]),
			...mapGetters(["generalPrice"])
		},
		methods: {
			openModal
		}
	})
	export default class Checkout extends Vue {
		modalType = MODAL_TYPE;

		placeOrder() {
			console.log("meow");
		}
	}
</script>

<style lang="stylus">
	@import "~@/vars";

	.checkout-page
		padding $page-padding

	.checkout-page_content
		display flex
		justify-content space-between
		max-width 700px
		border 2px solid $lighten-4
		padding 15px

	.checkout-items
		border 2px solid $lighten-2
		padding 15px

	.checkout-item
		display flex

	.checkout-item_img
		width 60px
		height 60px
		img
			max-width 100%
			max-height 100%
</style>
