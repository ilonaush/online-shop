<template>
    <v-toolbar color="primary" dark class="header-navigation">
        <router-link to="/"><font-awesome-icon :icon="['fas', 'paw']" size="2x"/></router-link>
        <v-toolbar-title>Online Pet Shop</v-toolbar-title>
        <v-toolbar-items>
            <v-btn class="catalogue-btn" flat v-on:click="isCatalogueListShown = !isCatalogueListShown">
                Catalogue
                <div v-if="isCatalogueListShown" class="catalogue-list">
                    <router-link v-for="item in menuItems" :to="{ name: 'catalogue', params: { category: item.toLowerCase() }}">
                        {{item}}
                    </router-link>
                </div>
            </v-btn>
        </v-toolbar-items>
        <v-spacer/>
        <div class="cart-icon">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" size="2x"/>
            <span class="cart-quantity">{{quantity}}</span>
            <div class="cart-info">
                <span v-if="quantity > 0">
                    There is {{quantity}} items for {{generalPrice}} $
                    <v-btn color="primary">Check out</v-btn>
                     <span class="line"></span>
                    <v-btn color="primary">Go to cart</v-btn>
                </span>
                <span v-else>
                    У вашому кошику ше немає замовлень
                </span>
            </div>
        </div>
    </v-toolbar>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import Notification from "@/components/Notification/Notification.vue";
    import {ICartModule} from "@/store/interfaces";

    const { mapState } = createNamespacedHelpers('cartModule/');

    @Component({
        components: {Notification},
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
    }
</script>

<style lang="stylus">
    .header-navigation
        position relative
        z-index 2
        a
            display block
            margin-left auto
            .fa-shopping-cart, .fa-paw
                color white
    .v-toolbar__items
        a
            height 100%
    .catalogue-list
        position absolute
        background-color white
        top 200%
        left 0
        min-width 300px
    .cart-icon
        position relative
        cursor pointer
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
