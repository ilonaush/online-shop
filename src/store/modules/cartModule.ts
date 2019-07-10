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
    addItemToCart(state: ICartModuleState, item) {
        const cartItem = {
            id: item.id,
            quantity: 1,
            price: item.price,
            name: item.name,
            img: item.mainImage

        };
        state.items = [...state.items, cartItem ];
        state.quantity = state.quantity + cartItem.quantity;
        state.notifications.push(getNotificationMessage(NOTIFICATION_TYPES.addToCart, {item}));
    },
    deleteItemFromCart(state: ICartModuleState, itemId) {
        state.items = state.items.filter((cartItem : ICartItem) => cartItem.id !== itemId);
        state.quantity = state.quantity  - 1;
    },
    deleteFirstNotification(state: ICartModuleState) {
        state.notifications.shift();
    },
};

export const cartModule = {
    namespaced: true,
    getters,
    state: LocalStorageVuexPlugin.getLocalStorageModuleState<ICartModuleState>("cartModule"),
    mutations
};
