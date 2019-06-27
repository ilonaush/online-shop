<template>
    <v-tabs
        v-model="active"
        color="cyan"
        dark
        centered
        slider-color="yellow"
    >
        <v-tab
            v-for="menuItem in menuItems"
            :key="n"
            ripple
        >
            {{menuItem}}
        </v-tab>
        <v-tab-item
            v-for="menuItem in menuItems"
            :key="n"
        >
            <v-card flat>
                <v-card-text>{{ menuItem }}</v-card-text>
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    @Component({
    })
    export default class Menu extends Vue {
        protected data() {
            return {
                menuItems: ["food", "clothes", "toys"]
            }
        }
    }
</script>

<style lang="stylus">
    .header-navigation
        a
            display block
            margin-left auto
            .fa-shopping-cart
                color white
</style>
