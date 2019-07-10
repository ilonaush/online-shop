import Vue from "vue";
import Vuex from "vuex";
import {cartModule} from "@/store/modules/cartModule";
import {productsModule} from "@/store/modules/productsModule";
import {modalModule} from "@/store/modules/modalModule";
import {filterModule} from "@/store/modules/filterModule";
import LocalStorageVuexPlugin from "@/plugins/LocalStorageVuexPlugin";
import {IStore} from "@/store/interfaces";

Vue.use(Vuex);

const store = new Vuex.Store<IStore>({
    modules: {
        filterModule,
        productsModule,
        cartModule,
        modalModule
    },
    plugins: [LocalStorageVuexPlugin.setLocalStorageState()]
});

// for (const moduleName of Object.keys(modules)) {
//     if (("actions" in modules[moduleName as ModuleType] && modules[moduleName as ModuleType].actions || {}).init) {
//         store.dispatch(`${moduleName}/init`)
//     }
// }

export default store;
