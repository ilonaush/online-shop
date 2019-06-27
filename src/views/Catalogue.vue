<template>
    <div class="catalogue-page">
        <filter-navigation :filters="filters"/>
        <menu-navigation/>
    </div>
</template>

<script lang="ts">
    import Menu from "@/components/Menu/CatalogueMenu.vue";
    import Promotion from "@/components/Promotion/Promotion.vue";
    import Filter from "@/components/Filter/Filter.vue";
    import {createNamespacedHelpers} from "vuex";
    import {RequestName} from "../services/enums";

    const { mapState: filterState, mapActions: filterActions } = createNamespacedHelpers('filterModule/');
    const { mapState: productState, mapActions: productActions } = createNamespacedHelpers('productsModule/');

    export default {
        components: {
            "menu-navigation": Menu,
            "promotion": Promotion,
            "filter-navigation": Filter,
        },
        methods: {
            ...filterActions(['getFilters']),
            ...productActions(['getProducts'])
        },
        computed: {
            ...filterState({
                filters: state => state.filters,
            }),
            ...productState({
                foodProducts: state => state.foodProducts
            })
        },
        mounted() {
            this.getFilters();
            this.getProducts(RequestName.getFoodProducts);
        },
        updated() {
            console.log("updated");
            console.log(this.filters)
        }
    }
</script>

<style lang="stylus">
    .catalogue-page
        display flex
        .v-expansion-panel
            width 30%
        .v-tabs
            flex-grow 1
</style>
