import {Module} from "vuex";
import {
    ICartItem,
    ICartModuleGetters,
    ICartModuleMutations,
    ICartModuleState,
    IStore
} from "@/store/interfaces";
import { DefineGetters, DefineMutations } from 'vuex-type-helper'

const getters: DefineGetters<ICartModuleGetters, ICartModuleState> = {
    generalPrice: (state) => {
        return state.items.reduce((sumAcc, currentItem) => sumAcc + (currentItem.price * currentItem.quantity), 0)
    }
};

const mutations: DefineMutations<ICartModuleMutations, ICartModuleState> = {
    setCartItemQty(state: ICartModuleState, {id, quantity, replace}) {
        state.items = state.items.map((item: ICartItem) => {
            if (id === item.id) {
                if (replace) {
                    item.quantity = quantity;
                } else {
                    item.quantity += quantity;
                }
            }
            return item;
        });
    },
    deleteItemFromCart(state: ICartModuleState, itemId) {
        state.items = state.items.filter((cartItem : ICartItem) => cartItem.id !== itemId);
        state.quantity = state.quantity  - 1;
    },
    deleteFirstNotification(state: ICartModuleState) {
        state.notifications.shift();
    },
};

export const cartModule: Module<ICartModuleState, IStore> = {
    namespaced: true,
    getters,
    state: {
        items: [],
        quantity: 0,
        showNotification: false,
        notifications: [],
    },
    mutations
};
