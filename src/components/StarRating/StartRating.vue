<template>
   <span class="stars-holder">
       <span v-for="(star, index) in 5">
           <font-awesome-icon :icon="[...(index < starQuantity ? ['fas'] : ['far']), 'star']"></font-awesome-icon>
       </span>
   </span>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component({

    })
    export default class StartRating extends Vue {
        @Prop(Number) starQuantity!: number;
    }
</script>

<style lang="stylus">

    .fa-star
        color pink
</style>
