<template>
    <div class="product-list">
        <div v-for="product in products"
             :key="product.id">
            <product-card :product="product"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductCard from "../Product/ProductCard.vue";

    @Component({
        components: {ProductCard},
    })
    export default class ProductList extends Vue {
        @Prop(Array) products!: object[];

        created() {
            console.log("mount product list");
            console.log(this.products);
        }
        updated() {
            console.log("updated product list");
            console.log(this.products);
        }
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

