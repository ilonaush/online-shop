import {Module} from "vuex";
import {
    ICartModuleGetters,
    ICartModuleMutations,
    ICartModuleState,
} from "@/store/interfaces";
import { DefineGetters, DefineMutations } from 'vuex-type-helper';
import {getNotificationMessage} from "@/services/NotificationService";
import {NOTIFICATION_TYPES} from "@/services/enums";
import LocalStorageVuexPlugin from "@/plugins/LocalStorageVuexPlugin";
import {Cart} from "@/interfaces";
import ICartItem = Cart.ICartItem;

const getters: DefineGetters<ICartModuleGetters, ICartModuleState> = {
    generalPrice: (state) => {
        return state.items.reduce((sumAcc, currentItem) => sumAcc + (currentItem.price * currentItem.quantity), 0)
    },
    generalQuantity: (state) => {
        return state.items.reduce((sumAcc, currentItem) => sumAcc + currentItem.quantity, 0)
    }
};

const mutations: DefineMutations<ICartModuleMutations, ICartModuleState> = {
    setCartItemQty(state: ICartModuleState, {id, quantity}) {
        state.items = state.items.map((item: ICartItem) => {
            if (id === item.id) {
                item.quantity = quantity;
            }
            return item;
        });

    },
    addItemToCart(state: ICartModuleState, item) {
        const cartItem = {
            id: item.id,
            quantity: 1,
            price: item.price,
            name: item.name,
            img: item.img,
            color: item.color,
            flower: item.flower,
            size: item.size

        };
        state.items = [...state.items, cartItem ];
        state.notifications.push(getNotificationMessage(NOTIFICATION_TYPES.addToCart, {item}));
    },
    deleteItemFromCart(state: ICartModuleState, itemId) {
        const deletingItem = state.items.find((cartItem: ICartItem) => cartItem.id === itemId);
        state.items = state.items.filter((cartItem: ICartItem) => cartItem.id !== itemId);
        if (deletingItem) {
            state.quantity = state.quantity  - deletingItem.quantity;
        }
    },
    deleteFirstNotification(state: ICartModuleState) {
        state.notifications.shift();
    },
};

const initialCartState = LocalStorageVuexPlugin.getLocalStorageModuleState<ICartModuleState>("cartModule");

export const cartModule = {
    namespaced: true,
    getters,
    state: {
        items: initialCartState.items || [],
        notifications: initialCartState.notifications || [],
    },
    mutations
};
