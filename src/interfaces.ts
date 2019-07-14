import {Vue} from "vue/types/vue";
import {AxiosInstance} from "axios";

export namespace Product {
     export interface IProduct {
        id: number;
        availableFlowerType: string[];
        category: CATEGORY;
        remnants: number;
        colors: string[];
        sizes: string[];
        name: string;
        rating: number;
        reviews: IReview[];
        price: number;
        oldPrice?: number;
        images: string [];
        filters: number[];
    }

     export interface IReview {
        id: number;
        reviewerName: string;
        reviewText: string;
        mark: number;
        advantages: string;
        disadvantages: string;
    }

    export enum CATEGORY {
        indoor = 1,
        outdoor
    }
}

export namespace  Cart {

    export interface  ICartItem {
        id: number;
        quantity: number;
        price: number;
        name: string;
        img: string;
    }
}

export namespace  Tabs {

    export interface ITabsMenuItem extends Vue {
        name: string;
        href: string;
        isActive: boolean;
    }

}

export namespace Notification {

    export interface INotification {
        deleteFirstNotification: () => void;
    }

    export interface INotificationConfig {
        item?: Product.IProduct;
        message?: string;
    }
}

export namespace  RequestService {
    export interface IRequestService {
        service: AxiosInstance;
    }
}
