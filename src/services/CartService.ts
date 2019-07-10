import store from "@/store/store";


export function handleAddToCartItem(addItemEntity: any) {
    store.commit("cartModule/addItemToCart", {item: addItemEntity});
};
