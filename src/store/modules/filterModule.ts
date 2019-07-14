import {
    IFilter,
    IFilterModuleMutations,
    IFiltersModuleState,
    IStore,
    IFilterModuleActions
} from "@/store/interfaces";
import RequestService from "@/services/RequestService";
import {REQUEST_NAME} from "@/services/enums";
import {ActionTree, Module} from "vuex";
import {ActionContext, DefineMutations} from "vuex-type-helper";

const mutations: DefineMutations<IFilterModuleMutations, IFiltersModuleState> = {
    setFilters: (state: IFiltersModuleState, filters: IFilter[]) => {
        state.filters = filters;
    },
    setSelectedFilters: (state: IFiltersModuleState, selectedFilters: Record<string, string[]>) => {
        state.selectedFilters = selectedFilters;
    },
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
        selectedFilters: {} as Record<string, string[]>
    },
    mutations,
    actions
};
