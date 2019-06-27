<template>
    <v-card flat>
        <v-card-text>{{ menuItem }}</v-card-text>
    </v-card>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import RequestService from '../../services/RequestService'
    @Component({
        props: ['productItem']
    })
    export default class ProductCard extends Vue {
    }
</script>

<style lang="stylus">
    .header-navigation
        a
            display block
            margin-left auto
            .fa-shopping-cart, .fa-flower-tulip
                color white
    .v-toolbar__items
        a
            height 100%
</style>
