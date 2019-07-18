<template>
  <div>
    <header-navigation/>
    <router-view/>
    <notification/>
    <shop-modals/>
  </div>
</template>

<script>
import Header from "./components/header/header";
import Notification from "./components/notification/notification";
import {createNamespacedHelpers} from "vuex";
import CartModal from "./components/Modal/cart-modal/cart-modal";
import ShopModals from "./components/hash-modal/hash-modal";

export default {
  name: "App",
  components: {
    ShopModals,
    CartModal,
    "header-navigation": Header,
    "notification": Notification,
  },
};
</script>
<style lang="stylus">
  .application--wrap
    position relative

  .line
    width 100%
    color grey
    height 1px

  ul
    list-style none
</style>
