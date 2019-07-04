<template>
    <v-card class="product-card" flat>
            <div class="product-card_image-holder">
                <router-link :to="{name: 'product', params: {product: product.id}}">
                    <img  class="product-card-image" :src="product.mainImage"/>
                </router-link>
            </div>
            <div class="stars">
                <stars-rating :starQuantity="product.rating"/>
            ({{product.reviews.length}} reviews)
            </div>
            <v-card-text>{{ product.name }}</v-card-text>
            <v-card-text>
                <span :class="{'product-card_price': true, sale: product.oldPrice}">
                    {{product.price}} $
                </span>
                <span  v-if="product.oldPrice" class="product-card_oldPrice">
                    {{product.oldPrice}} $
                </span>
            </v-card-text>
            <u-i-button color="primary" v-on:click.native="handleAddToCartClick" class="add-cart-btn">Add to cart</u-i-button>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {IProduct} from "./interfaces";
    import {createNamespacedHelpers} from "vuex";
    import StarsRating from "../StarRating/StarRating.vue";
    import UIButton from "@/components/Button/Button.vue";

    const { mapMutations } = createNamespacedHelpers("cartModule/");


    @Component({
        components: {
            StarsRating,
            UIButton
        },
        methods: {
            ...mapMutations(["addItemToCart"]),
        }
    })
    export default class ProductCard extends Vue  {
        @Prop({type: Object as () => IProduct}) product!: IProduct;
        addItemToCart!: (item: {id: number, name: string, price: number, mainImage: string}) => void;

        handleAddToCartClick() {
            this.addItemToCart({
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                mainImage: this.product.mainImage
            });
        }
    }
</script>

<style lang="stylus" scoped>

    img
        max-width 100%
    .product-card_image-holder
        height 45%
        .product-card-image
            display block
            margin 0 auto

    .product-card
        height 100%
        padding 15px
        .v-card__text
            padding 0

    .add-cart-btn
        margin 0 auto
        display block

    .product-card_price
        &.sale
            color red

    .product-card_oldPrice
        position relative
        &:before
            content ''
            border-bottom 1px solid black
            width 100%
            position absolute
            right 0
            top 50%
</style>
