<template>
    <div>
        <cart-modal v-if="$route.hash === ('#' + modalType.cart)"/>
        <!--<login-modal v-if="$route.hash === ('#' + modalType.login)"/>-->
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import CartModal from "@/components/Modal/cart-modal/cart-modal.vue";
    import {MODAL_TYPE} from "@/store/enums";
    import LoginModal from "../Modal/login-modal/login-modal";

    @Component({
        components: {
            LoginModal,
            CartModal
        },
    })
    export default class ShopModals extends Vue {
        modalType = MODAL_TYPE;
    }
</script>
