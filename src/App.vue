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

  <footers v-if="hiddenFooter" />
</template>
<script setup>
import header from "@/components/header/index.vue";
import footer from "@/components/footer/index.vue";
import loading from "@/components/loadings/index.vue";
import { ref, getCurrentInstance, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const headers = header;
const footers = footer;
const { $cacheWhiteList } =
  getCurrentInstance().appContext.config.globalProperties;
const hiddeHeader = ref(true);
const hiddenFooter = ref(true);
watch(route, (to, from) => {
  hiddeHeader.value =
    route.meta.hiddenHeader !== void 0 ? route.meta.hiddenHeader : true;
  hiddenFooter.value =
    route.meta.hiddenFooter !== void 0 ? route.meta.hiddenFooter : true;
});
</script>
