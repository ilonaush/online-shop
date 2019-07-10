<template>
    <div class="checkout-page">
        <h4>Placing the order</h4>
        <div class="checkout-page_content">
            <checkout-form/>
            <div class="checkout-items">
                <div class="checkout-item" v-for="item in items">
                    <div class="checkout-item_img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="checkout-item_info">
                        <div class="checkout-item_title">
                            {{item.name}}
                        </div>
                        <div class="checkout-item_price">
                            <div class="checkout-item_quantity">
                                {{item.quantity}} {{'item' | pluralize(item.quantity)}}
                            </div>
                            <div class="checkout-item_generalPrice">
                                {{(item.price * item.quantity).toFixed(2)}} $
                            </div>
                        </div>
                    </div>
                </div>
                Total: {{generalPrice}} $
                <v-button color="primary" @click="openModal(modalType.cart)">Edit order</v-button>
            </div>
        </div>
        <v-button color="primary">Place the order</v-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {createNamespacedHelpers, mapMutations} from "vuex";
    import CheckoutForm from "@/components/CheckoutForm/CheckoutForm.vue";
    import VButton from "@/components/VButton/VButton.vue";
    import {MODAL_TYPE} from "../store/enums";
    import {openModal} from "@/views/RouteService";

    const { mapState, mapGetters } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {CheckoutForm, VButton},
        computed: {
            ...mapState(['items']),
            ...mapGetters(['generalPrice'])
        },
        methods: {
            openModal: openModal
        }
    })
    export default class Checkout extends Vue {
        modalType = MODAL_TYPE;
    }
</script>

<style lang="stylus">
    @import "../vars.styl";

    .checkout-page
        padding $page-padding
    .checkout-page_content
        display flex
        justify-content space-between

    .checkout-items
        border 1px solid aquamarine

    .checkout-item
        display flex
    .checkout-item_img
        width 60px
        height 60px
        img
            max-width 100%
            max-height 100%
</style>
