<template>
    <v-card class="product-card" flat>
            <img  class="product-card-image" :src="product.mainImage"/>
            <div class="stars">
                <star-rating :starQuantity="product.rating"/>
            ({{product.reviews.length}} reviews)
            </div>
            <v-card-text>{{ product.name }}</v-card-text>
            <v-card-text>{{ product.price }}</v-card-text>
            <u-i-button color="primary" v-on:click.native="handleAddToCartClick" class="add-cart-btn">Add to cart</u-i-button>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {IProduct} from "./interfaces";
    import {createNamespacedHelpers} from "vuex";
    import StartRating from "../StarRating/StartRating.vue";
    import UIButton from "@/components/Button/Button.vue";

    const { mapMutations } = createNamespacedHelpers("cartModule/");

    interface IProductCard {
        addItemToCart: (item: {id: number, quantity: number, name: string, price: number}) => void;
    }

    @Component({
        components: {
            "star-rating": StartRating,
            UIButton
        },
        methods: {
            ...mapMutations(["addItemToCart"]),
        }
    })
    export default class ProductCard extends Vue implements  IProductCard {
        @Prop({type: Object as () => IProduct}) product!: IProduct;
        addItemToCart!: (item: {id: number, quantity: number, name: string, price: number}) => void;

        handleAddToCartClick() {
            this.addItemToCart({id: this.product.id, quantity: 1, name: this.product.name, price: this.product.price});
        }
    }
</script>

<style lang="stylus" scoped>

    img
        max-width 100%
    .product-card-image
        height 45%
        display block
        margin 0 auto

    .product-card
        height 100%
        padding 15px
        .v-card__text
            padding 0
            height 60px

    .add-cart-btn
        margin 0 auto
        display block
</style>
