import RequestService from "@/services/RequestService";
import {Module} from "vuex";
import {NOTIFICATION_TYPES, REQUEST_NAME} from "@/services/enums";
import {getNotificationMessage} from "@/services/NotificationService";
import {IProduct} from "@/components/Product/interfaces";
import {ICartModule, IFiltersModule, IProductsModule, IStore} from "@/store/interfaces";
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
            debugger;
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
            debugger;
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

    state: {
        items: [],
        quantity: 0,
        showNotification: false,
        notifications: [],
        generalPrice: 0,
    },
    mutations: {
        setQty(state: ICartModule, quantity) {
            state.quantity = state.quantity + quantity;
        },
        addItemToCart(state: ICartModule, item) {
            state.items.push(item.id);
            state.quantity = state.quantity + item.quantity;
            state.generalPrice = state.generalPrice + item.price;
            state.notifications.push(getNotificationMessage(NOTIFICATION_TYPES.addToCart, {item}));
        },
        deleteFirstNotification(state: ICartModule) {
            state.notifications.shift();
        },
    },
};
