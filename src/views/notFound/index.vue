<template>
  <div class="not-404">
    <img v-lazy="getAssetsImageUrl('/not404.png')" alt="" />
  </div>
</template>

<script setup>
import { getAssetsImageUrl } from "@/utils/index.utils.js";
</script>

<style lang="scss" scoped>
.not-404 {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
