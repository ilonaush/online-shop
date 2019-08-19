<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div class="cart-modal">
		<v-modal>
			<template v-slot:header>Cart</template>

			<template v-slot:body>
				<div v-if="items.length > 0">
					<product-cart-item :key="cartItem.id" v-for="cartItem in items" :cartItem="cartItem"/>
				</div>
				<div v-else>Cart is empty</div>
			</template>

			<template v-if="items.length" v-slot:footer>
				<div class="cart-footer">
					<div class="cart-total-sum">
						Total: {{generalPrice.toFixed(2)}} $
					</div>
					<div class="cart-controls">
						<router-link class="btn-like shopping-link" :to="{name: 'catalogue',  params: { category: 'indoor'}}">Go on shopping</router-link>
						<router-link class="btn-like place-order-link" :to="{name: 'checkout'}">Place order</router-link>
					</div>
				</div>
			</template>
		</v-modal>
	</div>
</template>

<script lang="ts">
	import {Vue} from "vue-property-decorator";
	import {createNamespacedHelpers} from "vuex";
	import ProductCartItem from "@/components/product-cart-item/product-cart-item.vue";
	import VModal from "../v-modal.vue";
	import VButton from "@/components/v-button/v-button.vue";
	import {ICartModuleState} from "@/store/interfaces";
	import {closeModal} from "@/services/RouteService";

	const {mapState: mapCartState, mapGetters} = createNamespacedHelpers("cartModule/");

	export default Vue.extend({
		components: {
			ProductCartItem,
			VModal,
			VButton
		},
		computed: {
			...mapCartState<ICartModuleState>({
				items: (state) => state.items,
			}),
			...mapGetters(["generalPrice"])
		},
		methods: {
			closeModal
		}
	});
</script>

<style lang="stylus" scoped>

	@import "~@/vars"

	.cart-modal
		.modal
			min-width 700px

	.cart-footer
		width 100%
		.cart-total-sum
			text-align right

	.cart-controls
		display flex
		justify-content space-between
		align-items center
		.place-order-link, .shopping-link
			&.btn-like
				color white
				background-color $lighten-2
</style>
