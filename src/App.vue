<template>
  <headers />
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="$cacheWhiteList">
      <transition :name="(route.meta.transition || 'fade').toString()">
        <component :is="Component" :key="route.meta.name" />
      </transition>
    </keep-alive>
  </router-view>
</template>
<script setup>
import header from "@/components/header/index.vue";
import { getCurrentInstance } from "vue";
const headers = header;
const { $cacheWhiteList } =
  getCurrentInstance().appContext.config.globalProperties;
</script>
