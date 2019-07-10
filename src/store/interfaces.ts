import {FilterType} from "@/store/types";
import {MODAL_TYPE} from "@/store/enums";
import {Cart, Product} from "@/interfaces";

export interface IStore {
}

export interface IFiltersModuleState {
    filters: IFilter[];
    selectedFilters: Record<FilterType, string[]>;
}
export interface IFilter {
    id: number;
    name: string;
    title: string;
    options: string[];
}

export interface IFilterModuleMutations {
    setFilters: IFilter[];
    setSelectedFilters: Record<FilterType, string[]>;
}

export interface IFilterModuleActions {
    init: {};
    getFilters: {};
}

export interface IFilterModuleGetters {
    availableFilters: any;
}

export interface IProductsModuleState {
    products: Product.IProduct[];
    activeCategory: string;
}

export interface IProductsModuleMutations {
    setProducts: Product.IProduct[];
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
    generalQuantity: number;
}
