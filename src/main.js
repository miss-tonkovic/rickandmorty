import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import "tailwindcss/tailwind.css";

axios.defaults.baseURL = "https://rickandmortyapi.com/api/";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.mount("#app");
