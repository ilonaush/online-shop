<template>
  <div>
    <promotion/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Menu from "@/components/Menu/CatalogueMenu.vue";
  import Promotion from "@/components/Promotion/Promotion.vue";

  console.log("meow");
  @Component({
    components: {
      "menu-navigation": Menu,
      "promotion": Promotion,
    },
  })
  export default class Home extends Vue {}
</script>
