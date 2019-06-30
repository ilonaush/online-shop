<template>
  <v-app>
    <header-navigation/>
    <router-view/>
    <notification/>
  </v-app>
</template>

<script>
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import {createNamespacedHelpers} from "vuex";

const { mapActions: filterActions } = createNamespacedHelpers("filterModule/");
const { mapActions: productActions } = createNamespacedHelpers("productsModule/");

export default {
  name: "App",
  components: {
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
