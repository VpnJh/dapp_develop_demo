import "@/assets/styles/tailwind.css";
import "@/assets/styles/main.css";
import { createApp } from "vue";
import router, { cacheWhiteList } from "./router";
import i18n from "@/locales/i18n";
import { pinia } from "@/stores";
import App from "./App.vue";
import { Lazyload } from "vant";
import { modalConfigProvider } from "@/utils/useWeb3Model.utils.js";
const app = createApp(App);
// 注册时可以配置额外的选项
app.use(Lazyload, {
  lazyComponent: true
});
app.config.globalProperties.$modalConfigProvider = modalConfigProvider;
app.config.globalProperties.$cacheWhiteList = cacheWhiteList;
app.use(pinia);
app.use(i18n);
app.use(router);
app.mount("#app");
