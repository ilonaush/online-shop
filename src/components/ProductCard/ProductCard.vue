<template>
    <div class="product-card">
            <div class="product-card_image-holder">
                <router-link :to="{name: 'product', params: {product: product.id}}">
                    <img  class="product-card-image" :src="product.mainImage"/>
                </router-link>
            </div>
            <div class="stars">
                <stars-rating :starQuantity="product.rating"/>
            ({{product.reviews.length}} reviews)
            </div>
            <div>{{ product.name }}</div>
            <div>
                <span :class="{'product-card_price': true, sale: product.oldPrice}">
                    {{product.price}} $
                </span>
                <span  v-if="product.oldPrice" class="product-card_oldPrice">
                    {{product.oldPrice}} $
                </span>
            </div>
            <v-button v-if="!isInCart" color="primary" v-on:click="handleAddToCartClick" class="add-cart-btn">Add to cart</v-button>
            <div v-else>added</div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import StarsRating from "@/components/StarRating/StarRating";
    import VButton from "@/components/VButton/VButton";
    import {Product} from "@/interfaces";

    const { mapMutations } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {
            StarsRating,
            VButton
        },
        methods: {
            ...mapMutations(["addItemToCart"]),
        }
    })
    export default class ProductCard extends Vue {
        @Prop({type: Object as () => Product.IProduct}) product!: Product.IProduct;
        addItemToCart!: (item: {id: number, name: string, price: number, mainImage: string}) => void;

        get isInCart() {
            return !!this.$store.state["cartModule"].items.find((product : Product.IProduct) => {
                return product.id === this.product.id;
            })
        }

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
