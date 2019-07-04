<template>
    <div class="tabs">
        <div>
            <ul class="tabs-menu">
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                    <a :href="tab.href" @click="selectTab(tab.href)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>
        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductCard from "../Product/ProductCard.vue";
    import {ITabsMenuItem} from "./interfaces";
    import {RawLocation, Route} from "vue-router";

    Component.registerHooks([
        "beforeRouteUpdate"
    ]);

    @Component({
    })
    export default class Tabs extends Vue {
        tabs: any[] = [];

        mounted() {
            this.selectTab(window.location.hash);
        }

        created() {
            this.tabs = this.$children;
        }

        selectTab(selectedHref) {
            if (selectedHref) {
                this.tabs.forEach((tab : ITabsMenuItem) => {
                    tab.isActive = (tab.href == selectedHref);
                });
            }
        }
    }
</script>

<style lang="stylus">
    .tabs-menu
        margin 0
        padding 0
        li
            display inline
            padding-right 10px
</style>

