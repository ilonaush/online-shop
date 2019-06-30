<template>
    <div class="catalogue-page">
        <filter-navigation :filters="filters"/>
        <product-list :products="filteredProducts"/>
    </div>
</template>

<script lang="ts">
    import Promotion from "@/components/Promotion/Promotion.vue";
    import FilterNavigation from "@/components/Filter/Filter.vue";
    import {createNamespacedHelpers} from "vuex";
    import { Component, Vue } from "vue-property-decorator";
    import ProductList from "@/components/ProductList/ProductList.vue";
    import {IStore} from "@/store/interfaces";

    const { mapState: filterState } = createNamespacedHelpers("filterModule/");
    const { mapState: productState, mapGetters, mapMutations } = createNamespacedHelpers("productsModule/");

    interface ICatalogue {
        setActiveCategory: (category: string)=> void;
    }

    Component.registerHooks([
        'beforeRouteUpdate' // for vue-router 2.2+
    ]);

    @Component({
        components: {
            ProductList,
            "promotion": Promotion,
            "filter-navigation": FilterNavigation,
        },
        computed: {
            ...filterState<IStore>({
                filters: (state) => state.filters,
            }),
            ...productState<IStore>({
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
        created() {
            console.log("created");
            this.setActiveCategory(this.$route.params.category);
        }

        beforeRouteUpdate (to, from, next) {
            debugger;
            this.setActiveCategory(to.params.category);
            next();
        }

    }
</script>

<style lang="stylus">
    .catalogue-page
        display flex
        height 100%
        .v-expansion-panel
            width 30%
        .v-tabs
            flex-grow 1
</style>
