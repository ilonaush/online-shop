import {IFilter} from "@/store/interfaces";
import RequestService from "@/services/RequestService";
import {REQUEST_NAME} from "@/services/enums";
import {Module, VuexModule, Mutation, Action} from "vuex-module-decorators";
import store from "@/store/store";

@Module({namespaced: true, store})
export default class FilterModule extends VuexModule {
	filters: IFilter[] = [];
	selectedFilters = {} as Record<string, string[]>;


	/**
	 * set filters
	 * @param filters
	 */
	@Mutation
	setFilters(filters: IFilter[]) {
		this.filters = filters;
	}

	/**
	 * set selected filters
	 * @param selectedFilters
	 */
	@Mutation
	setSelectedFilters(selectedFilters: Record<string, string[]>) {
		this.selectedFilters = selectedFilters;
	}

	/**
	 * init filter module data
	 */
	@Action
	init() {
		this.context.dispatch({type: "getFilters"});
	}

	/**
	 * action for getting filters data form the server
	 */
	@Action({rawError: true})
	async getFilters() {
		const {data: {filters}} = await RequestService.instance.get(REQUEST_NAME.getFilters);
		this.context.commit("setFilters", filters);
	}
}
