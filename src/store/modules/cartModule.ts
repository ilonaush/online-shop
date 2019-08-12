import {
	ICartModuleState,
} from "@/store/interfaces";
import {getNotificationMessage} from "@/services/NotificationService";
import {NOTIFICATION_TYPES} from "@/services/enums";
import LocalStorageVuexPlugin from "@/plugins/LocalStorageVuexPlugin";
import {Cart} from "@/interfaces";
import ICartItem = Cart.ICartItem;
import store from "@/store/store";
import {Module, VuexModule, Mutation} from "vuex-module-decorators";

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

	@Mutation
	addItemToCart(item: Cart.ICartItem) {
		console.log(item);
		debugger;
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
		this.notifications.push(getNotificationMessage(NOTIFICATION_TYPES.addToCart, {item}));
	}

	@Mutation
	setCartItemQty(cartItem: Pick<Cart.ICartItem, "id" | "quantity">) {
		this.items = this.items.map((item: ICartItem) => {
			if (cartItem.id === item.id) {
				item.quantity = cartItem.quantity;
			}
			return item;
		});
	}

	@Mutation
	deleteItemFromCart(itemId: number) {
		const deletingItem = this.items.find((cartItem: ICartItem) => cartItem.id === itemId);
		this.items = this.items.filter((cartItem: ICartItem) => cartItem.id !== itemId);
		if (deletingItem) {
			this.quantity = this.quantity - deletingItem.quantity;
		}
	}

	@Mutation
	deleteFirstNotification() {
		this.notifications.shift();
	}

	@Mutation
	resetCart() {
		this.items = [];
		this.quantity = 0;
		this.notifications = [];
		localStorage.removeItem("store");
	}

}
