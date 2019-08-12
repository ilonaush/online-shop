<template>
	<div class="reviews-section">
		<div class="reviews">
			<div class="reviews_title">
				REVIEWS
			</div>
			<div class="review" :key="review.id" v-for="review in reviews">
				<div class="review-author-section">
					<div class="review-author">
						{{review.reviewer}}
					</div>
					<div>
						<star-rating :starQuantity="review.mark"></star-rating>
					</div>
				</div>
				<div class="review-text">
					{{review.review}}
				</div>
			</div>
		</div>
		<add-review-form :productId="productId" v-on:reviewAdd="handleReviewAdding"/>
	</div>
</template>

<script lang="ts">
	import Vue, {PropType} from "vue";
	import AddReviewForm from "@/components/add-review-form/add-review-form.vue";
	import VButton from "@/components/v-button/v-button.vue";
	import StarRating from "@/components/star-rating/star-rating.vue";
	import {Product} from "@/interfaces";

	export default Vue.extend({
		props: {
			reviews: Array as PropType<Product.IReview[]>,
			productId: Number,
			getReviews: Function
		},
		components: {
			StarRating,
			AddReviewForm,
			VButton
		},
		methods: {
			handleReviewAdding() {
				this.$emit("reviewAdd");
			}
		}
	});
</script>

<style lang="stylus">

	@import "~@/vars"
	.reviews-section
		width 700px
		display flex
		.reviews
			flex 1

	.reviews_title
		text-transform uppercase
		font-size 26px

	.review
		display flex
		.review-author-section
			padding 20px
			border-right: 1px solid $milk
			.review-author
				margin-bottom 10px
		.review-text
			padding 20px
</style>
