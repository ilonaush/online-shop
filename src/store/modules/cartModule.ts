import {
	ICartModuleState,
} from "@/store/interfaces";
import {getNotificationMessage} from "@/services/NotificationService";
import {NOTIFICATION_TYPES} from "@/services/enums";
import LocalStorageVuexPlugin from "@/plugins/LocalStorageVuexPlugin";
import {Cart} from "@/interfaces";
import ICartItem = Cart.ICartItem;
import store from "@/store/store";
import {Module, VuexModule, Mutation, Action} from "vuex-module-decorators";

const initialCartState = LocalStorageVuexPlugin.getLocalStorageModuleState<ICartModuleState>("cartModule");


@Module({namespaced: true, store})
export default class CartModule extends VuexModule {
	items = initialCartState.items || [];
	notifications = initialCartState.notifications || [];
	quantity: number = 0;

	get generalPrice() {
		return this.items.reduce((sumAcc, currentItem) => sumAcc + (currentItem.price * currentItem.quantity), 0);
	}

	get generalQuantity() {
		return this.items.reduce((sumAcc, currentItem) => sumAcc += 1, 0);

	}

	/**
	 * adds item to the cart and pushes notification about it to notification service
	 * @param item
	 */
	@Mutation
	addItemToCart(item: Cart.ICartItem) {
		const cartItem = {
			id: item.id,
			quantity: 1,
			price: item.price,
			name: item.name,
			img: item.img,
			color: item.color,
			flower: item.flower,
			size: item.size

		};
		this.items = [...this.items, cartItem];
	}

	/**
	 * sets cart item quantity
	 * @param cartItem
	 */
	@Mutation
	setCartItemQty(cartItem: Pick<Cart.ICartItem, "id" | "quantity">) {
		this.items = this.items.map((item: ICartItem) => {
			if (cartItem.id === item.id) {
				item.quantity = cartItem.quantity;
			}
			return item;
		});
	}

	/**
	 * deletes item from the cart
	 * @param itemId
	 */
	@Mutation
	deleteItemFromCart(itemId: string) {
		const deletingItem = this.items.find((cartItem: ICartItem) => cartItem.id === itemId);
		this.items = this.items.filter((cartItem: ICartItem) => cartItem.id !== itemId);
		if (deletingItem) {
			this.quantity = this.quantity - deletingItem.quantity;
		}
	}

	/**
	 * delete first notification message after its outdating
	 */
	@Mutation
	deleteFirstNotification() {
		this.notifications.shift();
	}

	/**
	 * resets cart
	 */
	@Mutation
	resetCart() {
		this.items = [];
		this.quantity = 0;
		this.notifications = [];
		localStorage.removeItem("store");
	}

	@Action
	checkItemExistenceInCart(item: ICartItem) {
		const cartItem = this.items.find((product: ICartItem) => product.id === item.id);
		this.notifications.push(getNotificationMessage(NOTIFICATION_TYPES.addToCart, {item}));
		if (cartItem) {
			this.context.commit("setCartItemQty", {id: item.id, quantity: cartItem.quantity + 1});
		} else {
			this.context.commit("addItemToCart", item);
		}
	}
}
