import {NOTIFICATION_TYPES} from "@/services/enums";
import {Notification, Product} from "@/interfaces";

export function getNotificationMessage(notificationType: NOTIFICATION_TYPES, notificationConfig: Notification.INotificationConfig) {
    switch (notificationType) {
        case NOTIFICATION_TYPES.addToCart:
            if (notificationConfig.message) {
                return notificationConfig.message;
            } else if (notificationConfig.item) {
                return formNotificationMessage(notificationType, notificationConfig.item);
            } else {
                return  "";
            }
    }
}

function formNotificationMessage(notificationType: NOTIFICATION_TYPES, item: Product.IProduct) {
    switch (notificationType) {
        case NOTIFICATION_TYPES.addToCart:
            return `${item.name} added to the cart`;
    }
}
