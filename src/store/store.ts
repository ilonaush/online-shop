import Vue from "vue";
import Vuex from "vuex";
import {cartModule} from "@/store/modules/cartModule";
import {productsModule} from "@/store/modules/productsModule";
import {filterModule} from "@/store/modules/filterModule";
import LocalStorageVuexPlugin from "@/plugins/LocalStorageVuexPlugin";
import {ModuleType} from "@/store/types";
import LoggerPlugin from "../plugins/LoggerPlugin";

Vue.use(Vuex);

const modules = {
    filterModule,
    productsModule,
    cartModule,
};

const store = new Vuex.Store({
    modules,
    plugins: [LocalStorageVuexPlugin.setLocalStorageState(), LoggerPlugin.setLogger()]
});


for (const moduleName of Object.keys(modules)) {
    if (modules[moduleName as ModuleType] && "actions" in modules[moduleName as ModuleType]) {
        const module =  modules[moduleName as ModuleType];
        if ("actions" in module) {
            const actions = module.actions;
            if ((actions || {}).init) {
                store.dispatch(`${moduleName}/init`);
            }
        }

    }
}

export default store;
