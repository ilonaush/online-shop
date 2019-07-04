<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="cart-modal">
        <modal>
            <template v-slot:header>Cart</template>
            <template v-slot:body>
                <div v-if="items.length > 0">
                    <product-cart-item  v-for="cartItem in items" :cartItem="cartItem"/>
                </div>
                <div v-else>Cart is empty</div>
            </template>
            <template v-if="items.length" v-slot:footer>
                <div class="cart_footer">
                    <div class="cart_total-sum">
                        Total: {{generalPrice.toFixed(2)}} $
                    </div>
                    <div class="cart_controls">
                        <u-i-button @click="closeCartModal" color="primary">Go on shopping</u-i-button>
                        <router-link :to="{name: 'checkout'}" >Place order</router-link>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import ProductCartItem from "@/components/Cart/ProductCartItem/ProductCartItem.vue";
    import Modal from "../Modal.vue";
    import UIButton from "@/components/Button/Button.vue";
    import {ICartModuleState} from "@/store/interfaces";

    const { mapState: mapCartState, mapGetters} = createNamespacedHelpers("cartModule/");

    @Component({
        components: {
            ProductCartItem,
            Modal,
            UIButton
        },
        computed: {
            ...mapCartState<ICartModuleState>({
                items: state => state.items,
            }),
            ...mapGetters(['generalPrice'])
        }
    })
    export default class Cart extends Vue {

        closeCartModal() {
            window.location.hash = "";
        }
    }
</script>

<style lang="stylus">
    .cart-modal
        .modal
            min-width 700px
    .cart_footer
        width 100%
        .cart_total-sum
            text-align right
    .cart_controls
        display flex
        justify-content space-between
</style>
