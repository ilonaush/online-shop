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

export enum ANIMAL_TYPE {
    dog = "DOG",
    cat= "CAT"
}
