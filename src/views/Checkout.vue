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
                                {{item.quantity}} items
                            </div>
                            <div class="checkout-item_generalPrice">
                                {{(item.price * item.quantity).toFixed(2)}} $
                            </div>
                        </div>
                    </div>
                </div>
                Total: {{generalPrice}} $
            </div>
        </div>
        <u-i-button color="primary">Place the order</u-i-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import CheckoutForm from "@/components/Forms/CheckoutForm/CheckoutForm.vue";
    import UIButton from "@/components/Button/Button.vue";

    const { mapState, mapGetters } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {CheckoutForm, UIButton},
        computed: {
            ...mapState(['items']),
            ...mapGetters(['generalPrice'])
        }
    })
    export default class Checkout extends Vue {

    }
</script>

<style lang="stylus">
    .checkout-page_content
        display flex

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
