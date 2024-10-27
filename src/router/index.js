import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from "vue-router";
import { loadLanguageAsync, supportLanguages } from "@/locales/i18n";
import { useAppConfigStore } from "@/stores";
import { h, defineAsyncComponent } from "vue";
import Loading from "@/views/loading/index.vue";

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
/*
 * timmy
 * desc: 路由懒加载
 * params  string
 * return component
 * */
function lazyLoad(componentName) {
  return defineAsyncComponent({
    loader: () => {
      return import(`../views/${componentName}.vue`).catch(error => {
        console.error(`Failed to load component ${componentName}:`, error);
        // 返回一个空组件或者错误组件
        return {
          render() {
            return h("div", "加载失败，请重试");
          }
        };
      });
    },
    loadingComponent: Loading,
    delay: 200, // 可以设置延迟时间
    timeout: 3000 // 可以设置超时时间
  });
}
export const cacheWhiteList = [];
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
      redirect: "/home"
    },
    {
      path: "/test",
      name: "test",
      component: lazyLoad("test/index"),
      meta: {
        title: "test"
      }
    },
    {
      path: "/home",
      name: "home",
      component: lazyLoad("home/index"),
      meta: {
        title: "链调试功能demo"
      }
    },
    {
      path: "/home2",
      name: "home2",
      component: lazyLoad("home2/index"),
      meta: {
        title: "链调试功能demo2"
      }
    },
    {
      path: "/user",
      name: "user",
      component: lazyLoad("user/index"),
      meta: {
        title: "AppList"
      }
    },
    {
      path: "/loading",
      name: "loading",
      component: Loading,
      meta: {
        title: "loading"
      }
    },
    {
      path: "/notFound",
      name: "notFound",
      component: () => import("../views/notFound/index.vue")
    },
    {
      path: "/*",
      name: "all",
      redirect: "/notFound"
    }
  ]
});

router.beforeEach((to, from, next) => {
  // , theme:LocationQueryValue
  const lang = to.query.lang;
  const appConfigStore = useAppConfigStore();
  if (lang != null && supportLanguages.includes((lang || "").toString())) {
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
