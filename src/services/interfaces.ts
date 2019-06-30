import {AxiosInstance} from "axios";
import {IProduct} from "@/components/Product/interfaces";

export interface IRequestService {
    service: AxiosInstance;
}

export interface INotificationConfig {
    item?: IProduct;
    message?: string;
}
