import {MODAL_TYPE} from "../store/enums";

export function openModal(type: MODAL_TYPE) {
    window.location.hash =  "#" + type;
}

export function closeModal() {
    window.location.hash = "";
}
