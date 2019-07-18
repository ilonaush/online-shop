import {Product} from "@/interfaces";
import IProduct = Product.IProduct;
import IReview = Product.IReview;

export function filterProducts(selectedFilters: any) {
    return function(product: IProduct) {
        const shouldBeIncluded = [];
        for (const filter in selectedFilters) {
            if (!product.hasOwnProperty(filter) && selectedFilters.hasOwnProperty(filter)) {
                shouldBeIncluded.push(false);
            } else {
                const someFiltersSelected =  selectedFilters[filter].every(filterProductByFilterProperty(filter, product));
                shouldBeIncluded.push(someFiltersSelected);
            }
        }
        return shouldBeIncluded.every((iterationResult) => !!iterationResult);
    };
}

function filterProductByFilterProperty(filter: string, product: IProduct) {
    return function(filterProperty: string) {
        if (filter !== "reviews" && product[filter as keyof IProduct]) {
            const productFilter = product[filter as keyof IProduct] || [];
            if (Array.isArray(productFilter) && isStrings(productFilter)) {
                return productFilter.includes(filterProperty);
            }
        }
    };
}

export function sortProducts(products: IProduct[], sortType: string) {
    const sortingConfig = sortType.split(".");
    const sortingProperty = sortingConfig[0] as keyof Product.IProduct;
    const sortingOrder = sortingConfig[1];
    let sortedArr: IProduct[] = [];
    if (sortingOrder === "lowest") {
        sortedArr = [...products.sort(sortByAscendingProperty(sortingProperty))];
    } else if (sortingOrder === "highest") {
        sortedArr = [...products.sort(sortByDescendingProperty(sortingProperty))];
    }
    return sortedArr;
}

export function sortByAscendingProperty<PropType extends keyof Product.IProduct>(property: PropType) {
    return function(a: Product.IProduct, b: Product.IProduct) {
        return ( a[property] > b[property]) ? 1 : -1;
    };
}

export function sortByDescendingProperty<PropType extends keyof Product.IProduct>(property: PropType) {
    return function(a: Product.IProduct, b: Product.IProduct) {
        return a[property] < b[property] ? 1 : -1;
    };
}

function isStrings(array: string[] | IReview[] | number[]): array is string[] {
    return typeof array[0] === "string";
}
