import {Module} from "vuex";
import {
    IProductModuleActions,
    IProductsModuleGetters,
    IProductsModuleMutations,
    IProductsModuleState,
    IStore
} from "@/store/interfaces";
import {CategoryType, FilterType} from "@/store/types";
import {IProduct} from "@/components/Product/interfaces";
import RequestService from "@/services/RequestService";
import {ActionContext, DefineActions, DefineGetters, DefineMutations} from "vuex-type-helper";

const getters: DefineGetters<IProductsModuleGetters, IProductsModuleState> = {
    filteredProducts: (state, getters, rootState) => {
        const selectedFilters = rootState.filterModule.selectedFilters;
        debugger;
        if (Object.keys(selectedFilters).length) {
            return getters[state.activeCategory as CategoryType].filter((product: IProduct) => {
                for (const filter in selectedFilters) {
                    if (!product.hasOwnProperty(filter) && selectedFilters.hasOwnProperty(filter)) {
                        return false;
                    } else {
                        return selectedFilters[filter].every((x: FilterType) => {
                            return product[filter as FilterType].includes(x);
                        });
                    }
                }

            });
        } else {
            return getters[state.activeCategory as CategoryType];
        }
    },
    food: (state) => {
        return state.products.filter((product) => product.category === "food");
    },
    toys: (state) => {
        return state.products.filter((product) => product.category === "toys");
    },
    bath: (state) => {
        return state.products.filter((product) => product.category === "bath");
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

const actions: DefineActions<IProductModuleActions, IProductsModuleState, IProductsModuleMutations, IProductsModuleGetters> = {
    async getProducts(context: ActionContext<IProductsModuleState, IProductsModuleGetters, IProductModuleActions, IProductsModuleMutations>) {
        const {data: {items}} = await RequestService.instance.get("/");
        context.commit("setProducts", items);
    },
};

export const productsModule: Module<IProductsModuleState, IStore> = {
    namespaced: true,
    getters,
    state: {
        products: [],
        activeCategory: "",
    },
    mutations,
    actions,
};
