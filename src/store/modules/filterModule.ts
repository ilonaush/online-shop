import {IFilter} from "@/store/interfaces";
import RequestService from "@/services/RequestService";
import {REQUEST_NAME} from "@/services/enums";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "@/store/store";

@Module({namespaced: true, store: store})
export default class FilterModule extends VuexModule {
    filters: IFilter[] = [];
    selectedFilters =  {} as Record<string, string[]>;


    @Mutation
    setSelectedFilters(filters: IFilter[]) {
        this.filters = filters;
    }

    @Mutation
    setFilters(selectedFilters: Record<string, string[]>) {
        this.selectedFilters = selectedFilters;
    }

    @Action
    init() {
        this.context.dispatch({type: "getFilters"});
    }
    // action 'decr' commits mutation 'decrement' when done with return value as payload
    @Action({rawError: true})
    async getFilters() {
        const {data: {filters}} = await RequestService.instance.get(REQUEST_NAME.getFilters);
        this.context.commit("setFilters", filters);
    }
}