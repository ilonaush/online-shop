import Vue from 'vue'

Vue.filter('pluralize', (word: string, amount: number) => amount > 1 ? `${word}s` : word);
