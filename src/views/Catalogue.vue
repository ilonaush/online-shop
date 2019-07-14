<template>
    <div class="catalogue-page">
        <filter-navigation :shouldResetFilter="shouldResetFilter" :filters="filters"/>
        <div class="product-list_holder">
            <sorting v-on:viewChange="setView"></sorting>
            <product-list :className="view" :products="filteredProducts"/>
        </div>
    </div>
</template>

<script lang="ts">
    import FilterNavigation from "@/components/Filter/Filter.vue";
    import {createNamespacedHelpers} from "vuex";
    import { Component, Vue } from "vue-property-decorator";
    import ProductList from "@/components/ProductList/ProductList.vue";
    import Sorting from "@/components/Sorting/Sorting.vue";
    import {Route, RawLocation} from "vue-router";
    import {IFiltersModuleState, IProductsModuleState} from "@/store/interfaces";

    const { mapState: filterState } = createNamespacedHelpers("filterModule/");
    const { mapState: productState, mapGetters, mapMutations } = createNamespacedHelpers("productsModule/");

    interface ICatalogue {
        setActiveCategory: (category: string)=> void;
    }

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
            ...mapGetters(["filteredProducts"]),
        },
        methods: {
            ...mapMutations(["setActiveCategory"])
        }
    })
    export default class Catalogue extends Vue implements ICatalogue{
        setActiveCategory!: (category: string)=> void;
        shouldResetFilter = false;
        view: string = "grid";

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
