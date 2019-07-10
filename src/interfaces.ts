import {Vue} from "vue/types/vue";
import {AxiosInstance} from "axios";

export namespace Product {
     export interface IProduct {
        id: number;
        animalType: ANIMAL_TYPE;
        category: string;
        brand: string;
        name: string;
        rating: number;
        reviews: IReview[];
        price: number;
        oldPrice?: number;
        quantity: number;
        availableCount: number[];
        shipping: DELIVERY_TERMS;
        mainImage: string;
        healthFeature: string[];
    }

     export interface IReview {
        id: number;
        reviewerName: string;
        reviewText: string;
        mark: number;
        advantages: string;
        disadvantages: string;
    }

    enum DELIVERY_TERMS {
        "2-day" = "2-day delivery"
    }

     enum ANIMAL_TYPE {
        dog = "DOG",
        cat= "CAT"
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
