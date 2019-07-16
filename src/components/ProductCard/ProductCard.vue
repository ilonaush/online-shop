<template>
    <div class="product-card">
            <div class="product-card_image-holder">
                <router-link :to="{name: 'product', params: {product: product.id}}">
                    <img
                        class="product-card-image"
                        :src="product.images[0]"
                    />
                </router-link>
            </div>
        <div class="product-card_info">

            <div class="product-card_name">{{ product.name.toUpperCase() }}</div>

            <div class="product-card_price-section">
                <span :class="{'product-card_price': true, sale: product.oldPrice}">
                    {{product.price.toFixed(2)}} $
                </span>
                <span  v-if="product.oldPrice" class="product-card_oldPrice">
                    {{product.oldPrice.toFixed(2)}} $
                </span>
            </div>

            <div class="stars">
                <stars-rating :starQuantity="product.rating"/>
            </div>

            <v-button
                    v-if="!isInCart"
                    color="primary"
                    v-on:click="handleAddToCartClick"
                    class="add-cart-btn"
                    btnStyle="outline">
                <font-awesome-icon :icon="['fas', 'shopping-cart']"/>
            </v-button>
            <div v-else>added</div>

        </div>
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
        addItemToCart!: (item: {id: number, name: string, price: number, img: string, color: string, size: string, flower: string}) => void;

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
                img: this.product.images[0],
                size: this.product.sizes[0],
                color: this.product.colors[0],
                flower: this.product.availableFlowerType[0],
            });
        }
    }
</script>

<style lang="stylus" scoped>

    @import "~@/vars.styl"

    .product-card-holder
        &.list
            height 340px
            .product-card
                display flex
                padding 20px 0 0 0
                .product-card_info
                    margin-left 20px

    .product-card_image-holder
        height 340px
        background-color $milk
        .product-card-image
            display block
            margin 0 auto

    .product-card
        height 100%
        padding 15px
        text-align center

        .product-card_name
            margin 10px 0
            font-weight bold
        .product-card_price-section
            margin 10px 0

    .add-cart-btn
        margin 0 auto
        display block
        color $primary

</style>
