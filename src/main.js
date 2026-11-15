import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import "./assets/main.css";
import router from './router/index.js';

import { useAuthStore } from "./stores/auth.js";
import { onUnauthorized } from "./services/api.js";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
// Bring back a saved login BEFORE the router starts, so the route guard knows who you are
const auth = useAuthStore();
auth.restore();

// The server said 401 (expired or wrong token): log out and go to the login page
onUnauthorized(() => {
    auth.logout();
    router.push({ name: "login", query: { redirect: router.currentRoute.value.fullPath } });
});

app.use(router);

app.mount('#app');
