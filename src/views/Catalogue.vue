<template>
    <div class="catalogue-page">
        <filter-navigation :shouldResetFilter="shouldResetFilter"/>
        <product-list :products="filteredProducts"/>
    </div>
</template>

<script lang="ts">
    import FilterNavigation from "@/components/Filter/Filter.vue";
    import {createNamespacedHelpers} from "vuex";
    import { Component, Vue } from "vue-property-decorator";
    import ProductList from "@/components/ProductList/ProductList.vue";
    import {IStore} from "@/store/interfaces";
    import {Route, RawLocation} from "vue-router";
    import {IFiltersModuleState, IProductsModuleState} from "../store/interfaces";

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
        },
        computed: {
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
        created() {
            this.setActiveCategory(this.$route.params.category);
        }

        beforeRouteUpdate (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) {
            this.setActiveCategory(to.params.category);
            this.shouldResetFilter = true;
            next();
        }

    }
</script>

<style lang="stylus">
    @import "../vars.styl";

    .catalogue-page
        display flex
        height 100%
        padding $page-padding
        .v-expansion-panel
            width 30%
        .v-tabs
            flex-grow 1
</style>
