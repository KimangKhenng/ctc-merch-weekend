import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import ShopPage from "@/views/ShopPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import LoginView from "@/views/LoginView.vue";
import OrdersView from "@/views/OrdersView.vue";
import AdminView from "@/views/AdminView.vue";

import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: "home", component: HomePage },
        { path: '/about', component: AboutPage },
        { path: '/shops', component: ShopPage },
        { path: "/products/:id", name: "product", component: ProductDetailView },
        { path: "/checkout", name: "checkout", component: CheckoutView, meta: { requiresAuth: true } },
        { path: "/orders", name: "orders", component: OrdersView, meta: { requiresAuth: true } },
        { path: "/admin", name: "admin", component: AdminView, meta: { requiresAuth: true, requiresAdmin: true } },
        { path: "/login", name: 'login', component: LoginView },
        { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
    ],
    linkActiveClass: 'bg-black border-black text-white',
    linkExactActiveClass: 'bg-black border-black text-white',
})

router.beforeEach((to) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return { name: "login", query: { redirect: to.fullPath } };
    }
    if (to.meta.requiresAdmin && !auth.isAdmin) {
        return { name: "home" };
    }
});

export default router