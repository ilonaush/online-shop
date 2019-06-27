<template>
  <v-app>
    <header-navigation/>
    <router-view/>
  </v-app>
</template>

<script>
import Header from "./components/Header/Header";

export default {
  name: "App",
  components: {
    "header-navigation": Header,
  },
  data() {
    return {
      //
    };
  }
}
</script>
