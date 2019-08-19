import {CategoryType} from "@/store/types";
import RequestService from "@/services/RequestService";
import {Product} from "@/interfaces";
import {Module, VuexModule, Mutation, Action} from "vuex-module-decorators";
import IProduct = Product.IProduct;
import {filterProducts} from "@/services/ProductService";
import store from "@/store/store";

import CATEGORY = Product.CATEGORY;

@Module({namespaced: true, store})
export default class ProductsModule extends VuexModule {
	products: IProduct[] = [];
	activeCategory: string = "";
	loading: boolean = false;

	/**
	 * gets only he products which comply with the selected filters
	 */
	get filteredProducts() {
		const selectedFilters = this.context.rootState.filterModule.selectedFilters;
		if (this.activeCategory) {
			if (Object.keys(selectedFilters).length) {
				return this[this.activeCategory as CategoryType].filter(filterProducts(selectedFilters));
			} else {
				return this[this.activeCategory as CategoryType];
			}
		} else {
			return this.products;
		}
	}

	/**
	 * get only promotion products
	 */
	get promotionProducts() {
		return this.products.filter((product: IProduct) => product.oldPrice);
	}


	get indoor() {
		return this.products.filter((product) => product.category === CATEGORY.indoor);
	}

	get outdoor() {
		return this.products.filter((product) => product.category === CATEGORY.outdoor);
	}

	/**
	 * sets products
	 * @param products
	 */
	@Mutation
	setProducts(products: IProduct[]) {
		this.products = products;
	}

	/**
	 * sets loading status
	 * @param loading
	 */
	@Mutation
	setLoading(loading: boolean) {
		console.log(loading);
		this.loading = loading;
	}

	/**
	 * sets active category
	 * @param activeCategory
	 */
	@Mutation
	setActiveCategory(activeCategory: string) {
		this.activeCategory = activeCategory;
	}

	/**
	 * init products module data
	 */
	@Action
	init() {
		this.context.dispatch({type: "getProducts"});
	}

	/**
	 * action for getting products data from the server
	 */
	@Action({commit: "setProducts"})
	async getProducts() {
		this.context.commit("setLoading", true);
		const {data: {items}} = await RequestService.instance.get("/");
		this.context.commit("setLoading", false);
		return items;
	}
}
