<template>
    <v-card flat>
        <v-card-text>{{ product.name }}</v-card-text>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {IProduct} from "./interfaces";
    @Component({
    })
    export default class ProductCard extends Vue {
        @Prop({type: Object as () => IProduct}) product!: IProduct;

        updated() {
            console.log(this.product, "card");
        }
    }
</script>

<style lang="stylus">
    .header-navigation
        a
            display block
            margin-left auto
            .fa-shopping-cart, .fa-flower-tulip
                color white
    .v-toolbar__items
        a
            height 100%

    .v-tabs .v-window__container,
    .v-tabs .v-window-item
        height 100%

    /* customise the dimensions of the card content here */
    .v-tabs .v-card
        height 100%
</style>
