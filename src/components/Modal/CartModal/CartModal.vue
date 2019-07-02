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
                        Total: {{totalSum.toFixed(2)}} $
                    </div>
                    <div class="cart_controls">
                        <u-i-button @click="closeCartModal" color="primary">Go on shopping</u-i-button>
                        <u-i-button @click="openPlaceOrderModal" color="primary">Place order</u-i-button>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import {ICartModule} from "@/store/interfaces";
    import ProductCartItem from "@/components/Cart/ProductCartItem/ProductCartItem.vue";
    import Modal from "../Modal.vue";
    import UIButton from "@/components/Button/Button.vue";
    import {MODAL_TYPE} from "@/store/enums";

    const { mapState: mapCartState} = createNamespacedHelpers("cartModule/");

    @Component({
        components: {
            ProductCartItem,
            Modal,
            UIButton
        },
        computed: {
            ...mapCartState<ICartModule>({
                items: state => state.items,
                totalSum: state => state.items.reduce((accSum, currentItem) => accSum + (currentItem.price * currentItem.quantity), 0)
            }),
        }
    })
    export default class Cart extends Vue {
        closeCartModal() {
            this.$store.commit("toggleModal", {isShown: false, type: null})
        }
        openPlaceOrderModal() {
            this.$store.commit("toggleModal", {isShown: true, type: MODAL_TYPE.checkout})
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
