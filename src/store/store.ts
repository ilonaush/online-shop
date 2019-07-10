import Vue from "vue";
import Vuex from "vuex";
import {cartModule} from "@/store/modules/cartModule";
import {productsModule} from "@/store/modules/productsModule";
import {modalModule} from "@/store/modules/modalModule";
import {filterModule} from "@/store/modules/filterModule";
import LocalStorageVuexPlugin from "@/plugins/LocalStorageVuexPlugin";
import {ModuleType} from "@/store/types";

Vue.use(Vuex);
const modules = {
    filterModule,
    productsModule,
    cartModule,
    modalModule
};

const store = new Vuex.Store({
    modules,
    plugins: [LocalStorageVuexPlugin.setLocalStorageState()]
});

console.log(modules);

for (const moduleName of Object.keys(modules)) {
    if (modules[moduleName as ModuleType] && modules[moduleName as ModuleType].actions) {
        // const actions = modules[moduleName as ModuleType]["actions"]
        // if ((modules[moduleName as ModuleType]["actions"] || {}).init) {
        //     store.dispatch(`${moduleName}/init`)
        // }
    }
}

export default store;
