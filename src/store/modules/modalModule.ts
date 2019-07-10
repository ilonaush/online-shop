import {IModalModuleMutations, IModalModuleState} from "@/store/interfaces";
import {DefineMutations} from "vuex-type-helper";
import {MODAL_TYPE} from "@/store/enums";

const mutations: DefineMutations<IModalModuleMutations, IModalModuleState> = {
    openModal(state: IModalModuleState, type: MODAL_TYPE) {
        window.location.hash =  "#" + type;
    },
    closeModal(state: IModalModuleState) {
        window.location.hash = "";
    },
};

export const modalModule = {
    mutations,
};
