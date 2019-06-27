<template>
    <div class="catalogue-page">
        <filter-navigation :filters="filters"/>
        <catalogue-list :products="foodProducts"/>
    </div>
</template>

<script lang="ts">
    import CatalogueList from "@/components/CatalogueList/CatalogueList.vue";
    import Promotion from "@/components/Promotion/Promotion.vue";
    import FilterNavigation from "@/components/Filter/Filter.vue";
    import {createNamespacedHelpers} from "vuex";
    import {RequestName} from "@/services/enums";
    import { Component, Vue } from "vue-property-decorator";

    interface ICatalogue {
        filters: object[];
        getFilters: () => void;
        getProducts: (type: string) => void;
    }

    const { mapState: filterState, mapActions: filterActions } = createNamespacedHelpers('filterModule/');
    const { mapState: productState, mapActions: productActions } = createNamespacedHelpers('productsModule/');

    @Component({
        components: {
            "catalogue-list": CatalogueList,
            "promotion": Promotion,
            "filter-navigation": FilterNavigation,
        },
        computed: {
        ...filterState<IStore>({
                filters: state => state.filters,
            }),
        ...productState<IStore>({
                foodProducts: state =>  state.foodProducts
            }),
        },
        methods: {
        ...filterActions(['getFilters']),
        ...productActions(['getProducts']),
        }
    })

    export default class Catalogue extends Vue implements ICatalogue{
        filters!: object[];
        foodProducts!: object[];
        getFilters!: () => Promise<any>;
        getProducts!: (type: string) => void;

        created() {
            console.log("created");
            this.getFilters();
            this.getProducts(RequestName.getFoodProducts);
        }

        updated() {
            console.log("updated catalogue");
            console.log(this.filters);
            console.log(this.foodProducts);
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
