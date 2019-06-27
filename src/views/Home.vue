<template>
  <div>
    <promotion/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Menu from "@/components/CatalogueList/CatalogueList.vue";
  import Promotion from "@/components/Promotion/Promotion.vue";

  @Component({
    components: {
      "menu-navigation": Menu,
      "promotion": Promotion,
    },
  })
  export default class Home extends Vue {}
</script>
