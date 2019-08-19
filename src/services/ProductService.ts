import {Product} from "@/interfaces";
import IProduct = Product.IProduct;
import IReview = Product.IReview;
import {IFilter} from "@/store/interfaces";

/**
 * filters products
 * @param selectedFilters array of selected filters
 */
export function filterProducts(selectedFilters: Record<string, string[]>) {
	return function(product: IProduct) {
		const shouldBeIncluded = [];
		for (const filter in selectedFilters) {
			if (!product.hasOwnProperty(filter) && selectedFilters.hasOwnProperty(filter)) {
				shouldBeIncluded.push(false);
			} else {
				const someFiltersSelected = selectedFilters[filter].every(filterProductByFilterProperty(filter, product));
				shouldBeIncluded.push(someFiltersSelected);
			}
		}
		return shouldBeIncluded.every((iterationResult) => !!iterationResult);
	};
}

/**
 * checks whether products has some properties by which it must be included in filtered list
 * @param filter
 * @param product
 */
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

/**
 * sorts products by sorting type
 * @param products
 * @param sortType
 */
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

/**
 * sort with ascending order
 * @param property
 */
export function sortByAscendingProperty<PropType extends keyof Product.IProduct>(property: PropType) {
	return function(a: Product.IProduct, b: Product.IProduct) {
		return (a[property] > b[property]) ? 1 : -1;
	};
}

/**
 *  sort with descending order
 * @param property
 */
export function sortByDescendingProperty<PropType extends keyof Product.IProduct>(property: PropType) {
	return function(a: Product.IProduct, b: Product.IProduct) {
		return a[property] < b[property] ? 1 : -1;
	};
}

/**
 * checks whether first element in array is string
 * @param array
 */
function isStrings(array: string[] | IReview[] | number[]): array is string[] {
	return typeof array[0] === "string";
}

export function getEnumKeyByEnumValue(myEnum: any, enumValue: string) {
	const keys = Object.keys(myEnum).filter((value) => myEnum[value] === enumValue);
	return keys.length > 0 ? keys[0] : null;
}
