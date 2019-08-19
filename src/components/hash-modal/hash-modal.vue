<template>
	<div>
		<cart-modal v-if="$route.hash === ('#' + modalType.cart)"/>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {MODAL_TYPE} from "@/store/enums";

	import CartModal from "@/components/v-modal/cart-modal/cart-modal.vue";

	@Component({
		components: {
			CartModal
		},
	})
	export default class ShopModals extends Vue {
		modalType = MODAL_TYPE;
	}
</script>
