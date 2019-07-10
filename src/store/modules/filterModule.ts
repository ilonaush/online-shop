import {IFilterModuleActions, IFilterModuleMutations, IFiltersModuleState} from "@/store/interfaces";
import {FilterType} from "@/store/types";
import RequestService from "@/services/RequestService";
import {REQUEST_NAME} from "@/services/enums";
import {ActionContext, DefineActions, DefineMutations} from "vuex-type-helper";

const mutations: DefineMutations<IFilterModuleMutations, IFiltersModuleState> = {
    setFilters: (state: IFiltersModuleState, filters: object[]) => {
        state.filters = filters;
    },
    setSelectedFilters: (state: IFiltersModuleState, selectedFilters: Record<FilterType, string[]>) => {
        state.selectedFilters = selectedFilters;
    }
};

const actions: DefineActions<IFilterModuleActions, IFiltersModuleState, IFilterModuleMutations>  = {
    async init(context: ActionContext<IFiltersModuleState, {}, IFilterModuleActions, IFilterModuleMutations>) {
        context.dispatch({type: "getFilters"});
    },
    async getFilters(context: ActionContext<IFiltersModuleState, {}, IFilterModuleActions, IFilterModuleMutations>) {
        const {data: {filters}} = await RequestService.instance.get(REQUEST_NAME.getFilters);
        context.commit("setFilters", filters);
    },
};

export const filterModule = {
    namespaced: true,
    state: {
        filters: [],
        selectedFilters: {} as Record<FilterType, string[]>
    },
    mutations,
    actions
};
