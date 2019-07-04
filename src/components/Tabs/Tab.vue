<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductCard from "../Product/ProductCard.vue";
    import {ITabsMenuItem} from "./interfaces";

    @Component({
    })
    export default class Tab extends Vue {
        @Prop(String) name: string;
        @Prop(Boolean) selected: boolean;
        isActive: boolean = false;

        get href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }

        mounted() {
            this.isActive = this.selected;
        }
    }
</script>
