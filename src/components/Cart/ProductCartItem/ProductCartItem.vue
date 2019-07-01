<template>
    <div class="cart-item">
        {{product.name}}
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import {IProduct} from "@/components/Product/interfaces";

    @Component({
    })
    export default class ProductCartItem extends Vue {
       @Prop({type: Object as () => IProduct}) product!: IProduct;
    }
</script>

<style lang="stylus">

</style>
