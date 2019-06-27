<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
            <v-card
                min-height="50"
            >
               <product-list :products="products"/>
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import ProductList from "../ProductList/ProductList.vue";

    @Component({
        components: {
            "product-list": ProductList
        },
        watch: {
            products: function (val) {
                console.log(val, "watcher")
            },
        }
    })
    export default class CatalogueList extends Vue {
        @Prop(Array) products!: object[];
        active: string = "";
        menuItems: string[] = ["food", "clothes", "toys"];

        created() {
            console.log("mount catalogue list");
            console.log(this.$data);
        }
        updated() {
            console.log("updated catalogue list");
            console.log('sadasdasdasda347uhkhjkjhk', this.products);
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
