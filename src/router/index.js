import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import ShopPage from "@/views/ShopPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/about', component: AboutPage },
        { path: '/shops', component: ShopPage },
        { path: "/products/:id", name: "product", component: ProductDetailView },
        { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
    ],
    linkActiveClass: 'bg-black border-black text-white',
    linkExactActiveClass: 'bg-black border-black text-white',
})
export default router