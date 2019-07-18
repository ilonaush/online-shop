import {Store} from "vuex";

export default {
    getLocalStorageModuleState<StateType>(module: string): StateType {
        return JSON.parse(localStorage.getItem("store") || "{}")[module] || {};
    },
    setLocalStorageState: () => {
        return (store: Store<{}>) => {
            store.subscribe(() => {
                localStorage.setItem("store", JSON.stringify(store.state));
            });
        };
    }
};
