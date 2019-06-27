<template>
    <v-carousel>
        <v-carousel-item
                v-for="(item,i) in promotionItems"
                :key="i"
                :src="item.src"
        ></v-carousel-item>
    </v-carousel>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    @Component({
    })
    export default class Promotion extends Vue {
        protected data() {
            return {
                promotionItems: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus">

</style>
