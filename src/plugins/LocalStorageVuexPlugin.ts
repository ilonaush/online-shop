import {Store} from "vuex";

//TODO: fix type store
export default {
    getLocalStorageModuleState<StateType>(module: string): StateType {
        return JSON.parse(localStorage.getItem("store") || "{}")[module] || {};
    },
    setLocalStorageState: () => {
        return (store: Store<any>) => {
            store.subscribe(() => {
                localStorage.setItem("store", JSON.stringify(store.state));
            });
        };
    }
};
