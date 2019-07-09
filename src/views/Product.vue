<template>
    <div class="product-page">
       <h2>{{product.name}}</h2>
        <div class="stars">
            <star-rating :starQuantity="product.rating"/>
            (<router-link to="#reviews">{{(product.reviews || []).length}} reviews</router-link>)
        </div>
        <tabs>
            <tab name="General" :defaultSelected="true">
                <div class="product-info">
                    <div class="product-img">
                        <img :src="product.mainImage" alt=""/>
                    </div>
                    <div class="product-details">
                        <div class="product_price">
                            <span :class="{'product_price': true, sale: product.oldPrice}">
                            {{product.price}} $
                            </span>
                            <span  v-if="product.oldPrice" class="product_oldPrice">
                            {{product.oldPrice}} $
                            </span>
                        </div>
                        <u-i-button color="primary">Add to cart</u-i-button>
                    </div>
                </div>
            </tab>
            <tab name="Features">
                <div class="product-info_table">
                    <div  class="product-info_table-row" v-if="cell.value" v-for="cell in tableCells">
                        <div class="product-info_table-title">
                            {{cell.title}}
                        </div>
                        <div class="product-info_table-value">
                            {{cell.value}}
                        </div>
                    </div>
                </div>
            </tab>
            <tab name="Reviews">
                <div class="product-info">
                  <reviews :reviews="product.reviews"/>
                </div>
            </tab>
        </tabs>
        <div class="other-products">
            <h4>Other products</h4>
            <product-list :products="$store.state['productsModule'].products.filter(p => p.id !== product.id)"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {createNamespacedHelpers} from "vuex";
    import { Component, Vue } from "vue-property-decorator";
    import {IProduct} from "@/components/Product/interfaces";
    import UIButton from "@/components/VButton/VButton.vue";
    import Tabs from "@/components/Tabs/Tabs.vue";
    import Tab from "@/components/Tabs/Tab.vue";
    import StarRating from "@/components/StarRating/StarRating.vue";
    import Reviews from "@/components/Reviews/Reviews.vue";
    import ProductList from "@/components/ProductList/ProductList.vue";

    const { mapMutations: mapCartMutations } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {ProductList, Reviews, StarRating, UIButton, Tabs, Tab},
        methods: {
            ...mapCartMutations(["addItemToCart"])
        }
    })
    export default class Product extends Vue{


        get product(): IProduct {
            return this.$store.state["productsModule"].products.find((product : IProduct) => {
                return product.id === +this.$route.params["product"]
            }) || {}
        }

        get tableCells() {
            return [
                {
                    title: 'Brand',
                    value: this.product.brand
                },{
                    title: 'Animal Type',
                    value: this.product.animalType
                },{
                    title: 'Category',
                    value: this.product.category
                },
            ]
        }


    }
</script>

<style lang="stylus">
    @import "../vars.styl";

    .product-page
        padding $page-padding
    .product-info
        display flex

    .product-details
        display flex
    .product-info_table
        max-width 600px
    .product-info_table-row
        display flex
        justify-content space-between

    .product_price
        &.sale
            color red
    .product_oldPrice
        position relative
        &:before
            content ''
            border-bottom 1px solid black
            width 100%
            position absolute
            right 0
            top 50%
</style>
