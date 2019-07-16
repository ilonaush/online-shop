<template>
    <div class="header">
        <router-link class="logo-icon" to="/">
            <img src="@/assets/images/flora-flower.svg" alt="">
        </router-link>
        <h4>Flora</h4>
        <v-button
            color="primary"
            class="catalogue-btn"
            v-on:click="isCatalogueListShown = !isCatalogueListShown">
            Catalogue
            <div
                v-if="isCatalogueListShown"
                class="catalogue-list">
                <router-link
                    v-for="item in menuItems"
                    :to="{ name: 'catalogue', params: { category: item.split(' ')[0].toLowerCase() }}">
                    {{item}}
                </router-link>
            </div>
        </v-button>
        <div class="cart-icon">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" size="2x"/>

            <span class="cart-quantity">{{generalQuantity}}</span>

            <div class="cart-info">
                <span v-if="generalQuantity > 0">
                    There is {{generalQuantity}} {{ 'item' | pluralize(generalQuantity) }}  for {{generalPrice}} $
                    <router-link :to="{name: 'checkout'}">Check out</router-link>
                     <span class="line"></span>
                    <v-button
                    color="primary"
                    v-on:click="openModal(modalType.cart)">
                        Go to cart
                    </v-button>
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
    import VButton from "@/components/VButton/VButton";
    import {MODAL_TYPE} from "@/store/enums";
    import {openModal} from "@/views/RouteService";

    const { mapGetters } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {Notification, VButton},
        computed: {
            ...mapGetters(["generalPrice", "generalQuantity"]),
        },
        methods: {
           openModal
        }
    })
    export default class Header extends Vue {
        isCatalogueListShown: boolean = false;
        menuItems: string[] = ["Indoor plants", "Outdoor plants"];
        modalType = MODAL_TYPE;
    }
</script>

<style lang="stylus">
    @import "~@/vars.styl"

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
        padding 0 10px
        width 50px
        color white

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
