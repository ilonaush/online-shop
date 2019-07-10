<template>
    <div class="product-list">
        <div class="product-card-holder" v-for="product in products"
             :key="product.id">
            <product-card :product="product"></product-card>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ProductCard from "../ProductCard/ProductCard.vue";

    @Component({
        components: {ProductCard},
    })
    export default  Vue.extend({
        props: {
            products: Array
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

