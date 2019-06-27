<template>
    <div>
        <div v-for="product in productsList"
             :key="product.id">
            <product-card :product="product"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import RequestService from '../../services/RequestService'
    import ProductCard from "../Product/ProductCard";
    @Component({
        components: {ProductCard},
    })
    export default class ProductList extends Vue {
        @Prop(Array) products!: object[];
        productsList = this.products;
    }
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
</style>

