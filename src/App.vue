<template>
  <headers v-if="hiddeHeader" />
  <loading />
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="$cacheWhiteList">
      <transition :name="(route.meta.transition || 'fade').toString()">
        <component :is="Component" :key="route.meta.name" />
      </transition>
    </keep-alive>
  </router-view>
  <van-floating-bubble
    v-if="whatShow && !route.path.includes('notFound')"
    v-model:offset="offset"
    axis="xy"
    icon="chat"
    magnetic="x"
    @click="onWhatAPP"
  >
    <template #default>
      <img
        v-lazy="getAssetsImageUrl('/whatsapp.png')"
        class="whatsappicon"
        alt=""
      />
    </template>
  </van-floating-bubble>
  <footers v-if="hiddenFooter" />
</template>
<script setup>
import header from "@/components/header/index.vue";
import footer from "@/components/footer/index.vue";
import loading from "@/components/loadings/index.vue";
import { ref, getCurrentInstance, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { testApi } from "@/api/index";
import { useConfigStore } from "@/stores/index";
const configStore = useConfigStore();
import { getAssetsImageUrl } from "@/utils/index.utils.js";
const route = useRoute();
const headers = header;
const footers = footer;
const { $cacheWhiteList } =
  getCurrentInstance().appContext.config.globalProperties;
const hiddeHeader = ref(false);
const hiddenFooter = ref(false);
watch(route, (to, from) => {
  hiddeHeader.value =
    route.meta.hiddenHeader !== void 0 ? route.meta.hiddenHeader : false;
  hiddenFooter.value =
    route.meta.hiddenFooter !== void 0 ? route.meta.hiddenFooter : false;
});
const offset = ref({ x: 298, y: 550 });
const whatUrl = ref("https://wa.me/");
const whatShow = ref(false);
const onWhatAPP = () => {
  window.open(whatUrl.value, "_blank");
};
const queryWhatsapp = () => {
  testApi
    .getWhatsapp({
      domains: configStore.$state.domainsUrl
    })
    .then(res => {
      if (res.code === 200) {
        whatShow.value = res.data.whatsapp !== "";
        whatUrl.value += res.data.whatsapp;
      }
    })
    .catch(() => {});
};
onMounted(() => {
  queryWhatsapp();
});
</script>
<style lang="scss">
.van-floating-bubble {
  background: #63c15b;
  .whatsappicon {
    width: 1.88rem;
  }
}
</style>
