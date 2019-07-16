<template>
    <div class="reviews">
        <div class="reviews_title">
            REVIEWS
        </div>
        <div class="review" :key="review.id" v-for="review in reviews">
            <div class="review-author-section">
                <div class="review-author">
                    {{review.reviewerName}}
                </div>
                <div>
                    <star-rating :starQuantity="review.mark"></star-rating>
                </div>
            </div>
            <div class="review-text">
                {{review.reviewText}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import  Vue, {PropType} from "vue";
    import StarRating from "@/components/StarRating/StarRating.vue";
    import {Product} from "../../interfaces";

    export default Vue.extend({
        props: {
            reviews: Array as PropType<Product.IReview[]>
        },
        components: {
            StarRating
        }
    })
</script>

<style lang="stylus">

    @import "~@/vars.styl"

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
