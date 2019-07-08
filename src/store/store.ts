import Vue from "vue";
import Vuex from "vuex";
import {cartModule} from "@/store/modules/cartModule";
import {productsModule} from "@/store/modules/productsModule";
import {modalModule} from "@/store/modules/modalModule";
import {filterModule} from "@/store/modules/filterModule";
import LocalStorageVuexPlugin from "@/plugins/LocalStorageVuexPlugin";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        filterModule,
        productsModule,
        cartModule,
        modalModule
    },
    plugins: [LocalStorageVuexPlugin.setLocalStorageState()]
});

export default store;
