import Vue from "vue";

/**
 * pluralizing word depending on quantity
 */
Vue.filter("pluralize", (word: string, amount: number) => amount > 1 ? `${word}s` : word);
