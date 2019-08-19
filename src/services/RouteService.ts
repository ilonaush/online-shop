import {MODAL_TYPE} from "@/store/enums";

/**
 * sets hash to open certain modal
 * @param type
 */
export function openModal(type: MODAL_TYPE) {
	window.location.hash = "#" + type;
}

/**
 * resets hash modal
 */
export function closeModal() {
	window.location.hash = "";
}
