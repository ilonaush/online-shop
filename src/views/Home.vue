<template>
  <div>
    <promotion/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Promotion from "@/components/Promotion/Promotion.vue";

  @Component({
    components: {
      Promotion
    },
  })
  export default class Home extends Vue {}
</script>
