<template>
    <form class="addReviewForm" @submit="handleAddReviewFormSubmit">
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
        <v-button color="primary" type="submit">Send</v-button>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import CustomInput from "@/components/custom-input/custom-input.vue";
    import VButton from "@/components/v-button/v-button.vue";
    import StarRating from "@/components/star-rating/star-rating.vue";

    const {mapMutations} = createNamespacedHelpers("cartModule/");

    @Component({
        components: {CustomInput, VButton, StarRating},
        methods: {
            ...mapMutations(["resetCart"])
        }
    })
    export default class CheckoutForm extends Vue {
        name: string = "";
        mark: number = 0;
        review: string = "";

        setMark(mark) {
            this.mark = mark;
        }

        async handleAddReviewFormSubmit(e) {
            const variables = {
                review: this.review,
                reviewer: this.name,
                mark: this.mark
            };

            e.preventDefault();
        }
    }
</script>

<style lang="stylus">
    .addReviewForm
        width 40%
        textarea
            width 100%
</style>
