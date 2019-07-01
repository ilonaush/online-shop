import {IProduct} from "@/components/Product/interfaces";
import {FilterType} from "@/store/types";

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
    generalPrice: number;
    items: number[];
    showNotification: boolean;
    notifications: string[];
}
export interface IModalModule {
    showModal: boolean;
}
