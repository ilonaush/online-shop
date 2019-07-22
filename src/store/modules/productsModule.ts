import {
    IFiltersModuleState,
    IProductModuleActions,
    IProductsModuleGetters,
    IProductsModuleMutations,
    IProductsModuleState,
} from "@/store/interfaces";
import {CategoryType} from "@/store/types";
import RequestService from "@/services/RequestService";
import {ActionContext, DefineGetters, DefineMutations, DefineActions} from "vuex-type-helper";
import {Product} from "@/interfaces";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import IProduct = Product.IProduct;
import CATEGORY = Product.CATEGORY;
import {filterProducts} from "@/services/ProductService";
import store from "@/store/store";

// @Module({namespaced: true, store: store})
// export default class ProductsModule extends VuexModule {
//     products: IProduct[] = [];
//     activeCategory: string = "";
//
//     get filteredProducts() {
//         return [];
//         const selectedFilters = this.context.rootState.filterModule.selectedFilters;
//         if (Object.keys(selectedFilters).length) {
//             return this.context.getters[this.context.state.activeCategory as CategoryType].filter(filterProducts(selectedFilters));
//         } else {
//             return this.context.getters[this.context.state.activeCategory as CategoryType];
//         }
//     }
//
//     @Mutation
//     setProducts(products: IProduct[]) {
//         this.products = products;
//     }
//
//     @Mutation
//     setActiveCategory(activeCategory: string) {
//         this.activeCategory = activeCategory;
//     }
//
//     // action 'incr' commits mutation 'increment' when done with return value as payload
//     @Action({ commit: 'increment' })
//     init() {
//         this.context.dispatch({type: "getProducts"});
//
//     }
//     // action 'decr' commits mutation 'decrement' when done with return value as payload
//     @Action({ commit: 'setProducts' })
//     async getProducts() {
//         console.log(this.context);
//         const {data: {items}} = await RequestService.instance.get("/");
//         return items;
//     }
// }

const getters: DefineGetters<IProductsModuleGetters, IProductsModuleState> = {
    filteredProducts: (state, getters, rootState) => {
        const selectedFilters = rootState.filterModule.selectedFilters;
        if (Object.keys(selectedFilters).length) {
            return getters[state.activeCategory as CategoryType].filter(filterProducts(selectedFilters));
        } else {
            return getters[state.activeCategory as CategoryType];
        }
    },
    promotionProducts: (state) => {
        return state.products.filter((product: IProduct) => product.oldPrice);
    },
    indoor: (state) => {
        return state.products.filter((product) => product.category === CATEGORY.indoor);
    },
    outdoor: (state) => {
        return state.products.filter((product) => product.category === CATEGORY.outdoor);
    },
};

const mutations: DefineMutations<IProductsModuleMutations, IProductsModuleState> = {
    setProducts(state: IProductsModuleState, products: IProduct[]) {
        state.products = products;
    },
    setActiveCategory(state: IProductsModuleState, category: string) {
        state.activeCategory = category;
    },
};

const actions: DefineActions<IProductModuleActions, IProductsModuleState, IProductsModuleMutations, IProductsModuleGetters>  = {
    init(context: ActionContext<IProductsModuleState, IProductsModuleGetters, IProductModuleActions, IProductsModuleMutations>) {
        context.dispatch({type: "getProducts"});
    },
    async getProducts(context: ActionContext<IProductsModuleState, IProductsModuleGetters, IProductModuleActions, IProductsModuleMutations>) {
        const {data: {items}} = await RequestService.instance.get("/");
        context.commit("setProducts", items);
    },
};

export const productsModule = {
    namespaced: true,
    getters,
    state: {
        products: [],
        activeCategory: "",
    },
    mutations,
    actions,
};
