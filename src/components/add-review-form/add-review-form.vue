<template>
	<form class="add-review_form" @submit.prevent="handleAddReviewFormSubmit">
		Give a feedback
		<custom-input label="Name" v-model="name"></custom-input>
		<div>
			Mark:
			<star-rating
				:starQuantity="mark"
				clickable
				v-on:starClick="setMark">
			</star-rating>
		</div>
		<label>
			<textarea v-model="review"></textarea>
		</label>
		<v-button color="primary">Send</v-button>
	</form>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from "vue-property-decorator";
	import {createNamespacedHelpers} from "vuex";

	import RequestService from "../../services/RequestService";

	import CustomInput from "@/components/custom-input/custom-input.vue";
	import VButton from "@/components/v-button/v-button.vue";
	import StarRating from "@/components/star-rating/star-rating.vue";

	const {mapMutations} = createNamespacedHelpers("cartModule/");

	@Component({
		components: {
			CustomInput,
			VButton,
			StarRating
		},
		methods: {
			...mapMutations(["resetCart"])
		}
	})
	export default class CheckoutForm extends Vue {
		@Prop(Number) productId!: number;
		name: string = "";
		mark: number = 0;
		review: string = "";

		/**
		 * sets mark of the reviewer to the product
		 * @param mark
		 */
		setMark(mark: number) {
			this.mark = mark;
		}

		/**
		 * resets form after sudmitting
		 */
		resetForm() {
			this.mark = 0;
			this.name = "";
			this.review = "";
		}

		/**
		 * handle adding new review to the product
		 */
		async handleAddReviewFormSubmit() {
			const variables = {
				id: Date.now(),
				productId: this.productId,
				review: this.review,
				reviewer: this.name,
				mark: this.mark
			};

			try {
				await RequestService.instance.post("/add-review", variables);
				this.resetForm();
				this.$emit("reviewAdd");
			} catch (e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.add-review_form
		width 40%
		textarea
			width 100%
			border 1px silid mediumaquamarine
</style>
