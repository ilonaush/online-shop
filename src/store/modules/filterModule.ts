import {
    IFilter,
    IFilterModuleActions, IFilterModuleGetters,
    IFilterModuleMutations,
    IFiltersModuleState,
    IProductsModuleGetters, IProductsModuleState,
    IStore
} from "@/store/interfaces";
import {CategoryType, FilterType} from "@/store/types";
import RequestService from "@/services/RequestService";
import {REQUEST_NAME} from "@/services/enums";
import {ActionContext, DefineActions, DefineGetters, DefineMutations} from "vuex-type-helper";
import {ActionTree, Module} from "vuex";
import {Product} from "@/interfaces";
import IProduct = Product.IProduct;
import IReview = Product.IReview;

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
        const availableFilters: any[] = [];
        const activeCategory = rootState.productsModule.activeCategory;
        rootGetters[`productsModule/${activeCategory as CategoryType}`].forEach((product: Product.IProduct) => {
            product.filters.forEach((filterId) => {
                let productFilter = availableFilters.find((filter) => filter.id === filterId);
                const originalFilter = state.filters.find((filter) => filter.id === filterId) ;
                if (!productFilter) {
                    if (originalFilter) {
                        productFilter = {
                            id: filterId,
                            ...originalFilter,
                            options: originalFilter.options.map((option: string) => {
                                let availableItems: number = 0;
                                if (product[originalFilter.name as keyof Product.IProduct]) {
                                    const productFilterOption = product[originalFilter.name as keyof Product.IProduct];
                                    if (productFilterOption && (Array.isArray(productFilterOption) || typeof productFilterOption === "string")) {
                                        console.log(product);
                                        availableItems = productFilterOption.includes(option as string & number & IReview)  ? 1 : 0;
                                    }
                                }

                                const selectedOptionParent = state.selectedFilters[originalFilter.name as keyof Product.IProduct];
                                const selectedOption = selectedOptionParent && selectedOptionParent.includes(option);
                                return {
                                    value: option,
                                    availableItems,
                                    filterTypeSelected: !!selectedOptionParent,
                                    isInFilter: selectedOption
                                };
                            })
                        };
                        availableFilters.push(productFilter);
                    }
                } else {
                   productFilter.options.forEach((option: {availableItems: number, value: string}) => {
                       if (originalFilter && product[originalFilter.name as keyof Product.IProduct]) {
                           const productFilterOption = product[originalFilter.name as keyof Product.IProduct];
                           console.log(productFilterOption);
                           if (productFilterOption && (Array.isArray(productFilterOption) || typeof productFilterOption === "string")) {
                               if (productFilterOption.includes(option.value as string & number & IReview)  && rootGetters['productsModule/filteredProducts'].find((filteredProduct => filteredProduct.id === product.id))) {
                                   option.availableItems += 1;
                               }
                           }
                       }
                   });
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
