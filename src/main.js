import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import "@/assets/styles/main.css";
import { createApp } from "vue";
import router from "./router";
import i18n from "@/locales/i18n";
import { pinia } from "@/stores";
import App from "./App.vue";
//@ts-ignore
import VueVirtualScroller from "vue-virtual-scroller";
// import {modalConfigProvider} from '@/utils/useWeb3Model.utils.js'
const app = createApp(App);

app.use(VueVirtualScroller);
// app.config.globalProperties.$modalConfigProvider=modalConfigProvider;
app.use(pinia);
app.use(i18n);
app.use(router);
app.mount("#app");
