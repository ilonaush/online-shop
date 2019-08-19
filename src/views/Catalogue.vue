<template>
	<div class="catalogue-page">
		<filter-navigation :shouldResetFilter="shouldResetFilter" :filters="filters"/>
		<div class="product-list_holder">
			<sorting :listView="view" v-on:viewChange="setView" v-on:sortTypeChange="setSortType"></sorting>
			<product-list :className="view" :products="sortedList"/>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import {Component, Prop} from "vue-property-decorator";
	import {createNamespacedHelpers} from "vuex";
	import {Route, RawLocation} from "vue-router";

	import {IFiltersModuleState, IProductsModuleState} from "@/store/interfaces";
	import {Product} from "@/interfaces";
	import {sortByAscendingProperty, sortByDescendingProperty, sortProducts} from "@/services/ProductService";

	import FilterNavigation from "@/components/filter/filter.vue";
	import ProductList from "@/components/product-list/product-list.vue";
	import Sorting from "@/components/sorting/sorting.vue";

	const {mapState: filterState} = createNamespacedHelpers("filterModule/");
	const {mapState: productState, mapMutations} = createNamespacedHelpers("productsModule/");

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
	export default class Catalogue extends Vue {
		@Prop(Array) filteredProducts!: Product.IProduct[];
		setActiveCategory!: (category: string) => void;
		shouldResetFilter = false;
		view: string = "grid";
		sortType: string = "rating.lowest";

		created() {
			this.setActiveCategory(this.$route.params.category);
		}

		beforeRouteUpdate(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) {
			this.setActiveCategory(to.params.category);
			this.shouldResetFilter = true;
			next();
		}

		get sortedList() {
			return sortProducts(this.$store.getters["productsModule/filteredProducts"], this.sortType);
		}

		/**
		 * sets view type
		 * @param view
		 */
		setView(view: string) {
			this.view = view;
		}

		/**
		 * sets sort type
		 * @param sortType
		 */
		setSortType(sortType: string) {
			this.sortType = sortType;
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~@/vars";

	.catalogue-page
		display flex
		height 100%
		padding $page-padding

	.product-list_holder
		width 100%
</style>
