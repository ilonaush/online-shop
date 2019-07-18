import {NOTIFICATION_TYPES} from "@/services/enums";
import {Cart, Notification} from "@/interfaces";

export function getNotificationMessage(notificationType: NOTIFICATION_TYPES, notificationConfig: Notification.INotificationConfig) {
    if (notificationType === NOTIFICATION_TYPES.addToCart) {
        if (notificationConfig.message) {
            return notificationConfig.message;
        } else if (notificationConfig.item) {
            return formNotificationMessage(notificationType, notificationConfig.item);
        } else {
            return  "";
        }
    } else {
        return "";
    }
}

function formNotificationMessage(notificationType: NOTIFICATION_TYPES, item: Cart.ICartItem) {
    if (notificationType === NOTIFICATION_TYPES.addToCart) {
        return `${item.name} added to the cart`;
    } else {
        return "";
    }
}
