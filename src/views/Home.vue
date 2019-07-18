<template>
  <div class="home-page">

    <product-list :products="promotionProducts"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import ProductList from "@/components/product-list/product-list.vue";
  import {createNamespacedHelpers} from "vuex";

  const { mapGetters } = createNamespacedHelpers("productsModule/");

  @Component({
    components: {
      ProductList
    },
    computed: {
      ...mapGetters(["promotionProducts"])
    }
  })
  export default class Home extends Vue {}
</script>

<style lang="stylus">
  @import "../vars.styl";

  .home-page
    padding $page-padding
    .product-list
      max-width 1100px
      margin 0 auto
      .product-card-holder
        width 24%
</style>
