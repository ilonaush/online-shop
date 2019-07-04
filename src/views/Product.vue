<template>
    <div class="product-page">
       <h2>{{product.name}}</h2>
        <div class="start">
            <star-rating :starQuantity="product.rating"/>
            (<router-link to="#reviews">{{(product.reviews || []).length}} reviews</router-link>)
        </div>
        <tabs>
            <tab name="General" :selected="true">
                <div class="product-info">
                    <div class="product-img">
                        <img :src="product.mainImage" alt=""/>
                    </div>
                    <div class="product-details">
                        <div class="product-price">{{product.price}} $</div>
                        <u-i-button color="primary">Add to cart</u-i-button>
                    </div>
                </div>
            </tab>
            <tab name="Features">
                <div class="product-info">
                    Meow
                </div>
            </tab>
            <tab name="Reviews">
                <div class="product-info">
                    Meow
                </div>
            </tab>
        </tabs>

    </div>
</template>

<script lang="ts">
    import {createNamespacedHelpers} from "vuex";
    import { Component, Vue } from "vue-property-decorator";
    import {IProduct} from "../components/Product/interfaces";
    import UIButton from "../components/Button/Button";
    import Tabs from "@/components/Tabs/Tabs";
    import Tab from "@/components/Tabs/Tab";
    import StarRating from "@/components/StarRating/StarRating";

    const { mapMutations: mapCartMutations } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {StarRating, UIButton, Tabs, Tab},
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
    }
</script>

<style lang="stylus">
    .product-info
        display flex

    .product-details
        display flex
</style>
