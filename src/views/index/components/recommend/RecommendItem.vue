<template>
  <a class="carousel-item" :href="props.data.id.label" :style="{ width: imgHeight.toString()}">
    <div class="flex-col flex align-items-center justify-center" >
      <img
          v-lazy="{src:props.data['im:image'][props.data['im:image'].length-1].label}"
          class="rounded-box" :class="[`w-[${imgHeight}]`,`h-[${imgHeight}]`]" />
      <p class="inline-block overflow-hidden text-ellipsis whitespace-nowrap mt-[7px]" :style="{ width: imgHeight.toString()}">
        {{props.data["im:name"].label}}
      </p>
      <span class="text-center text-[#c7c7c7] mt-[3px]">
         {{props.data.category.attributes.label}}
      </span>
    </div>
  </a>
</template>
<script setup >
import {computed} from "vue";
const props = defineProps();

const imgHeight = computed(() => props.data['im:image'][props.data['im:image'].length-1].label?(props.data['im:image'][props.data['im:image'].length-1].attributes.height+'px'):'100px');
</script>
