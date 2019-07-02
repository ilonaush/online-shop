<template>
    <cart-modal v-if="activeModal === modalType.cart && showModal"/>
    <place-order-modal v-else-if="activeModal === modalType.checkout && showModal"/>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {mapState} from "vuex";
    import {IStore} from "@/store/interfaces";
    import CartModal from "../Modal/CartModal/CartModal.vue";
    import PlaceOrderModal from "@/components/Modal/PlaceOrderModal/PlaceOrderModal.vue";
    import {MODAL_TYPE} from "@/store/enums";


    @Component({
        components: {
            PlaceOrderModal,
            CartModal
        },
        computed: {
            ...mapState<IStore>({
                activeModal: (state) => state.modalModule.activeModal,
                showModal: (state) => state.modalModule.showModal
            }),
        }
    })
    export default class ShopModals extends Vue {
        modalType = MODAL_TYPE;
    }
</script>

<style lang="stylus">

</style>
