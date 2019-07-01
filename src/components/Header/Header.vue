<template>
    <div class="header">
        <router-link class="logo-icon" to="/">
            <font-awesome-icon :icon="['fas', 'paw']" size="2x"/>
        </router-link>
        <h4>Online Pet Shop</h4>
        <u-i-button color="primary" class="catalogue-btn" @click.native="isCatalogueListShown = !isCatalogueListShown">
            Catalogue
            <div v-if="isCatalogueListShown" class="catalogue-list">
                <router-link v-for="item in menuItems" :to="{ name: 'catalogue', params: { category: item.toLowerCase() }}">
                    {{item}}
                </router-link>
            </div>
        </u-i-button>
        <div class="cart-icon">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" size="2x"/>
            <span class="cart-quantity">{{quantity}}</span>
            <div class="cart-info">
                <span v-if="quantity > 0">
                    There is {{quantity}} items for {{generalPrice}} $
                    <u-i-button color="primary">Check out</u-i-button>
                     <span class="line"></span>
                    <u-i-button color="primary" @click.native="openCartModal">Go to cart</u-i-button>
                </span>
                <span v-else>
                    У вашому кошику ше немає замовлень
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import Notification from "@/components/Notification/Notification.vue";
    import UIButton from "@/components/Button/Button.vue";
    import {ICartModule} from "@/store/interfaces";

    const { mapState } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {Notification, UIButton},
        computed: {
            ...mapState<ICartModule>({
                quantity: state => state.quantity,
                generalPrice: state => state.generalPrice,
            })
        }
    })
    export default class Header extends Vue {
        menuItems: string[] = ["Food", "Toys", "Bath"];
        isCatalogueListShown: boolean = false;

        openCartModal() {
            this.$store.commit('toggleModal', true);
        }
    }
</script>

<style lang="stylus">
    @import "../../vars.styl"
    .header
        display flex
        height 65px
        align-items center
        padding 0 10px
        background-color $lighten-3
        position relative
        z-index 2
        .fa-shopping-cart, .fa-paw
            color white
    .logo-icon
        display flex
        align-items center
        color black
        padding 0 10px


    .catalogue-list
        position absolute
        background-color white
        top 200%
        left 0
        min-width 300px
        a
            display block
    .cart-icon
        position relative
        cursor pointer
        margin-left auto
        padding 0 20px
        &:hover
         .cart-info
            display block
        .cart-quantity
            position absolute
            background-color aquamarine
            border-radius 50%
            height 20px
            text-align center
            width 20px
        .cart-info
            background-color white
            cursor auto
            color black
            display none
            border pink
            position absolute
            top 150%
            right 0
            min-width 300px
            min-height 50px
            padding 10px
            button
                display block
                margin 5px auto
</style>
