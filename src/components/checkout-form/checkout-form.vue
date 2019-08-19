<template>
	<form>
		<custom-input label="Name" v-model="name"></custom-input>
		<custom-input label="Surname" v-model="surname"></custom-input>
		<custom-input label="City" v-model="city"></custom-input>
		<custom-input label="Address" v-model="address"></custom-input>
	</form>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	import CustomInput from "@/components/custom-input/custom-input.vue";
	import VButton from "@/components/v-button/v-button.vue";

	@Component({
		components: {
			CustomInput, VButton
		},
	})
	export default class CheckoutForm extends Vue {
		name: string = "";
		surname: string = "";
		city: string = "";
		address: string = "";
	}
</script>
