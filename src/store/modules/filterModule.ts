import {IFilterModuleActions, IFilterModuleMutations, IFiltersModuleState, IStore} from "@/store/interfaces";
import {FilterType} from "@/store/types";
import RequestService from "@/services/RequestService";
import {REQUEST_NAME} from "@/services/enums";
import {ActionContext, DefineActions, DefineMutations} from "vuex-type-helper";
import {ActionTree, Module} from "vuex";

const mutations: DefineMutations<IFilterModuleMutations, IFiltersModuleState> = {
    setFilters: (state: IFiltersModuleState, filters: object[]) => {
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

export const filterModule: Module<IFiltersModuleState, IStore> = {
    namespaced: true,
    state: {
        filters: [],
        selectedFilters: {} as Record<FilterType, string[]>
    },
    mutations,
    actions
};
