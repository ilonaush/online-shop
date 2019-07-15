import {Product} from "@/interfaces";

export function sortByAcsendingRating(a: Product.IProduct, b: Product.IProduct) {
    return  (a.rating > b.rating) ? 1 : -1;
}
export function sortByDescendingRating(a: Product.IProduct, b: Product.IProduct) {
    return a.rating < b.rating ? 1 : -1;
}

export function sortByAcsendingPrice(a: Product.IProduct, b: Product.IProduct) {
    return  (a.price > b.price) ? 1 : -1;
}
export function sortByDescendingPrice(a: Product.IProduct, b: Product.IProduct) {
    return a.price < b.price ? 1 : -1;
}
