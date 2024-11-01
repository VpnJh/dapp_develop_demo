<template>
  <van-tabbar
    v-model="menuActive"
    class="footers"
    :safe-area-inset-bottom="true"
    :border="false"
  >
    <van-tabbar-item replace to="/home">
      <span>{{ t("HeightPool.home") }}</span>
      <template #icon="props">
        <img :src="props.active ? icon.homeActive : icon.home" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/serve">
      <span>{{ t("HeightPool.service") }}</span>
      <template #icon="props">
        <img :src="props.active ? icon.serveActive : icon.serve" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/team">
      <span>{{ t("HeightPool.team") }}</span>
      <template #icon="props">
        <img :src="props.active ? icon.teamActive : icon.team" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/user">
      <span>{{ t("HeightPool.my") }}</span>
      <template #icon="props">
        <img :src="props.active ? icon.myActive : icon.myIcon" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
const menuActive = ref(0);
import { useI18n } from "vue3-i18n";
const { t } = useI18n();
import { getAssetsImageUrl } from "@/utils/index.utils.js";
import { useRoute } from "vue-router";
const route = useRoute();
watch(route, (to, from) => {
  const pathMappings = {
    "/home": 0,
    "/serve": 1,
    "/team": 2,
    "/user": 3
  };
  for (const path in pathMappings) {
    if (route.path.includes(path)) {
      menuActive.value = pathMappings[path];
      break;
    }
  }
});
const icon = {
  home: getAssetsImageUrl("/homeiconImg.png"),
  homeActive: getAssetsImageUrl("/homeiconActive.png"),
  serve: getAssetsImageUrl("/serveImg.png"),
  serveActive: getAssetsImageUrl("/serveActive.png"),
  team: getAssetsImageUrl("/teamImg.png"),
  teamActive: getAssetsImageUrl("/teamActive.png"),
  myIcon: getAssetsImageUrl("/myImg.png"),
  myActive: getAssetsImageUrl("/myActive.png")
};
onMounted(() => {
  const pathMappings = {
    "/home": 0,
    "/serve": 1,
    "/team": 2,
    "/user": 3
  };
  for (const path in pathMappings) {
    if (route.path.includes(path)) {
      menuActive.value = pathMappings[path];
      break;
    }
  }
});
</script>
<style lang="scss" scoped>
.footers {
  // height: 83px;
  background: #2d2d36;
  backdrop-filter: blur(51px);
  .van-tabbar-item--active {
    background: transparent;
    color: #ff693e !important;
  }
  .van-tabbar-item__icon {
    > img {
      width: 24px;
      height: 24px;
    }
  }
  .van-tabbar-item {
    font-family: PingFang SC;
    font-size: 10px;
    font-weight: 400;
    line-height: 14px;
    color: #ffffff99;
  }
}
</style>
