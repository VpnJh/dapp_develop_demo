import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from "vue-router";
import { loadLanguageAsync, supportLanguages } from "@/locales/i18n";
import { useAppConfigStore } from "@/stores";

/** 获取路由历史模式 https://next.router.vuejs.org/zh/guide/essentials/history-mode.html */
function getHistoryMode(routerHistory) {
  // len为1 代表只有历史模式 为2 代表历史模式中存在base参数 https://next.router.vuejs.org/zh/api/#%E5%8F%82%E6%95%B0-1
  const historyMode = routerHistory.split(",");
  const leftMode = historyMode[0];
  const rightMode = historyMode[1];
  // no param
  if (historyMode.length === 1) {
    if (leftMode === "hash") {
      return createWebHashHistory("");
    } else if (leftMode === "h5") {
      return createWebHistory("");
    }
  } //has param
  else if (historyMode.length === 2) {
    if (leftMode === "hash") {
      return createWebHashHistory(rightMode);
    } else if (leftMode === "h5") {
      return createWebHistory(rightMode);
    }
  }
}

// function lazyLoad(component_name, params = {}) {
//   return {
//     render() {
//       const async_component = defineAsyncComponent({
//         loader: () => import(`../views/${component_name}.vue`),
//         loadingComponent: Loading,
//         ...params
//       });
//       return h(async_component);
//     }
//   };
// }

const router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/home",
      name: "home",
      component: () => import(`../views/home/home.vue`),
      meta: {
        title: "home"
      }
    },
    {
      path: "/index",
      name: "index",
      component: () => import(`../views/index/index.vue`),
      meta: {
        title: "AppList"
      }
    },
    {
      path: "/loading",
      name: "loading",
      component: () => import(`../views/loading/loading.vue`),
      meta: {
        title: "loading"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // , theme:LocationQueryValue
  const lang = to.query.lang;
  const appConfigStore = useAppConfigStore();
  if (lang != null && supportLanguages.includes((lang || "").toString())) {
    console.log("appConfigStore", appConfigStore.$state);
    if (appConfigStore.$state.lang !== lang.toString()) {
      // 路由带参数 不用 语言才进行 加载 语言文本
      return loadLanguageAsync(lang.toString()).then(() => {
        return next();
      });
    }
  }
  return loadLanguageAsync(appConfigStore.$state.lang.toString()).then(() => {
    return next();
  });
});

router.afterEach((to, from) => {
  console.warn("from ::: ", from);
  console.warn("to ::: ", to);
  document.title = (to.meta.title ?? "").toString();
});

export default router;
