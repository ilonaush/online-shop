<template>
    <v-tabs
        v-model="active"
        color="cyan"
        dark
        centered
        slider-color="yellow"
    >
        <v-tab
            v-for="(menuItem, index) in menuItems"
            :key="index"
            ripple
        >
            {{menuItem}}
        </v-tab>
        <v-tab-item
            v-for="(menuItem, index) in menuItems"
            :key="index"
        >
            <v-card flat>
               <product-list/>
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import ProductList from "../ProductList/ProductList";
    @Component({
        components: {ProductList}
    })
    export default class Menu extends Vue {
        protected data() {
            return {
                active: "",
                menuItems: ["food", "clothes", "toys"]
            }
        }
    }
</script>

<style lang="stylus">
    .header-navigation
        a
            display block
            margin-left auto
            .fa-shopping-cart
                color white
</style>
