<template>
    <ul class="filter-list">
        <li
            v-for="filter in filters"
            :key="filter.name"
            class="filter-section"
            >
                <div class="filter_title">{{filter.title}}</div>
                <div class="colors"
                     v-if="filter.name === 'colors'" >
                    <div :class="['color', ...(selectedFilters.includes(`colors.${filterOption.value}`) ? ['selected-color'] : [''])]"
                         v-for="filterOption in filter.options"
                         :style="{backgroundColor: filterOption.value}"
                         v-on:click="setSelectedColor(filterOption.value)">
                    </div>
                </div>
                <div v-else>
                    <custom-checkbox
                            v-for="filterOption in filter.options"
                            :label="filterOption.value"
                            :value="`${filter.name}.${filterOption.value}`"
                            v-model="selectedFilters"
                    />
                </div>

        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from "vue";
    import {createNamespacedHelpers} from "vuex";
    import {Prop, Component, Watch} from "vue-property-decorator";
    import CustomCheckbox from "@/components/custom-checkbox/custom-checkbox.vue";

    const { mapMutations} = createNamespacedHelpers("filterModule/");

    @Component({
        components: {
            CustomCheckbox
        },
        methods: {
            ...mapMutations(["setSelectedFilters"])
        }
    })
    export default class FilterNavigation extends Vue {
        @Prop(Array) filters!: object[];
        @Prop(Boolean) shouldResetFilter!: boolean;
        setSelectedFilters!: (filterArr: {[key: string]: string[]}) => void;
        selectedFilters: string[] = [];

        @Watch("selectedFilters")
        fireFilteringProducts(filterArr: string[]) {
            const filterObj = filterArr.reduce<{[key: string]: string[]}>((acc, nextValue) => {
                const [filter = "", option]: string[] = nextValue.split(".");
                acc[filter] = [...(acc[filter] ? acc[filter] : []), option];
                return acc;
            }, {});
            this.setSelectedFilters(filterObj);
        }

        @Watch("shouldResetFilter")
        resetFilter() {
            this.selectedFilters = [];
        }

        setSelectedColor(color: string) {
            if (!this.selectedFilters.includes(`colors.${color}`)) {
                this.selectedFilters.push(`colors.${color}`);
            } else {
                this.selectedFilters = this.selectedFilters.filter((colorFilter) => colorFilter !== `colors.${color}`);
            }
        }
    }
</script>

<style lang="stylus">
    @import "~@/vars.styl"

    .filter-list
        background-color white
        padding 0
        margin 0
        width 250px
        color black

    .filter-section
        padding 15px

        .filter_title
            margin-bottom 5px

    .disabledOption
        color grey
</style>
