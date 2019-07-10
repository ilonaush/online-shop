import {
    IFilter,
    IFilterModuleActions, IFilterModuleGetters,
    IFilterModuleMutations,
    IFiltersModuleState,
    IProductsModuleGetters, IProductsModuleState,
    IStore
} from "@/store/interfaces";
import {FilterType} from "@/store/types";
import RequestService from "@/services/RequestService";
import {REQUEST_NAME} from "@/services/enums";
import {ActionContext, DefineActions, DefineGetters, DefineMutations} from "vuex-type-helper";
import {ActionTree, Module} from "vuex";
import {Product} from "@/interfaces";
import IProduct = Product.IProduct;

const mutations: DefineMutations<IFilterModuleMutations, IFiltersModuleState> = {
    setFilters: (state: IFiltersModuleState, filters: IFilter[]) => {
        state.filters = filters;
    },
    setSelectedFilters: (state: IFiltersModuleState, selectedFilters: Record<FilterType, string[]>) => {
        state.selectedFilters = selectedFilters;
    }
};

const actions: ActionTree<IFiltersModuleState, IStore>  = {
    async init(context: ActionContext<IFiltersModuleState, {}, IFilterModuleActions, IFilterModuleMutations>) {
        context.dispatch({type: "getFilters"});
    },
    async getFilters(context: ActionContext<IFiltersModuleState, {}, IFilterModuleActions, IFilterModuleMutations>) {
        const {data: {filters}} = await RequestService.instance.get(REQUEST_NAME.getFilters);
        context.commit("setFilters", filters);
    },
};

const getters: DefineGetters<IFilterModuleGetters, IFiltersModuleState> = {
    availableFilters: (state, getters, rootState, rootGetters) => {
        console.log(getters, rootGetters);
        const availableFilters: any[] = [];
        rootGetters["productsModule/filteredProducts"].forEach((product: Product.IProduct) => {
            product.filters.forEach((filterId) => {
                let productFilter = availableFilters.find((filter) => filter.id === filterId);
                const originalFilter = state.filters.find((filter) => filter.id === filterId) ;
                if (!productFilter) {
                    productFilter = {
                        id: filterId,
                        ...originalFilter,
                        options: [...(originalFilter && product[originalFilter.name as keyof Product.IProduct] ?  [product[originalFilter.name as keyof Product.IProduct]] : [])],
                        availableItems: 1
                    };
                    availableFilters.push(productFilter);
                } else {
                    productFilter.availableItems += 1;
                    const option = originalFilter && product[originalFilter.name as keyof Product.IProduct] && product[originalFilter.name as keyof Product.IProduct];
                    if (option && !productFilter.options.includes(option)) {
                        productFilter.options.push(option);
                    }
                }

            });
        });
        return availableFilters;
    }
};

export const filterModule: Module<IFiltersModuleState, IStore> = {
    namespaced: true,
    state: {
        filters: [],
        selectedFilters: {} as Record<FilterType, string[]>
    },
    mutations,
    getters,
    actions
};
