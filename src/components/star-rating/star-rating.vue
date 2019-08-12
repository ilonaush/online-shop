<template functional>
	<span class="stars-holder">
		 <span v-for="(star, index) in 5"
				 v-on="listeners && listeners.starClick ? {click: () => listeners.starClick(index + 1)} : {}"
				 class="clickable">
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
