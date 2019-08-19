import {Cart, Product} from "@/interfaces";

export interface IStore extends IProductsModuleState, IFiltersModuleState, ICartModuleState {
	loading: boolean
}

export interface IFiltersModuleState {
	filters: IFilter[];
	selectedFilters: Record<string, string[]>;
}

export interface IFilter {
	id: number;
	name: string;
	title: string;
	options: string[];
}

export interface IFilterModuleMutations {
	setFilters: IFilter[];
	setSelectedFilters: Record<string, string[]>;
}

export interface IFilterModuleActions {
	init: {};
	getFilters: {};
}

export interface IProductsModuleState {
	products: Product.IProduct[];
	activeCategory: string;
	loading: boolean;
}

export interface IProductsModuleMutations {
	setProducts: Product.IProduct[];
	setActiveCategory: string;
	setLoading: boolean;
}

export interface IProductsModuleGetters {
	indoor: Product.IProduct[];
	outdoor: Product.IProduct[];
	promotionProducts: Product.IProduct[];
	filteredProducts: Product.IProduct[];
}

export interface IProductModuleActions {
	init: {};
	getProducts: {};
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
	addItemToCart: Cart.ICartItem;
	deleteItemFromCart: number;
	deleteFirstNotification: undefined;
}

export interface ICartModuleGetters {
	generalPrice: number;
	generalQuantity: number;
}


