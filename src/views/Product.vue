<template>
    <div class="product-page">
        <tabs>
            <tab className="product-tab" name="Info" :defaultSelected="true">
                <div class="images-holder">
                    <div class="images-thumbnails">
                        <div class="image-thumbnail"
                             v-for="(image, index) in product.images"
                             @click="setSelectedImage(index)">
                            <img :src="image" alt="">
                        </div>
                    </div>
                    <div class="selected-image">
                        <img :src="selectedImage" alt="">
                    </div>
                </div>
                <div class="product-info-holder">
                    <div class="product-details">
                        <div class="product_name"> {{product.name}}</div>
                        <div class="product_price-section">
                            <span :class="{'product_price': true, sale: product.oldPrice}">
                            {{product.price.toFixed(2)}} $
                            </span>
                            <span  v-if="product.oldPrice" class="product_oldPrice">
                            {{product.oldPrice.toFixed(2)}} $
                            </span>
                        </div>

                        <div class="product_color-section">
                            <div class="title">Color</div>
                            <div class="colors">
                                <div :class="['color', ...(selectedColor === color ? ['selected-color'] : [''])]"
                                     v-for="color in product.colors"
                                     :style="{backgroundColor: color}"
                                     v-on:click="setSelectedColor(color)">
                                </div>
                            </div>
                        </div>

                        <div class="product_size-section">
                            Size
                            <div class="sizes-holder">
                                <custom-select className="sizes" :options="availableSizes" v-on:change="setSelectedSize"/>
                            </div>
                        </div>

                        <div class="product_flower-section">
                            Flower
                            <div class="flower-holder">
                                <custom-radiobutton
                                        v-model="selectedFlower"
                                        v-for="flower in product.availableFlowerType"
                                        name="flower"
                                        :label="flower"
                                        :value="flower"
                                        :checked="flower === selectedFlower"
                                />
                            </div>
                        </div>
                        <v-button v-if="!isInCart" color="primary" v-on:click="handleAddToCartClick">Add to cart</v-button>
                        <div v-else>added</div>
                        <div class="stars">
                            <star-rating :starQuantity="product.rating"/>
                            (<router-link to="#reviews">{{(product.reviews || []).length}} reviews</router-link>)
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
            <h4>OTHER PRODUCTS IN THE SAME CATEGORY</h4>
            <product-list :products="$store.state['productsModule'].products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {createNamespacedHelpers} from "vuex";
    import { Component, Vue, Watch } from "vue-property-decorator";
    import VButton from "@/components/VButton/VButton.vue";
    import Tabs from "@/components/Tabs/Tabs.vue";
    import Tab from "@/components/Tabs/Tab.vue";
    import StarRating from "@/components/StarRating/StarRating.vue";
    import Reviews from "@/components/Reviews/Reviews.vue";
    import ProductList from "@/components/ProductList/ProductList.vue";
    import CustomSelect from "@/components/CustomSelect/CustomSelect.vue";
    import CustomRadiobutton from "@/components/CustomRadiobutton/CustomRadiobutton.vue";
    import {Product} from "@/interfaces";

    import IProduct = Product.IProduct;

    const { mapMutations: mapCartMutations } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {
            ProductList,
            Reviews,
            StarRating,
            VButton,
            Tabs,
            Tab,
            CustomRadiobutton,
            CustomSelect
        },
        methods: {
            ...mapCartMutations(["addItemToCart"])
        }
    })
    export default class ProductPage extends Vue {
        selectedImage: string = "";
        selectedColor: string = '';
        selectedSize: string = '';
        selectedFlower: string = '';
        addItemToCart!: (item: {id: number, name: string, price: number, img: string, color: string, size: string, flower: string}) => void;
        availableSizes: any[] = [];


        get isInCart() {
            return !!this.$store.state["cartModule"].items.find((product : IProduct) => {
                return product.id === +this.$route.params["product"]
            })
        }

        get product(): IProduct {
            return this.$store.state["productsModule"].products.find((product : IProduct) => {
                return product.id === +this.$route.params["product"]
            })
        }

        @Watch('product')
        setInitialProductValues () {
            this.availableSizes = this.product.sizes.map((size) => ({title: size, value: size}))
            this.selectedImage = this.product.images[0];
            this.selectedColor = this.product.colors[0];
            this.selectedSize = this.product.sizes[0];
            this.selectedFlower = this.product.availableFlowerType[0];
        }

        handleAddToCartClick() {
            this.addItemToCart({
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                img: this.product.images[0],
                color: this.selectedColor,
                size: this.selectedSize,
                flower: this.selectedFlower
            });
        }

        setSelectedImage(index: number) {
            this.selectedImage = this.product.images[index];
        }

        setSelectedColor(color: string) {
            this.selectedColor = color;
        }

        setSelectedSize(size: string) {
            this.selectedSize = size;
        }

    }
</script>

<style lang="stylus">
    @import "../vars.styl";

    .product-page
        padding $page-padding
        .product-list
            max-width 1100px
            margin 0 auto
            .product-card-holder
                width 24%
    .product_name
        margin-top 30px
        font-weight 500
        text-transform uppercase
        font-size 26px

    .product-tab
        display flex
    .images-holder
        display flex
        height 700px
        width 660px
        .image-thumbnail
            background-color $milk
            width 80px
            height 80px
            text-align center
            margin-bottom 10px
            img
                width 100%
                object-fit cover
        .selected-image
            background-color $milk
            margin-left 20px
    .product-info-holder
        padding 0 30px

    .product_color-section
        margin 20px 0
        .colors
            display flex
            .color
                width 30px
                cursor pointer
                height 30px
                border-radius 50%
                margin 5px 10px
                margin-left 0
                &.selected-color
                    border 1px solid black
    .product_flower-section
        margin 20px 0
        .flower-holder
            display flex
            .input-holder
                margin 5px
                &:first-child
                    margin-left 0


</style>
