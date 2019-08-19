<template>
	<div v-if="isNotificationShown" class="notification">
		{{message}}
		<v-button
			@click="openModal(modalType.cart)"
			class="go-cart-btn"
			color="primary">
				Go to cart
		</v-button>
	</div>
</template>

<script lang="ts">
	import {Component, Vue, Watch} from "vue-property-decorator";
	import {createNamespacedHelpers} from "vuex";
	import VButton from "@/components/v-button/v-button.vue";
	import {MODAL_TYPE} from "@/store/enums";
	import {openModal} from "@/services/RouteService";

	const {mapMutations: mapCartMutations} = createNamespacedHelpers("cartModule/");

	@Component({
		components: {
			VButton
		},
		methods: {
			...mapCartMutations(["deleteFirstNotification"]),
			openModal
		},
	})
	export default class Notification extends Vue {
		message: string = "";
		timer: number = 0;
		deleteFirstNotification!: () => void;
		isNotificationShown: boolean = false;
		modalType = MODAL_TYPE;

		get notifications() {
			return this.$store.state.cartModule.notifications;
		}

		@Watch("notifications", {immediate: true, deep: true})
		/**
		 * shows first notification available in the queue
		 */
		toggleNotification(val: string[]) {
			if (val && val.length) {
				this.message = this.notifications[0];
				this.showNotification();
			}
		}

		/**
		 * hides cart notification
		 */
		hideNotification() {
			this.isNotificationShown = false;
			this.deleteFirstNotification();
		}

		/**
		 * shows notification and sets its hiding
		 */
		showNotification() {
			clearTimeout(this.timer);
			this.isNotificationShown = true;
			this.timer = setTimeout(() => this.hideNotification(), 3000);
		}
	}
</script>

<style lang="stylus">
	.notification
		border 1px solid pink
		background-color white
		position fixed
		bottom 10%
		border-radius 10px
		padding 15px
		transform translateY(-50%)
		right 0
		z-index 999
		min-width 300px
		max-width 400px

		.go-cart-btn
			display block
</style>

