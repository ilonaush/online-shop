import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		}, {
			path: "/checkout",
			name: "checkout",
			component: () => import(/* webpackChunkName: "about" */ "./views/Checkout.vue"),
		}, {
			path: "/success",
			name: "success",
			component: () => import(/* webpackChunkName: "about" */ "./views/Success.vue"),
		}, {
			path: "/category/:category",
			name: "catalogue",
			component: () => import(/* webpackChunkName: "catalogue" */ "./views/Catalogue.vue"),
		}, {
			path: "/product/:product",
			name: "product",
			component: () => import(/* webpackChunkName: "catalogue" */ "./views/Product.vue"),
		},
	],
});
