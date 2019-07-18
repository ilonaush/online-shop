<template functional>
   <span class="stars-holder">
       <span v-for="(star, index) in 5">
           <font-awesome-icon :icon="[...(index < props.starQuantity ? ['fas'] : ['far']), 'star']"></font-awesome-icon>
       </span>
   </span>
</template>


<style lang="stylus">
    .fa-star
        color pink
</style>
