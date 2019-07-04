<template>
    <cart-modal v-if="$route.hash === ('#' + modalType.cart)"/>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import CartModal from "../Modal/CartModal/CartModal.vue";
    import {MODAL_TYPE} from "@/store/enums";


    @Component({
        components: {
            CartModal
        },
    })
    export default class ShopModals extends Vue {
        modalType = MODAL_TYPE;

    }
</script>

<style lang="stylus">

</style>
