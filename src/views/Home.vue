<template>
  <div class="home-page">
    <h4>Promotion</h4>
    <product-list :products="promotionProducts"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import ProductList from "@/components/ProductList/ProductList.vue";
  import {createNamespacedHelpers} from "vuex";

  const { mapGetters } = createNamespacedHelpers("productsModule/");

  @Component({
    components: {
      ProductList
    },
    computed: {
      ...mapGetters(['promotionProducts'])
    }
  })
  export default class Home extends Vue {}
</script>

<style lang="stylus">
  @import "../vars.styl";

  .home-page
    padding $page-padding
</style>
