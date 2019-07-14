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
    import {Component, Vue} from "vue-property-decorator";
    import {Tabs} from "@/interfaces";
    import {Tabs} from "../../interfaces";
    import ITabsMenuItem = Tabs.ITabsMenuItem;

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

        selectTab(selectedHref: string) {
            if (selectedHref) {
                this.tabs.forEach((tab : ITabsMenuItem) => {
                    tab.isActive = (tab.href === selectedHref);
                });
            }
        }
    }
</script>

<style lang="stylus">
    .tabs-menu
        margin 10px 0
        padding 10px
        background-color whitesmoke
        li
            display inline
            padding-right 10px

</style>

