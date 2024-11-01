<template>
  <div class="h-[100vh] w-full flex justify-center items-center">
    <van-loading vertical>
      <template #icon>
        <van-icon name="star-o" size="30" />
      </template>
      {{ t("authorizationPending") }}
    </van-loading>
  </div>
</template>
<script setup>
import { useI18n } from "vue3-i18n";
const { t } = useI18n();
</script>
