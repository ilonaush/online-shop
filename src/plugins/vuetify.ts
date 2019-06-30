import Vue from "vue";
import Vuetify from "vuetify/lib";
import "font-awesome/css/font-awesome.min.css";
import "vuetify/src/stylus/app.styl";
import colors from "vuetify/es5/util/colors";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(fas);
library.add(far);


Vue.use(Vuetify, {
  iconfont: "fa4",
  theme: {
    primary: colors.pink.lighten3, // #E53935
    secondary: colors.pink.lighten4, // #FFCDD2
    accent: colors.pink.accent1, // #3F51B5
  },
});
