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

	get promotionProducts() {
		return this.products.filter((product: IProduct) => product.oldPrice);
	}

	get indoor() {
		return this.products.filter((product) => product.category === CATEGORY.indoor);
	}

	get outdoor() {
		return this.products.filter((product) => product.category === CATEGORY.outdoor);
	}

	@Mutation
	setProducts(products: IProduct[]) {
		this.products = products;
	}

	@Mutation
	setActiveCategory(activeCategory: string) {
		this.activeCategory = activeCategory;
	}

	@Action
	init() {
		this.context.dispatch({type: "getProducts"});
	}

	// action 'decr' commits mutation 'decrement' when done with return value as payload
	@Action({commit: "setProducts"})
	async getProducts() {
		const {data: {items}} = await RequestService.instance.get("/");
		return items;
	}
}
