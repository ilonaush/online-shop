import {IProduct} from "@/components/Product/interfaces";
import {FilterType} from "@/store/types";
import {MODAL_TYPE} from "@/store/enums";

export interface IStore extends IFiltersModuleState, IProductsModuleState, IModalModuleState {
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

}

export interface IProductsModuleState {
    products: IProduct[];
    activeCategory: string;
}

export interface IProductsModuleMutations {
    setProducts: IProduct[];
    setActiveCategory: string;
}

export interface IProductsModuleGetters {
    filteredProducts: IProduct[];
    promotionProducts: IProduct[];
    bath: IProduct[];
    food: IProduct[];
    toys: IProduct[];
}

export interface IProductModuleActions {

}

export interface ICartModuleState {
    quantity: number;
    items: ICartItem[];
    showNotification: boolean;
    notifications: string[];
}

export interface ICartModuleMutations {
    setCartItemQty: {
        id: number;
        quantity: number;
        replace: boolean;
    };
    addItemToCart: IProduct;
    deleteItemFromCart: number;
    deleteFirstNotification: undefined;
}

export interface ICartModuleGetters {
    generalPrice: number;
}

export interface  ICartItem {
    id: number;
    quantity: number;
    price: number;
    name: string;
    img: string;
}
export interface IModalModuleState {
    showModal: boolean;
    activeModal: MODAL_TYPE | null;
}

export interface IModalModuleMutations {
    toggleModal: {
        isShown: boolean;
        type: MODAL_TYPE;
    }
}
