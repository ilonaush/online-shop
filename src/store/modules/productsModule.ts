
import {
    IFiltersModuleState,
    IProductModuleActions,
    IProductsModuleGetters,
    IProductsModuleMutations,
    IProductsModuleState, IStore,
} from "@/store/interfaces";
import {CategoryType} from "@/store/types";
import RequestService from "@/services/RequestService";
import {ActionContext, DefineGetters, DefineMutations} from "vuex-type-helper";
import {Product} from "@/interfaces";
import IProduct = Product.IProduct;
import {ActionTree, Module} from "vuex";
import CATEGORY = Product.CATEGORY;

const getters: DefineGetters<IProductsModuleGetters, IProductsModuleState> = {
    filteredProducts: (state, getters, rootState) => {
        const selectedFilters = rootState.filterModule.selectedFilters;
        console.log(selectedFilters.length, "selected filters");
        if (Object.keys(selectedFilters).length) {
            return getters[state.activeCategory as  CategoryType].filter((product: IProduct) => {
                const shouldBeIncluded = [];
                for (const filter in selectedFilters) {
                    if (!product.hasOwnProperty(filter) && selectedFilters.hasOwnProperty(filter)) {
                        shouldBeIncluded.push(false);
                    } else {
                        const someFiltersSelected =  selectedFilters[filter].every((x: any) => {
                            if (product[filter as keyof IProduct]) {
                                const productFilter = product[filter as keyof IProduct] || [];
                                console.log(productFilter);
                                if (typeof productFilter !== "number") {
                                    return productFilter.includes(x);
                                }
                            }
                        });
                        shouldBeIncluded.push(someFiltersSelected);
                    }
                }
                return shouldBeIncluded.every((iterationResult) => !!iterationResult);

            });
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

const actions: ActionTree<IProductsModuleState, IStore>  = {
    init(context: ActionContext<IProductsModuleState, IProductsModuleGetters, IProductModuleActions, IProductsModuleMutations>) {
        context.dispatch({type: "getProducts"});
    },
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
