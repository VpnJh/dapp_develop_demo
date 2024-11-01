// build/cdn.js
import { Plugin as importToCDN } from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/vite-plugin-cdn-import@1.0.1_rollup@3.29.5_vite@4.5.5_@types+node@22.7.9_sass@1.80.4_/node_modules/vite-plugin-cdn-import/dist/index.js";
var cdn = importToCDN({
  //（prodUrl解释： name: 对应下面modules的name，version: 自动读取本地package.json中dependencies依赖中对应包的版本号，path: 对应下面modules的path，当然也可写完整路径，会替换prodUrl）
  prodUrl: "https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}",
  modules: [
    {
      name: "vue",
      var: "Vue",
      path: "vue.global.prod.min.js"
    },
    {
      name: "vue-router",
      var: "VueRouter",
      path: "vue-router.global.min.js"
    },
    // 项目中没有直接安装vue-demi，但是pinia用到了，所以需要在引入pinia前引入vue-demi（https://github.com/vuejs/pinia/blob/v2/packages/pinia/package.json#L77）
    // {
    //   name: "vue-demi",
    //   var: "VueDemi",
    //   path: "index.iife.min.js"
    // },
    {
      name: "pinia",
      var: "Pinia",
      path: "pinia.iife.min.js"
    },
    {
      name: "axios",
      var: "axios",
      path: "axios.min.js"
    },
    {
      name: "dayjs",
      var: "dayjs",
      path: "dayjs.min.js"
    }
  ]
});

// build/plugins.js
import vue from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@4.5.5_@types+node@22.7.9_sass@1.80.4__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// build/utils.js
import dayjs from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js";
import { readdir, stat } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { sum, formatBytes } from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/@pureadmin+utils@2.4.8_vue@3.5.12_typescript@5.6.3_/node_modules/@pureadmin/utils/dist/index.mjs";

// package.json
var name = "dapp_develop_demo";
var version = "1.0.0";
var dependencies = {
  "@pureadmin/utils": "^2.4.7",
  "@reduxjs/toolkit": "^2.3.0",
  "@reown/appkit": "^1.1.8",
  "@reown/appkit-adapter-ethers": "^1.1.8",
  "@reown/appkit-adapter-solana": "^1.1.8",
  "@solana/wallet-adapter-wallets": "^0.19.32",
  "@web3modal/ethers": "^5.1.11",
  axios: "^1.7.7",
  "bignumber.js": "^9.1.2",
  dayjs: "^1.11.11",
  ethers: "^6.13.4",
  "gradient-string": "^3.0.0",
  lodash: "^4.17.21",
  mitt: "^3.0.1",
  pinia: "^2.1.7",
  "pinia-plugin-persist": "^1.0.0",
  "pinyin-pro": "^3.25.0",
  qs: "^6.13.0",
  vant: "^4.9.8",
  vue: "^3.4.29",
  "vue-clipboard3": "^2.0.0",
  "vue-i18n": "^10.0.0",
  "vue-router": "^4.4.5",
  "vue3-i18n": "^1.1.5"
};
var devDependencies = {
  "@commitlint/cli": "^19.3.0",
  "@commitlint/config-conventional": "^19.2.2",
  "@commitlint/types": "^19.5.0",
  "@eslint/js": "^9.12.0",
  "@vant/auto-import-resolver": "^1.2.1",
  "@vitejs/plugin-vue": "^5.1.4",
  "@vitejs/plugin-vue-jsx": "^4.0.1",
  autoprefixer: "^10",
  boxen: "^8.0.1",
  cssnano: "^7.0.6",
  czg: "^1.10.1",
  daisyui: "^4",
  eslint: "^9.12.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-define-config": "^2.1.0",
  "eslint-plugin-prettier": "^5.1.3",
  "eslint-plugin-vue": "^9.29.1",
  globals: "^15.11.0",
  "lint-staged": "^15.2.10",
  picocolors: "^1.1.1",
  postcss: "^8.4.47",
  "postcss-html": "^1.7.0",
  "postcss-import": "^16.1.0",
  "postcss-scss": "^4.0.9",
  prettier: "^3.3.3",
  rimraf: "^6.0.1",
  "rollup-plugin-visualizer": "^5.12.0",
  sass: "^1.80.3",
  "simple-git-hooks": "^2.11.1",
  stylelint: "^16.6.1",
  "stylelint-config-recess-order": "^5.0.1",
  "stylelint-config-standard": "^36.0.1",
  "stylelint-config-standard-scss": "^13.1.0",
  "stylelint-prettier": "^5.0.0",
  svgo: "^3.3.2",
  tailwindcss: "^3",
  "unplugin-auto-import": "^0.18.3",
  "unplugin-vue-components": "^0.27.4",
  vite: "^4",
  "vite-plugin-cdn-import": "^1.0.1",
  "vite-plugin-compression": "^0.5.1",
  "vite-plugin-dynamic-import": "^1.6.0",
  "vite-plugin-fake-server": "^2.1.1",
  "vite-plugin-node-polyfills": "^0.22.0",
  "vite-plugin-remove-console": "^2.2.0",
  "vite-plugin-router-warn": "^1.0.0",
  "vite-svg-loader": "^5.1.0",
  "vue-eslint-parser": "^9.4.3"
};
var engines = {
  node: "^18.18.0 || ^20.9.0 || >=21.1.0",
  pnpm: ">=9"
};

// build/utils.js
var __vite_injected_original_import_meta_url = "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/build/utils.js";
var root = process.cwd();
var pathResolve = (dir = ".", metaUrl = __vite_injected_original_import_meta_url) => {
  const currentFileDir = dirname(fileURLToPath(metaUrl));
  const buildDir = resolve(currentFileDir, "build");
  const resolvedPath = resolve(currentFileDir, dir);
  if (resolvedPath.startsWith(buildDir)) {
    return fileURLToPath(metaUrl);
  }
  return resolvedPath;
};
var alias = {
  "@": pathResolve("../src"),
  "@build": pathResolve()
};
var __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  lastBuildTime: dayjs(/* @__PURE__ */ new Date()).format("YYYY-MM-DD HH:mm:ss")
};
var wrapperEnv = (envConf) => {
  const ret = {
    VITE_PORT: 80,
    VITE_PUBLIC_PATH: "",
    VITE_ROUTER_HISTORY: "",
    VITE_CDN: false,
    VITE_HIDE_HOME: "false",
    VITE_COMPRESSION: "none"
  };
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};
var fileListTotal = [];
var getPackageSize = (options) => {
  const { folder = "dist", callback, format = true } = options;
  readdir(folder, (err, files) => {
    if (err)
      throw err;
    let count = 0;
    const checkEnd = () => {
      ++count === files.length && callback(format ? formatBytes(sum(fileListTotal)) : sum(fileListTotal));
    };
    files.forEach((item) => {
      stat(`${folder}/${item}`, async (err2, stats) => {
        if (err2)
          throw err2;
        if (stats.isFile()) {
          fileListTotal.push(stats.size);
          checkEnd();
        } else if (stats.isDirectory()) {
          getPackageSize({
            folder: `${folder}/${item}/`,
            callback: checkEnd
          });
        }
      });
    });
    files.length === 0 && callback(0);
  });
};

// build/info.js
import dayjs2 from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js";
import duration from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/plugin/duration.js";
import gradientString from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/gradient-string@3.0.0/node_modules/gradient-string/dist/index.js";
import boxen from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js";
dayjs2.extend(duration);
var welcomeMessage = gradientString("cyan", "magenta").multiline(
  `\u6B22\u8FCE\u8054\u7CFB\uFF1A\u5FD7\u5764\uFF0CTurning_sea~`
);
var boxenOptions = {
  padding: 0.5,
  borderColor: "cyan",
  borderStyle: "round"
};
function viteBuildInfo() {
  let config;
  let startTime;
  let endTime;
  let outDir;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      var _a;
      config = resolvedConfig;
      outDir = ((_a = resolvedConfig.build) == null ? void 0 : _a.outDir) ?? "dist";
    },
    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions));
      if (config.command === "build") {
        startTime = dayjs2(/* @__PURE__ */ new Date());
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs2(/* @__PURE__ */ new Date());
        getPackageSize({
          folder: outDir,
          callback: (size) => {
            console.log(
              boxen(
                gradientString("cyan", "magenta").multiline(
                  `\u{1F389} \u606D\u559C\u6253\u5305\u5B8C\u6210\uFF08\u603B\u7528\u65F6${dayjs2.duration(endTime.diff(startTime)).format("mm\u5206ss\u79D2")}\uFF0C\u6253\u5305\u540E\u7684\u5927\u5C0F\u4E3A${size}\uFF09`
                ),
                boxenOptions
              )
            );
          }
        });
      }
    }
  };
}

// build/plugins.js
import svgLoader from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.5.12_typescript@5.6.3_/node_modules/vite-svg-loader/index.js";

// build/compress.js
import { isArray } from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/@pureadmin+utils@2.4.8_vue@3.5.12_typescript@5.6.3_/node_modules/@pureadmin/utils/dist/index.mjs";
import compressPlugin from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.5.5_@types+node@22.7.9_sass@1.80.4_/node_modules/vite-plugin-compression/dist/index.mjs";
var configCompressPlugin = (compress) => {
  if (compress === "none")
    return null;
  const gz = {
    // 生成的压缩包后缀
    ext: ".gz",
    // 体积大于threshold才会被压缩
    threshold: 0,
    // 默认压缩.js|mjs|json|css|html后缀文件，设置成true，压缩全部文件
    filter: () => true,
    // 压缩后是否删除原始文件
    deleteOriginFile: false
  };
  const br = {
    ext: ".br",
    algorithm: "brotliCompress",
    threshold: 0,
    filter: () => true,
    deleteOriginFile: false
  };
  const codeList = [
    { k: "gzip", v: gz },
    { k: "brotli", v: br },
    { k: "both", v: [gz, br] }
  ];
  const plugins = [];
  codeList.forEach((item) => {
    if (compress.includes(item.k)) {
      if (compress.includes("clear")) {
        if (isArray(item.v)) {
          item.v.forEach((vItem) => {
            plugins.push(
              compressPlugin(Object.assign(vItem, { deleteOriginFile: true }))
            );
          });
        } else {
          plugins.push(
            compressPlugin(Object.assign(item.v, { deleteOriginFile: true }))
          );
        }
      } else {
        if (isArray(item.v)) {
          item.v.forEach((vItem) => {
            plugins.push(compressPlugin(vItem));
          });
        } else {
          plugins.push(compressPlugin(item.v));
        }
      }
    }
  });
  return plugins;
};

// build/plugins.js
import removeNoMatch from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/vite-plugin-router-warn@1.0.0/node_modules/vite-plugin-router-warn/dist/index.mjs";
import { visualizer } from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@3.29.5/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import removeConsole from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/vite-plugin-remove-console@2.2.0/node_modules/vite-plugin-remove-console/dist/index.mjs";
import AutoImport from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/unplugin-auto-import@0.18.3_rollup@3.29.5/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.1_rollup@3.29.5_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/@vant+auto-import-resolver@1.2.1/node_modules/@vant/auto-import-resolver/dist/index.esm.mjs";
import vueJsx from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@4.5.5_@types+node@22.7.9_sass@1.80.4__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import dynamicImport from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/vite-plugin-dynamic-import@1.6.0/node_modules/vite-plugin-dynamic-import/dist/index.mjs";
import { nodePolyfills } from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/vite-plugin-node-polyfills@0.22.0_rollup@3.29.5_vite@4.5.5_@types+node@22.7.9_sass@1.80.4_/node_modules/vite-plugin-node-polyfills/dist/index.js";
function getPluginsList(VITE_CDN, VITE_COMPRESSION) {
  const lifecycle = process.env.npm_lifecycle_event;
  return [
    vue(),
    nodePolyfills(),
    dynamicImport({
      filter(id) {
        if (id.includes("/node_modules/foo")) {
          return true;
        }
      }
    }),
    vueJsx(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    // 按下Command(⌘)+Shift(⇧)，然后点击页面元素会自动打开本地IDE并跳转到对应的代码位置
    viteBuildInfo(),
    /**
     * 开发环境下移除非必要的vue-router动态路由警告No match found for location with path
     * 非必要具体看 https://github.com/vuejs/router/issues/521 和 https://github.com/vuejs/router/issues/359
     * vite-plugin-router-warn只在开发环境下启用，只处理vue-router文件并且只在服务启动或重启时运行一次，性能消耗可忽略不计
     */
    removeNoMatch(),
    svgLoader(),
    VITE_CDN ? cdn : null,
    configCompressPlugin(VITE_COMPRESSION),
    // 线上环境删除console
    removeConsole(),
    // 打包分析
    lifecycle === "report" ? visualizer({ open: true, brotliSize: true, filename: "report.html" }) : null
  ];
}

// build/optimize.js
var include = ["qs", "mitt", "dayjs", "axios", "pinyin-pro"];
var exclude = [];

// vite.config.js
import { loadEnv } from "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/node_modules/.pnpm/vite@4.5.5_@types+node@22.7.9_sass@1.80.4/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url2 = "file:///Users/yujie/Documents/timmy/demo/dapp_develop_demo/vite.config.js";
var vite_config_default = ({ mode }) => {
  const {
    VITE_CDN,
    VITE_PORT,
    VITE_COMPRESSION,
    VITE_PUBLIC_PATH,
    VITE_API_URL,
    VITE_POROXY_URL
  } = wrapperEnv(loadEnv(mode, root));
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    // 服务端渲染
    server: {
      // 端口号
      port: VITE_PORT,
      host: "0.0.0.0",
      proxy: {
        [VITE_API_URL]: {
          // 这里填写后端地址
          target: VITE_POROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${VITE_API_URL}`), VITE_API_URL + "")
        }
      },
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION),
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"]
        }
      }
    },
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4e3,
      rollupOptions: {
        input: {
          index: pathResolve("./index.html", __vite_injected_original_import_meta_url2)
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvY2RuLmpzIiwgImJ1aWxkL3BsdWdpbnMuanMiLCAiYnVpbGQvdXRpbHMuanMiLCAicGFja2FnZS5qc29uIiwgImJ1aWxkL2luZm8uanMiLCAiYnVpbGQvY29tcHJlc3MuanMiLCAiYnVpbGQvb3B0aW1pemUuanMiLCAidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW8vYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95dWppZS9Eb2N1bWVudHMvdGltbXkvZGVtby9kYXBwX2RldmVsb3BfZGVtby9idWlsZC9jZG4uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3l1amllL0RvY3VtZW50cy90aW1teS9kZW1vL2RhcHBfZGV2ZWxvcF9kZW1vL2J1aWxkL2Nkbi5qc1wiO2ltcG9ydCB7IFBsdWdpbiBhcyBpbXBvcnRUb0NETiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1jZG4taW1wb3J0XCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFx1NjI1M1x1NTMwNVx1NjVGNlx1OTFDN1x1NzUyOGBjZG5gXHU2QTIxXHU1RjBGXHVGRjBDXHU0RUM1XHU5NjUwXHU1OTE2XHU3RjUxXHU0RjdGXHU3NTI4XHVGRjA4XHU5RUQ4XHU4QkE0XHU0RTBEXHU5MUM3XHU3NTI4XHVGRjBDXHU1OTgyXHU2NzlDXHU5NzAwXHU4OTgxXHU5MUM3XHU3NTI4Y2RuXHU2QTIxXHU1RjBGXHVGRjBDXHU4QkY3XHU1NzI4IC5lbnYucHJvZHVjdGlvbiBcdTY1ODdcdTRFRjZcdUZGMENcdTVDMDYgVklURV9DRE4gXHU4QkJFXHU3RjZFXHU2MjEwdHJ1ZVx1RkYwOVxuICogXHU1RTczXHU1M0YwXHU5MUM3XHU3NTI4XHU1NkZEXHU1MTg1Y2RuXHVGRjFBaHR0cHM6Ly93d3cuYm9vdGNkbi5jblx1RkYwQ1x1NUY1M1x1NzEzNlx1NEY2MFx1NEU1Rlx1NTNFRlx1NEVFNVx1OTAwOVx1NjJFOSBodHRwczovL3VucGtnLmNvbSBcdTYyMTZcdTgwMDUgaHR0cHM6Ly93d3cuanNkZWxpdnIuY29tXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTRFMEFcdTk3NjJcdTYzRDBcdTUyMzBcdTc2ODRcdTRFQzVcdTk2NTBcdTU5MTZcdTdGNTFcdTRGN0ZcdTc1MjhcdTRFNUZcdTRFMERcdTY2MkZcdTVCOENcdTUxNjhcdTgwQUZcdTVCOUFcdTc2ODRcdUZGMENcdTU5ODJcdTY3OUNcdTRGNjBcdTRFRUNcdTUxNkNcdTUzRjhcdTUxODVcdTdGNTFcdTkwRThcdTdGNzJcdTc2ODRcdTY3MDlcdTc2RjhcdTUxNzNqc1x1MzAwMWNzc1x1NjU4N1x1NEVGNlx1RkYwQ1x1NEU1Rlx1NTNFRlx1NEVFNVx1NUMwNlx1NEUwQlx1OTc2Mlx1OTE0RFx1N0Y2RVx1NUJGOVx1NUU5NFx1NjUzOVx1NEUwMFx1NEUwQlx1RkYwQ1x1NjU3NFx1NEUwMFx1NTk1N1x1NTE4NVx1N0Y1MVx1NzI0OGNkblxuICovXG5leHBvcnQgY29uc3QgY2RuID0gaW1wb3J0VG9DRE4oe1xuICAvL1x1RkYwOHByb2RVcmxcdTg5RTNcdTkxQ0FcdUZGMUEgbmFtZTogXHU1QkY5XHU1RTk0XHU0RTBCXHU5NzYybW9kdWxlc1x1NzY4NG5hbWVcdUZGMEN2ZXJzaW9uOiBcdTgxRUFcdTUyQThcdThCRkJcdTUzRDZcdTY3MkNcdTU3MzBwYWNrYWdlLmpzb25cdTRFMkRkZXBlbmRlbmNpZXNcdTRGOURcdThENTZcdTRFMkRcdTVCRjlcdTVFOTRcdTUzMDVcdTc2ODRcdTcyNDhcdTY3MkNcdTUzRjdcdUZGMENwYXRoOiBcdTVCRjlcdTVFOTRcdTRFMEJcdTk3NjJtb2R1bGVzXHU3Njg0cGF0aFx1RkYwQ1x1NUY1M1x1NzEzNlx1NEU1Rlx1NTNFRlx1NTE5OVx1NUI4Q1x1NjU3NFx1OERFRlx1NUY4NFx1RkYwQ1x1NEYxQVx1NjZGRlx1NjM2MnByb2RVcmxcdUZGMDlcbiAgcHJvZFVybDogXCJodHRwczovL2Nkbi5ib290Y2RuLm5ldC9hamF4L2xpYnMve25hbWV9L3t2ZXJzaW9ufS97cGF0aH1cIixcbiAgbW9kdWxlczogW1xuICAgIHtcbiAgICAgIG5hbWU6IFwidnVlXCIsXG4gICAgICB2YXI6IFwiVnVlXCIsXG4gICAgICBwYXRoOiBcInZ1ZS5nbG9iYWwucHJvZC5taW4uanNcIlxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogXCJ2dWUtcm91dGVyXCIsXG4gICAgICB2YXI6IFwiVnVlUm91dGVyXCIsXG4gICAgICBwYXRoOiBcInZ1ZS1yb3V0ZXIuZ2xvYmFsLm1pbi5qc1wiXG4gICAgfSxcbiAgICAvLyBcdTk4NzlcdTc2RUVcdTRFMkRcdTZDQTFcdTY3MDlcdTc2RjRcdTYzQTVcdTVCODlcdTg4QzV2dWUtZGVtaVx1RkYwQ1x1NEY0Nlx1NjYyRnBpbmlhXHU3NTI4XHU1MjMwXHU0RTg2XHVGRjBDXHU2MjQwXHU0RUU1XHU5NzAwXHU4OTgxXHU1NzI4XHU1RjE1XHU1MTY1cGluaWFcdTUyNERcdTVGMTVcdTUxNjV2dWUtZGVtaVx1RkYwOGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy9waW5pYS9ibG9iL3YyL3BhY2thZ2VzL3BpbmlhL3BhY2thZ2UuanNvbiNMNzdcdUZGMDlcbiAgICAvLyB7XG4gICAgLy8gICBuYW1lOiBcInZ1ZS1kZW1pXCIsXG4gICAgLy8gICB2YXI6IFwiVnVlRGVtaVwiLFxuICAgIC8vICAgcGF0aDogXCJpbmRleC5paWZlLm1pbi5qc1wiXG4gICAgLy8gfSxcbiAgICB7XG4gICAgICBuYW1lOiBcInBpbmlhXCIsXG4gICAgICB2YXI6IFwiUGluaWFcIixcbiAgICAgIHBhdGg6IFwicGluaWEuaWlmZS5taW4uanNcIlxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogXCJheGlvc1wiLFxuICAgICAgdmFyOiBcImF4aW9zXCIsXG4gICAgICBwYXRoOiBcImF4aW9zLm1pbi5qc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcImRheWpzXCIsXG4gICAgICB2YXI6IFwiZGF5anNcIixcbiAgICAgIHBhdGg6IFwiZGF5anMubWluLmpzXCJcbiAgICB9XG4gIF1cbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW8vYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95dWppZS9Eb2N1bWVudHMvdGltbXkvZGVtby9kYXBwX2RldmVsb3BfZGVtby9idWlsZC9wbHVnaW5zLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy95dWppZS9Eb2N1bWVudHMvdGltbXkvZGVtby9kYXBwX2RldmVsb3BfZGVtby9idWlsZC9wbHVnaW5zLmpzXCI7aW1wb3J0IHsgY2RuIH0gZnJvbSBcIi4vY2RuXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB7IHZpdGVCdWlsZEluZm8gfSBmcm9tIFwiLi9pbmZvXCI7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gXCJ2aXRlLXN2Zy1sb2FkZXJcIjtcbmltcG9ydCB7IGNvbmZpZ0NvbXByZXNzUGx1Z2luIH0gZnJvbSBcIi4vY29tcHJlc3NcIjtcbmltcG9ydCByZW1vdmVOb01hdGNoIGZyb20gXCJ2aXRlLXBsdWdpbi1yb3V0ZXItd2FyblwiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcbmltcG9ydCByZW1vdmVDb25zb2xlIGZyb20gXCJ2aXRlLXBsdWdpbi1yZW1vdmUtY29uc29sZVwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgeyBWYW50UmVzb2x2ZXIgfSBmcm9tIFwiQHZhbnQvYXV0by1pbXBvcnQtcmVzb2x2ZXJcIjtcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcbmltcG9ydCBkeW5hbWljSW1wb3J0IGZyb20gXCJ2aXRlLXBsdWdpbi1keW5hbWljLWltcG9ydFwiO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBsdWdpbnNMaXN0KFZJVEVfQ0ROLCBWSVRFX0NPTVBSRVNTSU9OKSB7XG4gIGNvbnN0IGxpZmVjeWNsZSA9IHByb2Nlc3MuZW52Lm5wbV9saWZlY3ljbGVfZXZlbnQ7XG4gIHJldHVybiBbXG4gICAgdnVlKCksXG4gICAgbm9kZVBvbHlmaWxscygpLFxuICAgIGR5bmFtaWNJbXBvcnQoe1xuICAgICAgZmlsdGVyKGlkKSB7XG4gICAgICAgIC8vIGBub2RlX21vZHVsZXNgIGlzIGV4Y2x1ZGUgYnkgZGVmYXVsdCwgc28gd2UgbmVlZCB0byBpbmNsdWRlIGl0IGV4cGxpY2l0bHlcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGUtcGx1Z2luL3ZpdGUtcGx1Z2luLWR5bmFtaWMtaW1wb3J0L2Jsb2IvdjEuMy4wL3NyYy9pbmRleC50cyNMMTMzLUwxMzVcbiAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL25vZGVfbW9kdWxlcy9mb29cIikpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICAgIHZ1ZUpzeCgpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgcmVzb2x2ZXJzOiBbVmFudFJlc29sdmVyKCldXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV1cbiAgICB9KSxcbiAgICAvLyBcdTYzMDlcdTRFMEJDb21tYW5kKFx1MjMxOCkrU2hpZnQoXHUyMUU3KVx1RkYwQ1x1NzEzNlx1NTQwRVx1NzBCOVx1NTFGQlx1OTg3NVx1OTc2Mlx1NTE0M1x1N0QyMFx1NEYxQVx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NjcyQ1x1NTczMElERVx1NUU3Nlx1OERGM1x1OEY2Q1x1NTIzMFx1NUJGOVx1NUU5NFx1NzY4NFx1NEVFM1x1NzgwMVx1NEY0RFx1N0Y2RVxuICAgIHZpdGVCdWlsZEluZm8oKSxcbiAgICAvKipcbiAgICAgKiBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMEJcdTc5RkJcdTk2NjRcdTk3NUVcdTVGQzVcdTg5ODFcdTc2ODR2dWUtcm91dGVyXHU1MkE4XHU2MDAxXHU4REVGXHU3NTMxXHU4QjY2XHU1NDRBTm8gbWF0Y2ggZm91bmQgZm9yIGxvY2F0aW9uIHdpdGggcGF0aFxuICAgICAqIFx1OTc1RVx1NUZDNVx1ODk4MVx1NTE3N1x1NEY1M1x1NzcwQiBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvcm91dGVyL2lzc3Vlcy81MjEgXHU1NDhDIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy9yb3V0ZXIvaXNzdWVzLzM1OVxuICAgICAqIHZpdGUtcGx1Z2luLXJvdXRlci13YXJuXHU1M0VBXHU1NzI4XHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTBCXHU1NDJGXHU3NTI4XHVGRjBDXHU1M0VBXHU1OTA0XHU3NDA2dnVlLXJvdXRlclx1NjU4N1x1NEVGNlx1NUU3Nlx1NEUxNFx1NTNFQVx1NTcyOFx1NjcwRFx1NTJBMVx1NTQyRlx1NTJBOFx1NjIxNlx1OTFDRFx1NTQyRlx1NjVGNlx1OEZEMFx1ODg0Q1x1NEUwMFx1NkIyMVx1RkYwQ1x1NjAyN1x1ODBGRFx1NkQ4OFx1ODAxN1x1NTNFRlx1NUZGRFx1NzU2NVx1NEUwRFx1OEJBMVxuICAgICAqL1xuICAgIHJlbW92ZU5vTWF0Y2goKSxcbiAgICBzdmdMb2FkZXIoKSxcbiAgICBWSVRFX0NETiA/IGNkbiA6IG51bGwsXG4gICAgY29uZmlnQ29tcHJlc3NQbHVnaW4oVklURV9DT01QUkVTU0lPTiksXG4gICAgLy8gXHU3RUJGXHU0RTBBXHU3M0FGXHU1ODgzXHU1MjIwXHU5NjY0Y29uc29sZVxuICAgIHJlbW92ZUNvbnNvbGUoKSxcbiAgICAvLyBcdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcbiAgICBsaWZlY3ljbGUgPT09IFwicmVwb3J0XCJcbiAgICAgID8gdmlzdWFsaXplcih7IG9wZW46IHRydWUsIGJyb3RsaVNpemU6IHRydWUsIGZpbGVuYW1lOiBcInJlcG9ydC5odG1sXCIgfSlcbiAgICAgIDogbnVsbFxuICBdO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW8vYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95dWppZS9Eb2N1bWVudHMvdGltbXkvZGVtby9kYXBwX2RldmVsb3BfZGVtby9idWlsZC91dGlscy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW8vYnVpbGQvdXRpbHMuanNcIjtpbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgeyByZWFkZGlyLCBzdGF0IH0gZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IGRpcm5hbWUsIHJlc29sdmUgfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBzdW0sIGZvcm1hdEJ5dGVzIH0gZnJvbSBcIkBwdXJlYWRtaW4vdXRpbHNcIjtcbmltcG9ydCB7XG4gIG5hbWUsXG4gIHZlcnNpb24sXG4gIGVuZ2luZXMsXG4gIGRlcGVuZGVuY2llcyxcbiAgZGV2RGVwZW5kZW5jaWVzXG59IGZyb20gXCIuLi9wYWNrYWdlLmpzb25cIjtcblxuLyoqIFx1NTQyRlx1NTJBOGBub2RlYFx1OEZEQlx1N0EwQlx1NjVGNlx1NjI0MFx1NTcyOFx1NURFNVx1NEY1Q1x1NzZFRVx1NUY1NVx1NzY4NFx1N0VERFx1NUJGOVx1OERFRlx1NUY4NCAqL1xuY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKCk7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFx1NjgzOVx1NjM2RVx1NTNFRlx1OTAwOVx1NzY4NFx1OERFRlx1NUY4NFx1NzI0N1x1NkJCNVx1NzUxRlx1NjIxMFx1NEUwMFx1NEUyQVx1NjVCMFx1NzY4NFx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFxuICogQHBhcmFtIGRpciBcdThERUZcdTVGODRcdTcyNDdcdTZCQjVcdUZGMENcdTlFRDhcdThCQTRgYnVpbGRgXG4gKiBAcGFyYW0gbWV0YVVybCBcdTZBMjFcdTU3NTdcdTc2ODRcdTVCOENcdTY1NzRgdXJsYFx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NTcyOGBidWlsZGBcdTc2RUVcdTVGNTVcdTU5MTZcdThDMDNcdTc1MjhcdTVGQzVcdTRGMjBgaW1wb3J0Lm1ldGEudXJsYFxuICovXG5jb25zdCBwYXRoUmVzb2x2ZSA9IChkaXIgPSBcIi5cIiwgbWV0YVVybCA9IGltcG9ydC5tZXRhLnVybCkgPT4ge1xuICAvLyBcdTVGNTNcdTUyNERcdTY1ODdcdTRFRjZcdTc2RUVcdTVGNTVcdTc2ODRcdTdFRERcdTVCRjlcdThERUZcdTVGODRcbiAgY29uc3QgY3VycmVudEZpbGVEaXIgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgobWV0YVVybCkpO1xuICAvLyBidWlsZCBcdTc2RUVcdTVGNTVcdTc2ODRcdTdFRERcdTVCRjlcdThERUZcdTVGODRcbiAgY29uc3QgYnVpbGREaXIgPSByZXNvbHZlKGN1cnJlbnRGaWxlRGlyLCBcImJ1aWxkXCIpO1xuICAvLyBcdTg5RTNcdTY3OTBcdTc2ODRcdTdFRERcdTVCRjlcdThERUZcdTVGODRcbiAgY29uc3QgcmVzb2x2ZWRQYXRoID0gcmVzb2x2ZShjdXJyZW50RmlsZURpciwgZGlyKTtcbiAgLy8gXHU2OEMwXHU2N0U1XHU4OUUzXHU2NzkwXHU3Njg0XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHU2NjJGXHU1NDI2XHU1NzI4IGJ1aWxkIFx1NzZFRVx1NUY1NVx1NTE4NVxuICBpZiAocmVzb2x2ZWRQYXRoLnN0YXJ0c1dpdGgoYnVpbGREaXIpKSB7XG4gICAgLy8gXHU1NzI4IGJ1aWxkIFx1NzZFRVx1NUY1NVx1NTE4NVx1RkYwQ1x1OEZENFx1NTZERVx1NUY1M1x1NTI0RFx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFxuICAgIHJldHVybiBmaWxlVVJMVG9QYXRoKG1ldGFVcmwpO1xuICB9XG4gIC8vIFx1NEUwRFx1NTcyOCBidWlsZCBcdTc2RUVcdTVGNTVcdTUxODVcdUZGMENcdThGRDRcdTU2REVcdTg5RTNcdTY3OTBcdTU0MEVcdTc2ODRcdTdFRERcdTVCRjlcdThERUZcdTVGODRcbiAgcmV0dXJuIHJlc29sdmVkUGF0aDtcbn07XG5cbi8qKiBcdThCQkVcdTdGNkVcdTUyMkJcdTU0MEQgKi9cbmNvbnN0IGFsaWFzID0ge1xuICBcIkBcIjogcGF0aFJlc29sdmUoXCIuLi9zcmNcIiksXG4gIFwiQGJ1aWxkXCI6IHBhdGhSZXNvbHZlKClcbn07XG5cbi8qKiBcdTVFNzNcdTUzRjBcdTc2ODRcdTU0MERcdTc5RjBcdTMwMDFcdTcyNDhcdTY3MkNcdTMwMDFcdThGRDBcdTg4NENcdTYyNDBcdTk3MDBcdTc2ODRgbm9kZWBcdTU0OENgcG5wbWBcdTcyNDhcdTY3MkNcdTMwMDFcdTRGOURcdThENTZcdTMwMDFcdTY3MDBcdTU0MEVcdTY3ODRcdTVFRkFcdTY1RjZcdTk1RjRcdTc2ODRcdTdDN0JcdTU3OEJcdTYzRDBcdTc5M0EgKi9cbmNvbnN0IF9fQVBQX0lORk9fXyA9IHtcbiAgcGtnOiB7IG5hbWUsIHZlcnNpb24sIGVuZ2luZXMsIGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzIH0sXG4gIGxhc3RCdWlsZFRpbWU6IGRheWpzKG5ldyBEYXRlKCkpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIilcbn07XG5cbi8qKiBcdTU5MDRcdTc0MDZcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0YgKi9cbmNvbnN0IHdyYXBwZXJFbnYgPSBlbnZDb25mID0+IHtcbiAgLy8gXHU5RUQ4XHU4QkE0XHU1MDNDXG4gIGNvbnN0IHJldCA9IHtcbiAgICBWSVRFX1BPUlQ6IDgwLFxuICAgIFZJVEVfUFVCTElDX1BBVEg6IFwiXCIsXG4gICAgVklURV9ST1VURVJfSElTVE9SWTogXCJcIixcbiAgICBWSVRFX0NETjogZmFsc2UsXG4gICAgVklURV9ISURFX0hPTUU6IFwiZmFsc2VcIixcbiAgICBWSVRFX0NPTVBSRVNTSU9OOiBcIm5vbmVcIlxuICB9O1xuXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XG4gICAgcmVhbE5hbWUgPVxuICAgICAgcmVhbE5hbWUgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IHJlYWxOYW1lID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHJlYWxOYW1lO1xuXG4gICAgaWYgKGVudk5hbWUgPT09IFwiVklURV9QT1JUXCIpIHtcbiAgICAgIHJlYWxOYW1lID0gTnVtYmVyKHJlYWxOYW1lKTtcbiAgICB9XG4gICAgcmV0W2Vudk5hbWVdID0gcmVhbE5hbWU7XG4gICAgaWYgKHR5cGVvZiByZWFsTmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWFsTmFtZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSBKU09OLnN0cmluZ2lmeShyZWFsTmFtZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5jb25zdCBmaWxlTGlzdFRvdGFsID0gW107XG5cbi8qKiBcdTgzQjdcdTUzRDZcdTYzMDdcdTVCOUFcdTY1ODdcdTRFRjZcdTU5MzlcdTRFMkRcdTYyNDBcdTY3MDlcdTY1ODdcdTRFRjZcdTc2ODRcdTYwM0JcdTU5MjdcdTVDMEYgKi9cbmNvbnN0IGdldFBhY2thZ2VTaXplID0gb3B0aW9ucyA9PiB7XG4gIGNvbnN0IHsgZm9sZGVyID0gXCJkaXN0XCIsIGNhbGxiYWNrLCBmb3JtYXQgPSB0cnVlIH0gPSBvcHRpb25zO1xuICByZWFkZGlyKGZvbGRlciwgKGVyciwgZmlsZXMpID0+IHtcbiAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBjb25zdCBjaGVja0VuZCA9ICgpID0+IHtcbiAgICAgICsrY291bnQgPT09IGZpbGVzLmxlbmd0aCAmJlxuICAgICAgICBjYWxsYmFjayhmb3JtYXQgPyBmb3JtYXRCeXRlcyhzdW0oZmlsZUxpc3RUb3RhbCkpIDogc3VtKGZpbGVMaXN0VG90YWwpKTtcbiAgICB9O1xuICAgIGZpbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzdGF0KGAke2ZvbGRlcn0vJHtpdGVtfWAsIGFzeW5jIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcbiAgICAgICAgaWYgKHN0YXRzLmlzRmlsZSgpKSB7XG4gICAgICAgICAgZmlsZUxpc3RUb3RhbC5wdXNoKHN0YXRzLnNpemUpO1xuICAgICAgICAgIGNoZWNrRW5kKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgIGdldFBhY2thZ2VTaXplKHtcbiAgICAgICAgICAgIGZvbGRlcjogYCR7Zm9sZGVyfS8ke2l0ZW19L2AsXG4gICAgICAgICAgICBjYWxsYmFjazogY2hlY2tFbmRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZmlsZXMubGVuZ3RoID09PSAwICYmIGNhbGxiYWNrKDApO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IHJvb3QsIHBhdGhSZXNvbHZlLCBhbGlhcywgX19BUFBfSU5GT19fLCB3cmFwcGVyRW52LCBnZXRQYWNrYWdlU2l6ZSB9O1xuIiwgIntcbiAgXCJuYW1lXCI6IFwiZGFwcF9kZXZlbG9wX2RlbW9cIixcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcInRpbW15LnRhblwiLFxuICAgIFwiZW1haWxcIjogXCI2MzA1MTQyMTVAcXEuY29tXCJcbiAgfSxcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJOT0RFX09QVElPTlM9LS1tYXgtb2xkLXNwYWNlLXNpemU9NDA5NiB2aXRlXCIsXG4gICAgXCJkZXYudGVzdFwiOiBcIk5PREVfT1BUSU9OUz0tLW1heC1vbGQtc3BhY2Utc2l6ZT00MDk2IHZpdGUgLS1tb2RlIHRlc3RcIixcbiAgICBcImRldi5wcm9kXCI6IFwiTk9ERV9PUFRJT05TPS0tbWF4LW9sZC1zcGFjZS1zaXplPTQwOTYgdml0ZSAtLW1vZGUgcHJvZFwiLFxuICAgIFwiYnVpbGRcIjogXCJyaW1yYWYgZGlzdCAmJiBOT0RFX09QVElPTlM9LS1tYXgtb2xkLXNwYWNlLXNpemU9ODE5MiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZC50ZXN0XCI6IFwicmltcmFmIGRpc3QgJiYgdml0ZSBidWlsZCAtLW1vZGUgdGVzdFwiLFxuICAgIFwiYnVpbGQucHJvZFwiOiBcInJpbXJhZiBkaXN0ICYmIHZpdGUgYnVpbGQgLS1tb2RlIHByb2RcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcbiAgICBcInN2Z29cIjogXCJzdmdvIC1mIC4gLXJcIixcbiAgICBcImNsZWFuOmNhY2hlXCI6IFwicmltcmFmIC5lc2xpbnRjYWNoZSAmJiByaW1yYWYgcG5wbS1sb2NrLnlhbWwgJiYgcmltcmFmIG5vZGVfbW9kdWxlcyAmJiBwbnBtIHN0b3JlIHBydW5lICYmIHBucG0gaW5zdGFsbFwiLFxuICAgIFwibGludDplc2xpbnRcIjogXCJlc2xpbnQgLS1jYWNoZSAtLW1heC13YXJuaW5ncyAwICBcXFwie3NyYyxtb2NrLGJ1aWxkfS8qKi8qLntqc3gsanMsaHRtbH1cXFwiIC0tZml4XCIsXG4gICAgXCJsaW50OnByZXR0aWVyXCI6IFwicHJldHRpZXIgLS13cml0ZSAgXFxcInNyYy8qKi8qLntodG1sLGpzLGNqcyxqc29uLGNzcyxzY3NzLG1kfVxcXCJcIixcbiAgICBcImxpbnQ6c3R5bGVsaW50XCI6IFwic3R5bGVsaW50IC0tY2FjaGUgLS1maXggXFxcIioqLyoue2h0bWwsY3NzLHNjc3N9XFxcIiAtLWNhY2hlLWxvY2F0aW9uIG5vZGVfbW9kdWxlcy8uY2FjaGUvc3R5bGVsaW50L1wiLFxuICAgIFwibGludFwiOiBcInBucG0gbGludDplc2xpbnQgJiYgcG5wbSBsaW50OnByZXR0aWVyICYmIHBucG0gbGludDpzdHlsZWxpbnRcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwibGludC1zdGFnZWRcIixcbiAgICBcImN6XCI6IFwiZ2l0IGFkZCAuICYmIGN6Z1wiLFxuICAgIFwicG9zdGluc3RhbGxcIjogXCJzaW1wbGUtZ2l0LWhvb2tzXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHB1cmVhZG1pbi91dGlsc1wiOiBcIl4yLjQuN1wiLFxuICAgIFwiQHJlZHV4anMvdG9vbGtpdFwiOiBcIl4yLjMuMFwiLFxuICAgIFwiQHJlb3duL2FwcGtpdFwiOiBcIl4xLjEuOFwiLFxuICAgIFwiQHJlb3duL2FwcGtpdC1hZGFwdGVyLWV0aGVyc1wiOiBcIl4xLjEuOFwiLFxuICAgIFwiQHJlb3duL2FwcGtpdC1hZGFwdGVyLXNvbGFuYVwiOiBcIl4xLjEuOFwiLFxuICAgIFwiQHNvbGFuYS93YWxsZXQtYWRhcHRlci13YWxsZXRzXCI6IFwiXjAuMTkuMzJcIixcbiAgICBcIkB3ZWIzbW9kYWwvZXRoZXJzXCI6IFwiXjUuMS4xMVwiLFxuICAgIFwiYXhpb3NcIjogXCJeMS43LjdcIixcbiAgICBcImJpZ251bWJlci5qc1wiOiBcIl45LjEuMlwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMVwiLFxuICAgIFwiZXRoZXJzXCI6IFwiXjYuMTMuNFwiLFxuICAgIFwiZ3JhZGllbnQtc3RyaW5nXCI6IFwiXjMuMC4wXCIsXG4gICAgXCJsb2Rhc2hcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwibWl0dFwiOiBcIl4zLjAuMVwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcbiAgICBcInBpbmlhLXBsdWdpbi1wZXJzaXN0XCI6IFwiXjEuMC4wXCIsXG4gICAgXCJwaW55aW4tcHJvXCI6IFwiXjMuMjUuMFwiLFxuICAgIFwicXNcIjogXCJeNi4xMy4wXCIsXG4gICAgXCJ2YW50XCI6IFwiXjQuOS44XCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjI5XCIsXG4gICAgXCJ2dWUtY2xpcGJvYXJkM1wiOiBcIl4yLjAuMFwiLFxuICAgIFwidnVlLWkxOG5cIjogXCJeMTAuMC4wXCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuNC41XCIsXG4gICAgXCJ2dWUzLWkxOG5cIjogXCJeMS4xLjVcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY29tbWl0bGludC9jbGlcIjogXCJeMTkuMy4wXCIsXG4gICAgXCJAY29tbWl0bGludC9jb25maWctY29udmVudGlvbmFsXCI6IFwiXjE5LjIuMlwiLFxuICAgIFwiQGNvbW1pdGxpbnQvdHlwZXNcIjogXCJeMTkuNS4wXCIsXG4gICAgXCJAZXNsaW50L2pzXCI6IFwiXjkuMTIuMFwiLFxuICAgIFwiQHZhbnQvYXV0by1pbXBvcnQtcmVzb2x2ZXJcIjogXCJeMS4yLjFcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjEuNFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiOiBcIl40LjAuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwXCIsXG4gICAgXCJib3hlblwiOiBcIl44LjAuMVwiLFxuICAgIFwiY3NzbmFub1wiOiBcIl43LjAuNlwiLFxuICAgIFwiY3pnXCI6IFwiXjEuMTAuMVwiLFxuICAgIFwiZGFpc3l1aVwiOiBcIl40XCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOS4xMi4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXG4gICAgXCJlc2xpbnQtZGVmaW5lLWNvbmZpZ1wiOiBcIl4yLjEuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1wcmV0dGllclwiOiBcIl41LjEuM1wiLFxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4yOS4xXCIsXG4gICAgXCJnbG9iYWxzXCI6IFwiXjE1LjExLjBcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuMTBcIixcbiAgICBcInBpY29jb2xvcnNcIjogXCJeMS4xLjFcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjQ3XCIsXG4gICAgXCJwb3N0Y3NzLWh0bWxcIjogXCJeMS43LjBcIixcbiAgICBcInBvc3Rjc3MtaW1wb3J0XCI6IFwiXjE2LjEuMFwiLFxuICAgIFwicG9zdGNzcy1zY3NzXCI6IFwiXjQuMC45XCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjMuM1wiLFxuICAgIFwicmltcmFmXCI6IFwiXjYuMC4xXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMi4wXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuODAuM1wiLFxuICAgIFwic2ltcGxlLWdpdC1ob29rc1wiOiBcIl4yLjExLjFcIixcbiAgICBcInN0eWxlbGludFwiOiBcIl4xNi42LjFcIixcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjZXNzLW9yZGVyXCI6IFwiXjUuMC4xXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkXCI6IFwiXjM2LjAuMVwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC1zY3NzXCI6IFwiXjEzLjEuMFwiLFxuICAgIFwic3R5bGVsaW50LXByZXR0aWVyXCI6IFwiXjUuMC4wXCIsXG4gICAgXCJzdmdvXCI6IFwiXjMuMy4yXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zXCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE4LjNcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjcuNFwiLFxuICAgIFwidml0ZVwiOiBcIl40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jZG4taW1wb3J0XCI6IFwiXjEuMC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tZHluYW1pYy1pbXBvcnRcIjogXCJeMS42LjBcIixcbiAgICBcInZpdGUtcGx1Z2luLWZha2Utc2VydmVyXCI6IFwiXjIuMS4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxsc1wiOiBcIl4wLjIyLjBcIixcbiAgICBcInZpdGUtcGx1Z2luLXJlbW92ZS1jb25zb2xlXCI6IFwiXjIuMi4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1yb3V0ZXItd2FyblwiOiBcIl4xLjAuMFwiLFxuICAgIFwidml0ZS1zdmctbG9hZGVyXCI6IFwiXjUuMS4wXCIsXG4gICAgXCJ2dWUtZXNsaW50LXBhcnNlclwiOiBcIl45LjQuM1wiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiZGFwcF9kZXZlbG9wX2RlbW9cIixcbiAgICBcInRhaWx3aW5kY3NzXCIsXG4gICAgXCJ0aW1teS50YW5cIixcbiAgICBcInZ1ZVwiLFxuICAgIFwidml0ZVwiLFxuICAgIFwiZXNtXCJcbiAgXSxcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCJeMTguMTguMCB8fCBeMjAuOS4wIHx8ID49MjEuMS4wXCIsXG4gICAgXCJwbnBtXCI6IFwiPj05XCJcbiAgfSxcbiAgXCJzaW1wbGUtZ2l0LWhvb2tzXCI6IHtcbiAgICBcInByZS1jb21taXRcIjogXCJucHggbGludC1zdGFnZWRcIixcbiAgICBcImNvbW1pdC1tc2dcIjogXCJub2RlIHNjcmlwdHMvdmVyaWZ5LWNvbW1pdC5qc1wiXG4gIH0sXG4gIFwibGludC1zdGFnZWRcIjoge1xuICAgIFwiKiovKi57anMsanN4fVwiOiBbXG4gICAgICBcImVzbGludCAtLWNhY2hlIC0tbWF4LXdhcm5pbmdzIDAgLS1maXhcIlxuICAgIF0sXG4gICAgXCIqKi8qLntodG1sLGpzLGNqcyxqc29uLGNzcyxzY3NzLG1kfVwiOiBbXG4gICAgICBcInByZXR0aWVyIC0td3JpdGUgIFxcXCJzcmMvKiovKi57aHRtbCxqcyxjanMsanNvbixjc3Msc2NzcyxtZH1cXFwiXCJcbiAgICBdLFxuICAgIFwiKiovKi57aHRtbCxjc3Msc2Nzc31cIjogW1xuICAgICAgXCJzdHlsZWxpbnQgLS1jYWNoZSAtLWZpeCBcXFwiKiovKi57aHRtbCxjc3Msc2Nzc31cXFwiIC0tY2FjaGUtbG9jYXRpb24gbm9kZV9tb2R1bGVzLy5jYWNoZS9zdHlsZWxpbnQvXCJcbiAgICBdXG4gIH0sXG4gIFwicG5wbVwiOiB7XG4gICAgXCJhbGxvd2VkRGVwcmVjYXRlZFZlcnNpb25zXCI6IHtcbiAgICAgIFwiYXJlLXdlLXRoZXJlLXlldFwiOiBcIipcIixcbiAgICAgIFwic291cmNlbWFwLWNvZGVjXCI6IFwiKlwiLFxuICAgICAgXCJkb21leGNlcHRpb25cIjogXCIqXCIsXG4gICAgICBcInczYy1oci10aW1lXCI6IFwiKlwiLFxuICAgICAgXCJpbmZsaWdodFwiOiBcIipcIixcbiAgICAgIFwibnBtbG9nXCI6IFwiKlwiLFxuICAgICAgXCJyaW1yYWZcIjogXCIqXCIsXG4gICAgICBcInN0YWJsZVwiOiBcIipcIixcbiAgICAgIFwiZ2F1Z2VcIjogXCIqXCIsXG4gICAgICBcImFiYWJcIjogXCIqXCIsXG4gICAgICBcImdsb2JcIjogXCIqXCJcbiAgICB9LFxuICAgIFwicGVlckRlcGVuZGVuY3lSdWxlc1wiOiB7XG4gICAgICBcImFsbG93ZWRWZXJzaW9uc1wiOiB7XG4gICAgICAgIFwiZXNsaW50XCI6IFwiOVwiXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy95dWppZS9Eb2N1bWVudHMvdGltbXkvZGVtby9kYXBwX2RldmVsb3BfZGVtby9idWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3l1amllL0RvY3VtZW50cy90aW1teS9kZW1vL2RhcHBfZGV2ZWxvcF9kZW1vL2J1aWxkL2luZm8uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3l1amllL0RvY3VtZW50cy90aW1teS9kZW1vL2RhcHBfZGV2ZWxvcF9kZW1vL2J1aWxkL2luZm8uanNcIjtpbXBvcnQgeyBnZXRQYWNrYWdlU2l6ZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgZHVyYXRpb24gZnJvbSBcImRheWpzL3BsdWdpbi9kdXJhdGlvblwiO1xuaW1wb3J0IGdyYWRpZW50U3RyaW5nIGZyb20gXCJncmFkaWVudC1zdHJpbmdcIjtcbmltcG9ydCBib3hlbiBmcm9tIFwiYm94ZW5cIjtcbmRheWpzLmV4dGVuZChkdXJhdGlvbik7XG5cbmNvbnN0IHdlbGNvbWVNZXNzYWdlID0gZ3JhZGllbnRTdHJpbmcoXCJjeWFuXCIsIFwibWFnZW50YVwiKS5tdWx0aWxpbmUoXG4gIGBcdTZCMjJcdThGQ0VcdTgwNTRcdTdDRkJcdUZGMUFcdTVGRDdcdTU3NjRcdUZGMENUdXJuaW5nX3NlYX5gXG4pO1xuXG5jb25zdCBib3hlbk9wdGlvbnMgPSB7XG4gIHBhZGRpbmc6IDAuNSxcbiAgYm9yZGVyQ29sb3I6IFwiY3lhblwiLFxuICBib3JkZXJTdHlsZTogXCJyb3VuZFwiXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdml0ZUJ1aWxkSW5mbygpIHtcbiAgbGV0IGNvbmZpZztcbiAgbGV0IHN0YXJ0VGltZTtcbiAgbGV0IGVuZFRpbWU7XG4gIGxldCBvdXREaXI7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJ2aXRlOmJ1aWxkSW5mb1wiLFxuICAgIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnKSB7XG4gICAgICBjb25maWcgPSByZXNvbHZlZENvbmZpZztcbiAgICAgIG91dERpciA9IHJlc29sdmVkQ29uZmlnLmJ1aWxkPy5vdXREaXIgPz8gXCJkaXN0XCI7XG4gICAgfSxcbiAgICBidWlsZFN0YXJ0KCkge1xuICAgICAgY29uc29sZS5sb2coYm94ZW4od2VsY29tZU1lc3NhZ2UsIGJveGVuT3B0aW9ucykpO1xuICAgICAgaWYgKGNvbmZpZy5jb21tYW5kID09PSBcImJ1aWxkXCIpIHtcbiAgICAgICAgc3RhcnRUaW1lID0gZGF5anMobmV3IERhdGUoKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGlmIChjb25maWcuY29tbWFuZCA9PT0gXCJidWlsZFwiKSB7XG4gICAgICAgIGVuZFRpbWUgPSBkYXlqcyhuZXcgRGF0ZSgpKTtcbiAgICAgICAgZ2V0UGFja2FnZVNpemUoe1xuICAgICAgICAgIGZvbGRlcjogb3V0RGlyLFxuICAgICAgICAgIGNhbGxiYWNrOiBzaXplID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBib3hlbihcbiAgICAgICAgICAgICAgICBncmFkaWVudFN0cmluZyhcImN5YW5cIiwgXCJtYWdlbnRhXCIpLm11bHRpbGluZShcbiAgICAgICAgICAgICAgICAgIGBcdUQ4M0NcdURGODkgXHU2MDZEXHU1NTlDXHU2MjUzXHU1MzA1XHU1QjhDXHU2MjEwXHVGRjA4XHU2MDNCXHU3NTI4XHU2NUY2JHtkYXlqc1xuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oZW5kVGltZS5kaWZmKHN0YXJ0VGltZSkpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JtYXQoXCJtbVx1NTIwNnNzXHU3OUQyXCIpfVx1RkYwQ1x1NjI1M1x1NTMwNVx1NTQwRVx1NzY4NFx1NTkyN1x1NUMwRlx1NEUzQSR7c2l6ZX1cdUZGMDlgXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBib3hlbk9wdGlvbnNcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3l1amllL0RvY3VtZW50cy90aW1teS9kZW1vL2RhcHBfZGV2ZWxvcF9kZW1vL2J1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW8vYnVpbGQvY29tcHJlc3MuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3l1amllL0RvY3VtZW50cy90aW1teS9kZW1vL2RhcHBfZGV2ZWxvcF9kZW1vL2J1aWxkL2NvbXByZXNzLmpzXCI7aW1wb3J0IHsgaXNBcnJheSB9IGZyb20gXCJAcHVyZWFkbWluL3V0aWxzXCI7XG5pbXBvcnQgY29tcHJlc3NQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XG5cbmV4cG9ydCBjb25zdCBjb25maWdDb21wcmVzc1BsdWdpbiA9IGNvbXByZXNzID0+IHtcbiAgaWYgKGNvbXByZXNzID09PSBcIm5vbmVcIikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZ3ogPSB7XG4gICAgLy8gXHU3NTFGXHU2MjEwXHU3Njg0XHU1MzhCXHU3RjI5XHU1MzA1XHU1NDBFXHU3RjAwXG4gICAgZXh0OiBcIi5nelwiLFxuICAgIC8vIFx1NEY1M1x1NzlFRlx1NTkyN1x1NEU4RXRocmVzaG9sZFx1NjI0RFx1NEYxQVx1ODhBQlx1NTM4Qlx1N0YyOVxuICAgIHRocmVzaG9sZDogMCxcbiAgICAvLyBcdTlFRDhcdThCQTRcdTUzOEJcdTdGMjkuanN8bWpzfGpzb258Y3NzfGh0bWxcdTU0MEVcdTdGMDBcdTY1ODdcdTRFRjZcdUZGMENcdThCQkVcdTdGNkVcdTYyMTB0cnVlXHVGRjBDXHU1MzhCXHU3RjI5XHU1MTY4XHU5MEU4XHU2NTg3XHU0RUY2XG4gICAgZmlsdGVyOiAoKSA9PiB0cnVlLFxuICAgIC8vIFx1NTM4Qlx1N0YyOVx1NTQwRVx1NjYyRlx1NTQyNlx1NTIyMFx1OTY2NFx1NTM5Rlx1NTlDQlx1NjU4N1x1NEVGNlxuICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXG4gIH07XG4gIGNvbnN0IGJyID0ge1xuICAgIGV4dDogXCIuYnJcIixcbiAgICBhbGdvcml0aG06IFwiYnJvdGxpQ29tcHJlc3NcIixcbiAgICB0aHJlc2hvbGQ6IDAsXG4gICAgZmlsdGVyOiAoKSA9PiB0cnVlLFxuICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXG4gIH07XG5cbiAgY29uc3QgY29kZUxpc3QgPSBbXG4gICAgeyBrOiBcImd6aXBcIiwgdjogZ3ogfSxcbiAgICB7IGs6IFwiYnJvdGxpXCIsIHY6IGJyIH0sXG4gICAgeyBrOiBcImJvdGhcIiwgdjogW2d6LCBicl0gfVxuICBdO1xuXG4gIGNvbnN0IHBsdWdpbnMgPSBbXTtcblxuICBjb2RlTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGlmIChjb21wcmVzcy5pbmNsdWRlcyhpdGVtLmspKSB7XG4gICAgICBpZiAoY29tcHJlc3MuaW5jbHVkZXMoXCJjbGVhclwiKSkge1xuICAgICAgICBpZiAoaXNBcnJheShpdGVtLnYpKSB7XG4gICAgICAgICAgaXRlbS52LmZvckVhY2godkl0ZW0gPT4ge1xuICAgICAgICAgICAgcGx1Z2lucy5wdXNoKFxuICAgICAgICAgICAgICBjb21wcmVzc1BsdWdpbihPYmplY3QuYXNzaWduKHZJdGVtLCB7IGRlbGV0ZU9yaWdpbkZpbGU6IHRydWUgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsdWdpbnMucHVzaChcbiAgICAgICAgICAgIGNvbXByZXNzUGx1Z2luKE9iamVjdC5hc3NpZ24oaXRlbS52LCB7IGRlbGV0ZU9yaWdpbkZpbGU6IHRydWUgfSkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoaXRlbS52KSkge1xuICAgICAgICAgIGl0ZW0udi5mb3JFYWNoKHZJdGVtID0+IHtcbiAgICAgICAgICAgIHBsdWdpbnMucHVzaChjb21wcmVzc1BsdWdpbih2SXRlbSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsdWdpbnMucHVzaChjb21wcmVzc1BsdWdpbihpdGVtLnYpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBsdWdpbnM7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW8vYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95dWppZS9Eb2N1bWVudHMvdGltbXkvZGVtby9kYXBwX2RldmVsb3BfZGVtby9idWlsZC9vcHRpbWl6ZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW8vYnVpbGQvb3B0aW1pemUuanNcIjsvKipcbiAqIFx1NkI2NFx1NjU4N1x1NEVGNlx1NEY1Q1x1NzUyOFx1NEU4RSBgdml0ZS5jb25maWcudHNgIFx1NzY4NCBgb3B0aW1pemVEZXBzLmluY2x1ZGVgIFx1NEY5RFx1OEQ1Nlx1OTg4NFx1Njc4NFx1NUVGQVx1OTE0RFx1N0Y2RVx1OTg3OVxuICogXHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXHVGRjBDYHZpdGVgIFx1NTQyRlx1NTJBOFx1NjVGNlx1NEYxQVx1NUMwNlx1NEUwQlx1OTc2MiBpbmNsdWRlIFx1OTFDQ1x1NzY4NFx1NkEyMVx1NTc1N1x1RkYwQ1x1N0YxNlx1OEJEMVx1NjIxMCBlc20gXHU2ODNDXHU1RjBGXHU1RTc2XHU3RjEzXHU1QjU4XHU1MjMwIG5vZGVfbW9kdWxlcy8udml0ZSBcdTY1ODdcdTRFRjZcdTU5MzlcdUZGMENcdTk4NzVcdTk3NjJcdTUyQTBcdThGN0RcdTUyMzBcdTVCRjlcdTVFOTRcdTZBMjFcdTU3NTdcdTY1RjZcdTU5ODJcdTY3OUNcdTZENEZcdTg5QzhcdTU2NjhcdTY3MDlcdTdGMTNcdTVCNThcdTVDMzFcdThCRkJcdTUzRDZcdTZENEZcdTg5QzhcdTU2NjhcdTdGMTNcdTVCNThcdUZGMENcdTU5ODJcdTY3OUNcdTZDQTFcdTY3MDlcdTRGMUFcdThCRkJcdTUzRDZcdTY3MkNcdTU3MzBcdTdGMTNcdTVCNThcdTVFNzZcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcbiAqIFx1NUMyNFx1NTE3Nlx1NUY1M1x1NjBBOFx1Nzk4MVx1NzUyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1N0YxM1x1NUI1OFx1NjVGNlx1RkYwOFx1OEZEOVx1NzlDRFx1NjBDNVx1NTFCNVx1NTNFQVx1NUU5NFx1OEJFNVx1NTNEMVx1NzUxRlx1NTcyOFx1OEMwM1x1OEJENVx1OTYzNlx1NkJCNVx1RkYwOVx1NUZDNVx1OTg3Qlx1NUMwNlx1NUJGOVx1NUU5NFx1NkEyMVx1NTc1N1x1NTJBMFx1NTE2NVx1NTIzMCBpbmNsdWRlXHU5MUNDXHVGRjBDXHU1NDI2XHU1MjE5XHU0RjFBXHU5MDQ3XHU1MjMwXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU1MjA3XHU2MzYyXHU5ODc1XHU5NzYyXHU1MzYxXHU5ODdGXHU3Njg0XHU5NUVFXHU5ODk4XHVGRjA4dml0ZSBcdTRGMUFcdThCQTRcdTRFM0FcdTVCODNcdTY2MkZcdTRFMDBcdTRFMkFcdTY1QjBcdTc2ODRcdTRGOURcdThENTZcdTUzMDVcdTRGMUFcdTkxQ0RcdTY1QjBcdTUyQTBcdThGN0RcdTVFNzZcdTVGM0FcdTUyMzZcdTUyMzdcdTY1QjBcdTk4NzVcdTk3NjJcdUZGMDlcdUZGMENcdTU2RTBcdTRFM0FcdTVCODNcdTY1RTJcdTY1RTBcdTZDRDVcdTRGN0ZcdTc1MjhcdTZENEZcdTg5QzhcdTU2NjhcdTdGMTNcdTVCNThcdUZGMENcdTUzQzhcdTZDQTFcdTY3MDlcdTU3MjhcdTY3MkNcdTU3MzAgbm9kZV9tb2R1bGVzLy52aXRlIFx1OTFDQ1x1N0YxM1x1NUI1OFxuICogXHU2RTI5XHU5OUE4XHU2M0QwXHU3OTNBXHVGRjFBXHU1OTgyXHU2NzlDXHU2MEE4XHU0RjdGXHU3NTI4XHU3Njg0XHU3QjJDXHU0RTA5XHU2NUI5XHU1RTkzXHU2NjJGXHU1MTY4XHU1QzQwXHU1RjE1XHU1MTY1XHVGRjBDXHU0RTVGXHU1QzMxXHU2NjJGXHU1RjE1XHU1MTY1XHU1MjMwIHNyYy9tYWluLnRzIFx1NjU4N1x1NEVGNlx1OTFDQ1x1RkYwQ1x1NUMzMVx1NEUwRFx1OTcwMFx1ODk4MVx1NTE4RFx1NkRGQlx1NTJBMFx1NTIzMCBpbmNsdWRlIFx1OTFDQ1x1NEU4Nlx1RkYwQ1x1NTZFMFx1NEUzQSB2aXRlIFx1NEYxQVx1ODFFQVx1NTJBOFx1NUMwNlx1NUI4M1x1NEVFQ1x1N0YxM1x1NUI1OFx1NTIzMCBub2RlX21vZHVsZXMvLnZpdGVcbiAqL1xuY29uc3QgaW5jbHVkZSA9IFtcInFzXCIsIFwibWl0dFwiLCBcImRheWpzXCIsIFwiYXhpb3NcIiwgXCJwaW55aW4tcHJvXCJdO1xuXG4vKipcbiAqIFx1NTcyOFx1OTg4NFx1Njc4NFx1NUVGQVx1NEUyRFx1NUYzQVx1NTIzNlx1NjM5Mlx1OTY2NFx1NzY4NFx1NEY5RFx1OEQ1Nlx1OTg3OVxuICogXHU2RTI5XHU5OUE4XHU2M0QwXHU3OTNBXHVGRjFBXHU2MjQwXHU2NzA5XHU0RUU1IGBAaWNvbmlmeS1pY29ucy9gIFx1NUYwMFx1NTkzNFx1NUYxNVx1NTE2NVx1NzY4NFx1NzY4NFx1NjcyQ1x1NTczMFx1NTZGRVx1NjgwN1x1NkEyMVx1NTc1N1x1RkYwQ1x1OTBGRFx1NUU5NFx1OEJFNVx1NTJBMFx1NTE2NVx1NTIzMFx1NEUwQlx1OTc2Mlx1NzY4NCBgZXhjbHVkZWAgXHU5MUNDXHVGRjBDXHU1NkUwXHU0RTNBXHU1RTczXHU1M0YwXHU2M0E4XHU4MzUwXHU3Njg0XHU0RjdGXHU3NTI4XHU2NUI5XHU1RjBGXHU2NjJGXHU1NEVBXHU5MUNDXHU5NzAwXHU4OTgxXHU1NEVBXHU5MUNDXHU1RjE1XHU1MTY1XHU4MDBDXHU0RTE0XHU5MEZEXHU2NjJGXHU1MzU1XHU0RTJBXHU3Njg0XHU1RjE1XHU1MTY1XHVGRjBDXHU0RTBEXHU5NzAwXHU4OTgxXHU5ODg0XHU2Nzg0XHU1RUZBXHVGRjBDXHU3NkY0XHU2M0E1XHU4QkE5XHU2RDRGXHU4OUM4XHU1NjY4XHU1MkEwXHU4RjdEXHU1QzMxXHU1OTdEXG4gKi9cbmNvbnN0IGV4Y2x1ZGUgPSBbXTtcblxuZXhwb3J0IHsgaW5jbHVkZSwgZXhjbHVkZSB9O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95dWppZS9Eb2N1bWVudHMvdGltbXkvZGVtby9kYXBwX2RldmVsb3BfZGVtby92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveXVqaWUvRG9jdW1lbnRzL3RpbW15L2RlbW8vZGFwcF9kZXZlbG9wX2RlbW8vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBnZXRQbHVnaW5zTGlzdCB9IGZyb20gXCIuL2J1aWxkL3BsdWdpbnNcIjtcbmltcG9ydCB7IGluY2x1ZGUsIGV4Y2x1ZGUgfSBmcm9tIFwiLi9idWlsZC9vcHRpbWl6ZVwiO1xuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQge1xuICByb290LFxuICBhbGlhcyxcbiAgd3JhcHBlckVudixcbiAgcGF0aFJlc29sdmUsXG4gIF9fQVBQX0lORk9fX1xufSBmcm9tIFwiLi9idWlsZC91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgY29uc3Qge1xuICAgIFZJVEVfQ0ROLFxuICAgIFZJVEVfUE9SVCxcbiAgICBWSVRFX0NPTVBSRVNTSU9OLFxuICAgIFZJVEVfUFVCTElDX1BBVEgsXG4gICAgVklURV9BUElfVVJMLFxuICAgIFZJVEVfUE9ST1hZX1VSTFxuICB9ID0gd3JhcHBlckVudihsb2FkRW52KG1vZGUsIHJvb3QpKTtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBWSVRFX1BVQkxJQ19QQVRILFxuICAgIHJvb3QsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXNcbiAgICB9LFxuICAgIC8vIFx1NjcwRFx1NTJBMVx1N0FFRlx1NkUzMlx1NjdEM1xuICAgIHNlcnZlcjoge1xuICAgICAgLy8gXHU3QUVGXHU1M0UzXHU1M0Y3XG4gICAgICBwb3J0OiBWSVRFX1BPUlQsXG4gICAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFtWSVRFX0FQSV9VUkxdOiB7XG4gICAgICAgICAgLy8gXHU4RkQ5XHU5MUNDXHU1ODZCXHU1MTk5XHU1NDBFXHU3QUVGXHU1NzMwXHU1NzQwXG4gICAgICAgICAgdGFyZ2V0OiBWSVRFX1BPUk9YWV9VUkwsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IHBhdGggPT5cbiAgICAgICAgICAgIHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtWSVRFX0FQSV9VUkx9YCksIFZJVEVfQVBJX1VSTCArIFwiXCIpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBcdTk4ODRcdTcwRURcdTY1ODdcdTRFRjZcdTRFRTVcdTYzRDBcdTUyNERcdThGNkNcdTYzNjJcdTU0OENcdTdGMTNcdTVCNThcdTdFRDNcdTY3OUNcdUZGMENcdTk2NERcdTRGNEVcdTU0MkZcdTUyQThcdTY3MUZcdTk1RjRcdTc2ODRcdTUyMURcdTU5Q0JcdTk4NzVcdTk3NjJcdTUyQTBcdThGN0RcdTY1RjZcdTk1N0ZcdTVFNzZcdTk2MzJcdTZCNjJcdThGNkNcdTYzNjJcdTcwMTFcdTVFMDNcbiAgICAgIHdhcm11cDoge1xuICAgICAgICBjbGllbnRGaWxlczogW1wiLi9pbmRleC5odG1sXCIsIFwiLi9zcmMve3ZpZXdzLGNvbXBvbmVudHN9LypcIl1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsdWdpbnM6IGdldFBsdWdpbnNMaXN0KFZJVEVfQ0ROLCBWSVRFX0NPTVBSRVNTSU9OKSxcbiAgICAvLyBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnL2RlcC1vcHRpbWl6YXRpb24tb3B0aW9ucy5odG1sI2RlcC1vcHRpbWl6YXRpb24tb3B0aW9uc1xuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZSxcbiAgICAgIGV4Y2x1ZGVcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgc2lsZW5jZURlcHJlY2F0aW9uczogW1wibGVnYWN5LWpzLWFwaVwiXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgLy8gaHR0cHM6Ly9jbi52aXRlanMuZGV2L2d1aWRlL2J1aWxkLmh0bWwjYnJvd3Nlci1jb21wYXRpYmlsaXR5XG4gICAgICB0YXJnZXQ6IFwiZXMyMDE1XCIsXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgLy8gXHU2RDg4XHU5NjY0XHU2MjUzXHU1MzA1XHU1OTI3XHU1QzBGXHU4RDg1XHU4RkM3NTAwa2JcdThCNjZcdTU0NEFcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNDAwMCxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICBpbmRleDogcGF0aFJlc29sdmUoXCIuL2luZGV4Lmh0bWxcIiwgaW1wb3J0Lm1ldGEudXJsKVxuICAgICAgICB9LFxuICAgICAgICAvLyBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTUyMDZcdTdDN0JcdTYyNTNcdTUzMDVcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwic3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcInN0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fOiBmYWxzZSxcbiAgICAgIF9fQVBQX0lORk9fXzogSlNPTi5zdHJpbmdpZnkoX19BUFBfSU5GT19fKVxuICAgIH1cbiAg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QU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUMzQixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLFdBQVcsUUFBUSxNQUFNLElBQUksQ0FBQztBQUNsQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsQ0FBQyxZQUFZLEdBQUc7QUFBQTtBQUFBLFVBRWQsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUyxVQUNQLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxZQUFZLEVBQUUsR0FBRyxlQUFlLEVBQUU7QUFBQSxRQUNsRTtBQUFBLE1BQ0Y7QUFBQTtBQUFBLE1BRUEsUUFBUTtBQUFBLFFBQ04sYUFBYSxDQUFDLGdCQUFnQiw0QkFBNEI7QUFBQSxNQUM1RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsZUFBZSxVQUFVLGdCQUFnQjtBQUFBO0FBQUEsSUFFbEQsY0FBYztBQUFBLE1BQ1o7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0oscUJBQXFCLENBQUMsZUFBZTtBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQTtBQUFBLE1BRUwsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBO0FBQUEsTUFFWCx1QkFBdUI7QUFBQSxNQUN2QixlQUFlO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTCxPQUFPLFlBQVksZ0JBQWdCQSx5Q0FBZTtBQUFBLFFBQ3BEO0FBQUE7QUFBQSxRQUVBLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLDJCQUEyQjtBQUFBLE1BQzNCLGNBQWMsS0FBSyxVQUFVLFlBQVk7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsiZXJyIiwgImRheWpzIiwgImRheWpzIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwiXQp9Cg==
