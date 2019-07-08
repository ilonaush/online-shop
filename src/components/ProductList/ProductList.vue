<template>
    <div class="product-list">
        <div class="product-card-holder" v-for="product in products"
             :key="product.id">
            <product-card :product="product"/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import ProductCard from "../Product/ProductCard.vue";
    import {IProduct} from "../Product/interfaces";

    //functional component
    export default Vue.extend({
        functional: true,
        props: {
            products: Array as () => IProduct[]
        },
        components: {
            ProductCard
        }
    })

</script>

<style lang="stylus">
    .header-navigation
        a
            display block
            margin-left auto
            .fa-shopping-cart, .fa-flower-tulip
                color white
    .v-toolbar__items
        a
            height 100%

    .product-list
        max-width 930px
        display flex
        width  100%
        flex-wrap wrap
    .product-card-holder
        margin 5px
        height 430px
        width 30%
</style>

