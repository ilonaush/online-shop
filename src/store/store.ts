import Vue from "vue";
import Vuex from "vuex";
import LocalStorageVuexPlugin from "@/plugins/LocalStorageVuexPlugin";
import {ModuleType} from "@/store/types";
import {default as productsModule} from "@/store/modules/productsModule";
import {default as filterModule} from "@/store/modules/filterModule";
import {default as cartModule} from "@/store/modules/cartModule";

Vue.use(Vuex);

const modules = {
	filterModule,
	cartModule,
	productsModule,
};

const store = new Vuex.Store({
	modules,
	plugins: [LocalStorageVuexPlugin.setLocalStorageState()]
});

/**
 * finds all the init methods in modules and calls them
 */
function laucnhInitModuleMethods() {
	for (const moduleName of Object.keys(modules)) {
		if (modules[moduleName as ModuleType] && "actions" in modules[moduleName as ModuleType]) {
			const module = modules[moduleName as ModuleType];
			if ("actions" in module) {
				const actions = module.actions;
				if ((actions || {}).init) {
					store.dispatch(`${moduleName}/init`);
				}
			}
		}
	}
}

laucnhInitModuleMethods();

export default store;
