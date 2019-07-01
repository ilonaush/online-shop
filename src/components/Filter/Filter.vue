<template>
    <ul class="filter-list">
        <li
                v-for="filter in filters"
                :key="filter.name"
                class="filter-section"
                @click=""
        >
                <div>{{filter.title}}</div>
                <div>
                    <div v-for="filterOption in filter.options">
                        <input type="checkbox" :value="`${filter.name}.${filterOption}`" v-model="selectedFilters">
                        <label>{{filterOption}}</label>
                    </div>
                </div>

        </li>
    </ul>
</template>

<script lang="ts">
    import {createNamespacedHelpers} from "vuex";
    import Vue from "vue";
    import {Prop, Component, Watch} from "vue-property-decorator";

    const { mapMutations} = createNamespacedHelpers("filterModule/");

    interface IFilter {
        setSelectedFilters: (filterArr: string[]) => void;
    }

    @Component({
        methods: {
            ...mapMutations(["setSelectedFilters"])
        }
    })
    export default class FilterNavigation extends Vue implements  IFilter{
        @Prop(Array) filters!: object[];
        setSelectedFilters!: (filterArr: object) => void;

        selectedFilters: string[] = [];

        @Watch("selectedFilters")
        fireFilteringProducts(filterArr: string[]) {
            const filterObj = filterArr.reduce<{[key: string]: string[]}>((acc, nextValue) => {
                const [filter="", option]: string[] = nextValue.split(".");
                acc[filter] = [...(acc[filter] ? acc[filter] : []), option];
                return acc;
            }, {});
            console.log(filterObj);
            this.setSelectedFilters(filterObj);
        }

    }
</script>

<style lang="stylus">

    .filter-list
        background-color white
        padding 0
        margin 0
        width 250px
    .filter-section
        padding 15px
        .v-list__tile
            flex-direction column
            height auto
</style>
