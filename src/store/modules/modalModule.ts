import {Module} from "vuex";
import {IModalModuleMutations, IModalModuleState, IStore} from "@/store/interfaces";
import {DefineMutations} from "vuex-type-helper";

const mutations: DefineMutations<IModalModuleMutations, IModalModuleState> = {
    toggleModal(state: IModalModuleState, {isShown, type}) {
        state.showModal = isShown;
        state.activeModal = type;
    },
};

export const modalModule: Module<IModalModuleState, IStore> = {
    state: {
        showModal: false,
        activeModal: null
    },
    mutations,
};
