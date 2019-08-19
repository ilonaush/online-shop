<template>
	<div>
		<header-navigation/>
		<v-loader v-if="loading"/>
		<template v-else>
			<router-view/>
			<notification/>
			<shop-modals/> </template>
	</div>
</template>

<script>
	import Header from "./components/header/header";
	import Notification from "./components/notification/notification";
	import CartModal from "./components/v-modal/cart-modal/cart-modal";
	import ShopModals from "./components/hash-modal/hash-modal";
	import VLoader from "./components/v-loader/v-loader";
	import {createNamespacedHelpers} from "vuex";

	const {mapState} = createNamespacedHelpers("productsModule/");

	export default {
		name: "App",
		computed: {
			...mapState(["loading"])
		},
		components: {
			ShopModals,
			CartModal,
			VLoader,
			"header-navigation": Header,
			"notification": Notification,
		},
	};
</script>

