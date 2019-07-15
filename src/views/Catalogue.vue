<template>
    <div class="catalogue-page">
        <filter-navigation :shouldResetFilter="shouldResetFilter" :filters="filters"/>
        <div class="product-list_holder">
            <sorting v-on:viewChange="setView" v-on:sortTypeChange="setSortType"></sorting>
            <product-list :className="view" :products="sortedList"/>
        </div>
    </div>
</template>

<script lang="ts">
    import FilterNavigation from "@/components/Filter/Filter.vue";
    import {createNamespacedHelpers} from "vuex";
    import { Component, Vue, Prop } from "vue-property-decorator";
    import ProductList from "@/components/ProductList/ProductList.vue";
    import Sorting from "@/components/Sorting/Sorting.vue";
    import {Route, RawLocation} from "vue-router";
    import {IFiltersModuleState, IProductsModuleState} from "@/store/interfaces";
    import {Product} from "@/interfaces";
    import {sortByAcsendingPrice, sortByAcsendingRating, sortByDescendingRating, sortByDescendingPrice} from "@/services/SortService";

    const { mapState: filterState } = createNamespacedHelpers("filterModule/");
    const { mapState: productState, mapMutations } = createNamespacedHelpers("productsModule/");


    Component.registerHooks([
        "beforeRouteUpdate"
    ]);

    @Component({
        components: {
            ProductList,
            FilterNavigation,
            Sorting
        },
        computed: {
            ...filterState<IFiltersModuleState>({
                filters: (state) => state.filters,
            }),
            ...productState<IProductsModuleState>({
                products: (state) => state.products,
            }),
        },
        methods: {
            ...mapMutations(["setActiveCategory"])
        }
    })
    export default class Catalogue extends Vue{
        @Prop(Array) filteredProducts!: Product.IProduct[];
        setActiveCategory!: (category: string)=> void;
        shouldResetFilter = false;
        view: string = "grid";
        sortType: string = "rating.lowest";

        get sortedList() {
            switch (this.sortType) {
                case('rating.lowest'): return [...this.$store.getters["productsModule/filteredProducts"]].sort(sortByAcsendingRating);
                case('rating.highest'): return [...this.$store.getters["productsModule/filteredProducts"]].sort(sortByDescendingRating);
                case('price.lowest'): return [...this.$store.getters["productsModule/filteredProducts"]].sort(sortByAcsendingPrice);
                case('price.highest'): return [...this.$store.getters["productsModule/filteredProducts"]].sort(sortByDescendingPrice);
            }
        }

        created() {
            this.setActiveCategory(this.$route.params.category);
        }

        beforeRouteUpdate (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) {
            this.setActiveCategory(to.params.category);
            this.shouldResetFilter = true;
            next();
        }

        setView(view: string) {
            this.view = view;
        }

        setSortType(sortType: string) {
            this.sortType = sortType;
        }
    }
</script>

<style lang="stylus">
    @import "../vars.styl";

    .catalogue-page
        display flex
        height 100%
        padding $page-padding

    .product-list_holder
        width 100%
</style>
