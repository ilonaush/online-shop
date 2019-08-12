<template>
	<form @submit.prevent="handleCheckoutFormSubmit">
		<custom-input label="Name" v-model="name"></custom-input>
		<custom-input label="Surname" v-model="surname"></custom-input>
		<custom-input label="City" v-model="city"></custom-input>
		<v-button color="primary" v-on:click="handleCheckoutFormSubmit">Submit</v-button>
	</form>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {createNamespacedHelpers} from "vuex";
	import CustomInput from "@/components/custom-input/custom-input.vue";
	import VButton from "@/components/v-button/v-button.vue";

	const {mapMutations} = createNamespacedHelpers("cartModule/");

	@Component({
		components: {CustomInput, VButton},
		methods: {
			...mapMutations(["resetCart"])
		}
	})
	export default class CheckoutForm extends Vue {
		name: string = "";
		surname: string = "";
		city: string = "";

		handleCheckoutFormSubmit() {
			this.resetCart();
			this.$router.push({name: "success"});
		}
	}
</script>
