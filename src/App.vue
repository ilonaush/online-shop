<template>
  <div>
    <header-navigation/>
    <router-view/>
    <notification/>
    <shop-modals/>
  </div>
</template>

<script>
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import {createNamespacedHelpers} from "vuex";
import CartModal from "./components/Modal/CartModal/CartModal";
import ShopModals from "./components/HashModal/HashModal";

const { mapActions: filterActions } = createNamespacedHelpers("filterModule/");
const { mapActions: productActions } = createNamespacedHelpers("productsModule/");

export default {
  name: "App",
  components: {
    ShopModals,
    CartModal,
    "header-navigation": Header,
    "notification": Notification,
  },
  data() {
    return {}
  },
  methods: {
    ...filterActions(["getFilters"]),
    ...productActions(["getProducts"]),
  },
  created() {
    this.getProducts();
    this.getFilters();
  }

}
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
