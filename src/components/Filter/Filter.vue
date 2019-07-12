<template>
    <ul class="filter-list">
        <li
                v-for="filter in availableFilters"
                :key="filter.name"
                class="filter-section"
                @click=""
            >
                <div>{{filter.title}}</div>
                <div>
                    <div v-for="filterOption in filter.options">
                        <input type="checkbox" :disabled="filterOption.availableItems === 0" :value="`${filter.name}.${filterOption.value}`" v-model="selectedFilters">
                        <label :class="{disabledOption: filterOption.availableItems === 0 }">{{filterOption.value}}</label>
                        <span v-if="!filterOption.isInFilter && filterOption.availableItems !== 0">
                            <span v-if="filterOption.filterTypeSelected">+</span>{{filterOption.availableItems}}
                        </span>
                    </div>
                </div>
        </li>
    </ul>
</template>

<script lang="ts">
    import {createNamespacedHelpers} from "vuex";
    import Vue from "vue";
    import {Prop, Component, Watch} from "vue-property-decorator";

    const { mapMutations, mapGetters} = createNamespacedHelpers("filterModule/");

    @Component({
        computed: {
            ...mapGetters(["availableFilters"]),
        },
        methods: {
            ...mapMutations(["setSelectedFilters"])
        }
    })
    export default class FilterNavigation extends Vue {
        @Prop(Boolean) shouldResetFilter!: boolean;
        setSelectedFilters!: (filterArr: object) => void;
        selectedFilters: string[] = [];
        filters: object[] = [];

        @Watch("selectedFilters")
        fireFilteringProducts(filterArr: string[]) {
            const filterObj = filterArr.reduce<{[key: string]: string[]}>((acc, nextValue) => {
                const [filter = "", option]: string[] = nextValue.split(".");
                acc[filter] = [...(acc[filter] ? acc[filter] : []), option];
                return acc;
            }, {});
            console.log(filterObj);
            this.setSelectedFilters(filterObj);
        }

        @Watch("shouldResetFilter")
        resetFilter() {
            this.selectedFilters = [];
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

    .disabledOption
        color grey
</style>
