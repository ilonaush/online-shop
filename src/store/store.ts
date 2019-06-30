import Vue from "vue";
import Vuex from "vuex";
import {cartModule, filterModule, productsModule} from "@/store/modules";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        filterModule,
        productsModule,
        cartModule
    },
});

store.subscribe((mutation, state) => {
    console.log(state, "subscribe");
});

export default store;
