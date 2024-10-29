<template>
  <div class="servePage">
    <div class="server-banner">
      <img v-lazy="getAssetsImageUrl('/serverImg/serverbanner.png')" alt="" />
    </div>
    <div class="server-bannertext">{{ t("title") }}</div>
    <div class="banner-img">
      <img v-lazy="getAssetsImageUrl('/serverImg/serverbanner1.png')" alt="" />
    </div>
    <div class="server-bannertext">{{ t("p_c01") }}</div>
    <div class="banner-img">
      <img v-lazy="getAssetsImageUrl('/serverImg/serverbanner2.png')" alt="" />
    </div>
    <div class="server-bannertext">{{ t("p_c02") }}</div>
    <div class="banner-img">
      <img v-lazy="getAssetsImageUrl('/serverImg/serverbanner3.png')" alt="" />
    </div>
    <div class="server-bannertext">{{ t("p_c03") }}</div>
  </div>
</template>

<script setup>
import { getAssetsImageUrl } from "@/utils/index.utils.js";
import { useI18n } from "vue3-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.servePage {
  padding: 1.14rem 1.14rem 6rem;
  border-top: 0.04rem solid #ffffff1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  .server-banner {
    margin-bottom: 1.43rem;
  }
  .banner-img {
    margin: 3rem 0 0.71rem;
    width: 77%;
    > img {
      width: 100%;
    }
  }
  .server-bannertext {
    font-family: PingFang SC;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.4rem;
    color: #ffffff;
    text-align: center;
  }
}
</style>
