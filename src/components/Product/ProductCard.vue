<template>
    <v-card flat>
        <v-card-text>{{ productItem.name }}</v-card-text>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import RequestService from '../../services/RequestService'
    import {IProduct} from "./interfaces";
    @Component({
        props: ['productItem']
    })
    export default class ProductCard extends Vue {
        @Prop({type: () => Object as IProduct}) product!: IProduct;
        productItem = this.product;

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
</style>
