import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import "./assets/main.css";
import router from './router/index.js';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount('#app');
