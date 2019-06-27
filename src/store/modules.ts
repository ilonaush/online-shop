import RequestService from "@/services/RequestService";
import {Module} from "vuex";
import {RequestName} from "@/services/enums";

export const filterModule:  Module<IFiltersModule, IStore> = {
    namespaced: true,
    state: {
        filters: []
    },
    mutations: {
        setFilters: function (state: IFiltersModule, filters: object[]) {
            state.filters = filters;
        }
    },
    actions: {
        async getFilters(context) {
            const {data: {filters}} = await RequestService.instance.get(RequestName.getFilters);
            context.commit("setFilters", filters);
        }
    },
};

export const productsModule:  Module<IProductsModule, IStore> = {
    namespaced: true,
    state: {
        foodProducts: []
    },
    mutations: {
        setFoodProducts: function (state: IProductsModule, products: object[]) {
            state.foodProducts = products;
        }
    },
    actions: {
        async getProducts(context, type) {
            const {data} = await RequestService.instance.get(type);
            context.commit("setFoodProducts", data);
        }
    },
};
