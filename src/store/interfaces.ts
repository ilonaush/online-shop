import {FilterType} from "@/store/types";
import {MODAL_TYPE} from "@/store/enums";
import {Cart, Product} from "@/interfaces";

export interface IStore {
}

export interface IFiltersModuleState {
    filters: object[];
    selectedFilters: Record<FilterType, string[]>;
}

export interface IFilterModuleMutations {
    setFilters: object[];
    setSelectedFilters: Record<FilterType, string[]>;
}

export interface IFilterModuleActions {
    init: {};
    getFilters: {};
}

export interface IProductsModuleState {
    products: Product.IProduct[];
    activeCategory: string;
}

export interface IProductsModuleMutations {
    setProducts:  Product.IProduct[];
    setActiveCategory: string;
}

export interface IProductsModuleGetters {
    filteredProducts:  Product.IProduct[];
    promotionProducts:  Product.IProduct[];
    bath:  Product.IProduct[];
    food:  Product.IProduct[];
    toys:  Product.IProduct[];
}

export interface IProductModuleActions {
    init: {},
    getProducts: {}
}

export interface ICartModuleState {
    quantity: number;
    items: Cart.ICartItem[];
    showNotification: boolean;
    notifications: string[];
}

export interface ICartModuleMutations {
    setCartItemQty: {
        id: number;
        quantity: number;
        replace: boolean;
    };
    addItemToCart: Product.IProduct;
    deleteItemFromCart: number;
    deleteFirstNotification: undefined;
}

export interface ICartModuleGetters {
    generalPrice: number;
}

export interface IModalModuleState {
    showModal: boolean;
    activeModal: MODAL_TYPE | null;
}

export interface IModalModuleMutations {
    openModal: MODAL_TYPE;
    closeModal: void;

}
