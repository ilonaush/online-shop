<template functional>
   <span class="stars-holder">
       <span v-for="(star, index) in 5" @click="listeners.starClick ? listeners.starClick(index + 1) : null" class="clickable">
           <font-awesome-icon :icon="[...(index < props.starQuantity ? ['fas'] : ['far']), 'star']"></font-awesome-icon>
       </span>
   </span>
</template>


<style lang="stylus">
    .stars-holder
        .clickable
            cursor pointer
        .fa-star
            color pink
</style>
