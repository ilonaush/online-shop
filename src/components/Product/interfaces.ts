export interface IProduct {
    id: number;
    animalType: ANIMAL_TYPE;
    brand: string;
    name: string;
    rating: number;
    reviews: IReview[];
    price: string;
    quantity: number;
    availableCount: number[];
    shipping: DELIVERY_TERMS;
    mainImage: string;
    healthFeature: string[];
}

interface IReview {
    id: number;
    reviewerName: string;
    review: string;
}

enum DELIVERY_TERMS {
    "2-day" = "2-day delivery"
}

export enum ANIMAL_TYPE {
    dog = "DOG",
    cat= "CAT"
}
