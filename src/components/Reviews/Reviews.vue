<template>
    <div class="reviews">
        <div  class="review" :key="review.id" v-for="review in reviews">
            <div class="review-author">
                {{review.reviewerName}}
                <star-rating :starQuantity="review.mark"></star-rating>
            </div>
            <div class="review-text">
                {{review.reviewText}}
            </div>
            <div class="review">
                <strong>advantages:</strong> {{review.advantages}}
            </div>
            <div class="review">
                <strong>disadvantages:</strong> {{review.disadvantages}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductCard from "../Product/ProductCard.vue";
    import {IReview} from "../Product/interfaces";
    import StarRating from "@/components/StarRating/StarRating.vue";

    //functional component
    export default Vue.extend({
        functional: true,
        props: {
            reviews: Array as () => IReview[]
        },
        components: {
            StarRating
        }
    })
</script>

<style lang="stylus">
</style>
