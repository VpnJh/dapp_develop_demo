<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="(route.meta.transition || 'fade').toString()">
      <keep-alive v-if="route.meta.cache">
        <component :is="Component" />
      </keep-alive>
      <template v-else>
        <component :is="Component" />
      </template>
    </transition>
  </router-view>
</template>
