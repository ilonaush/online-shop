<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="cart-modal">
        <modal>
            <template v-slot:header>Cart</template>
            <template v-slot:body>
                <div v-if="items.length > 0">
                    <product-cart-item  :key="cartItem.id" v-for="cartItem in items" :cartItem="cartItem"/>
                </div>
                <div v-else>Cart is empty</div>
            </template>
            <template v-if="items.length" v-slot:footer>
                <div class="cart_footer">
                    <div class="cart_total-sum">
                        Total: {{generalPrice.toFixed(2)}} $
                    </div>
                    <div class="cart_controls">
                        <v-button @click="closeModal" color="primary">Go on shopping</v-button>
                        <router-link :to="{name: 'checkout'}" >Place order</router-link>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {createNamespacedHelpers, mapMutations} from "vuex";
    import ProductCartItem from "@/components/ProductCartItem/ProductCartItem.vue";
    import Modal from "../Modal.vue";
    import VButton from "@/components/VButton/VButton.vue";
    import {ICartModuleState} from "@/store/interfaces";
    import {closeModal} from "@/views/RouteService";

    const { mapState: mapCartState, mapGetters} = createNamespacedHelpers("cartModule/");

    @Component({
        components: {
            ProductCartItem,
            Modal,
            VButton
        },
        computed: {
            ...mapCartState<ICartModuleState>({
                items: state => state.items,
            }),
            ...mapGetters(['generalPrice'])
        },
        methods: {
            closeModal: closeModal
        }
    })
    export default class Cart extends Vue {
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
