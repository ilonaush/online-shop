
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
import IProduct = Product.IProduct;
import CATEGORY = Product.CATEGORY;
import {filterProducts} from "@/services/ProductService";

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
