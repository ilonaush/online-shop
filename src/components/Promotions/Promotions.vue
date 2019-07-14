<template>
</template>

<script lang="ts">
    import  Vue from "vue";

    export default Vue.extend({
        components: {
            Carousel, Slide
        }
    })
</script>

<style lang="stylus">

    @import "../../vars.styl"

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
