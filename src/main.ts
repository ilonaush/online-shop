import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import "./filters/filters";

Vue.config.productionTip = false;

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(fas);
library.add(far);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
