<template>
    <!--<v-navigation-drawer-->
            <!--v-model="filters"-->
            <!--absolute-->
            <!--temporary-->
    <!--&gt;-->
        <!--<v-list class="pt-0" dense>-->
            <!--<v-divider></v-divider>-->

            <!--<v-list-tile-->
                    <!--v-for="filter in filtersList"-->
                    <!--:key="filter.name"-->
                    <!--@click=""-->
            <!--&gt;-->
                <!--<v-list-tile-action>-->
                    <!--<font-awesome-icon :icon="['fas', 'list']" size="2x"/>-->
                <!--</v-list-tile-action>-->

                <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>{{ filter.name }}</v-list-tile-title>-->
                <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->
        <!--</v-list>-->
    <!--</v-navigation-drawer>-->
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class productsList extends Vue {
        @Prop(Array) filters!: object[];
        filtersList = this.filters;
        updated() {
            console.log("updated");
        }
        mounted() {
            console.log("mounted", this.filters);
        }
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
