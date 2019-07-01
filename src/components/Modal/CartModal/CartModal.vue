<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="cart-modal" v-show="showModal">
        <modal>
            <template v-slot:header>Cart</template>
            <template v-slot:body>
                <product-cart-item v-if="cartProducts.length" v-for="product in cartProducts" :product="product"/>
                <div v-else>Cart is empty</div>
            </template>
        </modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {createNamespacedHelpers, mapState} from "vuex";
    import {ICartModule, IProductsModule, IStore} from "@/store/interfaces";
    import ProductCartItem from "@/components/Cart/ProductCartItem/ProductCartItem.vue";
    import Modal from "../Modal.vue";

    const { mapState: mapCartState} = createNamespacedHelpers("cartModule/");
    const { mapState: mapProductsState} = createNamespacedHelpers("productsModule/");

    @Component({
        components: {
            ProductCartItem,
            Modal
        },
        computed: {
            ...mapCartState<ICartModule>({
                items: state => state.items
            }),
            ...mapProductsState<IProductsModule>({
                products: state => state.products
            }),
            ...mapState<IStore>({
                showModal: state => {console.log(state); return state.modalModule.showModal}
            }),
        }
    })
    export default class Cart extends Vue {

        get cartProducts() {
            return this.products.filter(product => this.items.includes(product.id));
        }

    }
</script>

<style lang="stylus">

</style>
