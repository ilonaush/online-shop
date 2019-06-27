<template>
    <v-toolbar color="primary" dark class="header-navigation">
        <router-link to="/"><font-awesome-icon :icon="['fas', 'paw']" size="2x"/></router-link>
        <v-toolbar-title>Online Pet Shop</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
            <router-link to="/catalogue"><v-btn flat>Catalogue</v-btn></router-link>
            <v-btn flat>About</v-btn>
        </v-toolbar-items>
        <router-link to="/cart"><font-awesome-icon :icon="['fas', 'shopping-cart']" size="2x"/></router-link>
    </v-toolbar>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import RequestService from '../../services/RequestService'
    @Component({
    })
    export default class Header extends Vue {
    }
</script>

<style lang="stylus">
    .header-navigation
        a
            display block
            margin-left auto
            .fa-shopping-cart, .fa-paw
                color white
    .v-toolbar__items
        a
            height 100%
</style>
