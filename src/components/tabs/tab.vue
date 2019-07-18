<template>
    <div :class="className" v-show="isActive">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class Tab extends Vue {
        @Prop(String) name!: string;
        @Prop(Boolean) defaultSelected!: boolean;
        @Prop(String) className!: string;
        isActive: boolean = false;

        mounted() {
            this.isActive = this.defaultSelected;
        }

        get href() {
            if (this.defaultSelected) {
                return "#";
            }
            return "#" + this.name.toLowerCase().replace(/ /g, "-");
        }
    }
</script>
