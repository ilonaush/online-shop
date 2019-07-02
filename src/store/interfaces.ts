import {IProduct} from "@/components/Product/interfaces";
import {FilterType} from "@/store/types";
import {MODAL_TYPE} from "@/store/enums";

export interface IStore extends IFiltersModule, IProductsModule, IModalModule {
}

export interface IFiltersModule {
    filters: object[];
    selectedFilters: Record<FilterType, string[]>;
}

export interface IProductsModule {
    products: IProduct[];
    filteredProducts: IProduct[];
    activeCategory: string;
}

export interface ICartModule {
    quantity: number;
    items: ICartItem[];
    showNotification: boolean;
    notifications: string[];
}

export interface  ICartItem {
    id: number;
    quantity: number;
    price: number;
    name: string;
    img: string;
}
export interface IModalModule {
    showModal: boolean;
    activeModal: MODAL_TYPE | null;
}
