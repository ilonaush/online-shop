import {Store} from "vuex";
import {IStore} from "@/store/interfaces";

export default {
    getLocalStorageModuleState<StateType>(module: string) : StateType {
        return JSON.parse(localStorage.getItem("store") || "{}")[module];
    },
    setLocalStorageState: () => {
        return (store: Store<IStore>) => {
            store.subscribe(() => {
                localStorage.setItem("store", JSON.stringify(store.state))
            });
        };
    }
}
