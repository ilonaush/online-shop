import RequestService from "@/services/RequestService";
import {Module} from "vuex";
import {NOTIFICATION_TYPES, REQUEST_NAME} from "@/services/enums";
import {getNotificationMessage} from "@/services/NotificationService";
import {IProduct} from "@/components/Product/interfaces";
import {ICartItem, ICartModule, IFiltersModule, IModalModule, IProductsModule, IStore} from "@/store/interfaces";
import {FilterType, CategoryType} from "@/store/types";
import get = Reflect.get;

export const filterModule: Module<IFiltersModule, IStore> = {
    namespaced: true,
    state: {
        filters: [],
        selectedFilters: {} as Record<FilterType, string[]>
    },
    getters: {
        selectedFilters: (state) => {
            return state.selectedFilters;
        },
    },
    mutations: {
        setFilters: (state: IFiltersModule, filters: object[]) => {
            state.filters = filters;
        },
        setSelectedFilters: (state: IFiltersModule, selectedFilters: Record<FilterType, string[]>) => {
            state.selectedFilters = selectedFilters;
        }
    },
    actions: {
        async getFilters(context) {
            const {data: {filters}} = await RequestService.instance.get(REQUEST_NAME.getFilters);
            context.commit("setFilters", filters);
        },
    },
};

export const productsModule: Module<IProductsModule, IStore> = {
    namespaced: true,
    getters: {
        filteredProducts: (state, getters, rootState, rootGetters) => {
            const selectedFilters = rootGetters["filterModule/selectedFilters"];
            if (Object.keys(selectedFilters).length) {
                return getters[state.activeCategory as CategoryType].filter((product: IProduct) => {
                    for (const filter in selectedFilters) {
                        if (!product.hasOwnProperty(filter) && selectedFilters.hasOwnProperty(filter)) {
                            return false;
                        } else {
                            return selectedFilters[filter].every((x: FilterType) => {
                                return product[filter as FilterType].includes(x);
                            });
                        }
                    }

                });
            } else {
                return getters[state.activeCategory as CategoryType];
            }
        },
        food: (state) => {
             return state.products.filter((product) => product.category === "food");
        },
        toys: (state) => {
            return state.products.filter((product) => product.category === "toys");
        },
        bath: (state) => {
            return state.products.filter((product) => product.category === "bath");
        },
    },
    state: {
        products: [],
        filteredProducts: [],
        activeCategory: "",
    },
    mutations: {
        setProducts(state: IProductsModule, products: IProduct[]) {
            state.products = products;
        },
        setActiveCategory(state: IProductsModule, category: string) {
            state.activeCategory = category;
        },
    },
    actions: {
        async getProducts(context) {
            const {data: {items}} = await RequestService.instance.get("/");
            context.commit("setProducts", items);
        },
    },
};

export const cartModule: Module<ICartModule, IStore> = {
    namespaced: true,
    getters: {
        generalPrice: (state) => {
            console.log("count");
            return state.items.reduce((sumAcc, currentItem) => sumAcc + (currentItem.price * currentItem.quantity), 0)
        }
    },
    state: {
        items: [],
        quantity: 0,
        showNotification: false,
        notifications: [],
    },
    mutations: {
        setCartItemQty(state: ICartModule, {id, quantity, replace}) {
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
        addItemToCart(state: ICartModule, item) {
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
        deleteItemFromCart(state: ICartModule, itemId) {
            state.items = state.items.filter(cartItem => cartItem.id !== itemId);
            state.quantity = state.quantity  - 1;
        },
        deleteFirstNotification(state: ICartModule) {
            state.notifications.shift();
        },
    },
};

export const modalModule: Module<IModalModule, IStore> = {
    state: {
        showModal: false,
        activeModal: null
    },
    mutations: {
        toggleModal(state: IModalModule, {isShown, type}) {
            state.showModal = isShown;
            state.activeModal = type;
        },
    },
};
