import Vue from "vue";
import Vuex from "vuex";
import {cartModule} from "@/store/modules/cartModule";
import {productsModule} from "@/store/modules/productsModule";
import {modalModule} from "@/store/modules/modalModule";
import {filterModule} from "@/store/modules/filterModule";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        filterModule,
        productsModule,
        cartModule,
        modalModule
    },
});

store.subscribe((mutation, state) => {
    console.log(state, "subscribe");
});

export default store;
