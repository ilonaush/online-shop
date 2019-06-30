import {NOTIFICATION_TYPES} from "@/services/enums";
import {INotificationConfig} from "@/services/interfaces";
import {IProduct} from "@/components/Product/interfaces";

export function getNotificationMessage(notificationType: NOTIFICATION_TYPES, notificationConfig: INotificationConfig) {
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

function formNotificationMessage(notificationType: NOTIFICATION_TYPES, item: IProduct) {
    switch (notificationType) {
        case NOTIFICATION_TYPES.addToCart:
            return `${item.name} added to the cart`;
    }
}
