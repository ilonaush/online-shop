<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductCard from "../ProductCard/ProductCard.vue";

    @Component({
    })
    export default class Tab extends Vue {
        @Prop(String) name!: string;
        @Prop(Boolean) defaultSelected!: boolean;
        isActive: boolean = false;

        get href() {
            if (this.defaultSelected) {
                return '#';
            }
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }

        mounted() {
            this.isActive = this.defaultSelected;
        }
    }
</script>
