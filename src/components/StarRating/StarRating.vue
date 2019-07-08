<template>
   <span class="stars-holder">
       <span v-for="(star, index) in 5">
           <font-awesome-icon :icon="[...(index < starQuantity ? ['fas'] : ['far']), 'star']"></font-awesome-icon>
       </span>
   </span>
</template>

<script lang="ts">
    import Vue from "vue";

    //functional component
    export default Vue.extend({
        functional: true,
        props: {
            starQuantity: Number
        },
    })
</script>

<style lang="stylus">

    .fa-star
        color pink
</style>
