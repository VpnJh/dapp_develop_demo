<template>
  <div class="flex flex-col align-items-center w-full px-[15px] ">
    <div class="flex flex-row  align-items-center items-center py-[15px] gap-x-[1rem]">
      <span class="text-[#666] flex justify-center items-center skeleton w-[12px] h-[25px]">
      </span>
      <div class="avatar skeleton" :style="{'position':'initial'}">
        <div class="w-[75px] h-[75px] skeleton" >
        </div>
      </div>
      <div class="flex-col flex gap-[10px] justify-between items-start flex-1 h-full">
        <p class=" skeleton w-[70%] h-[17px]">
        </p>
        <span class=" skeleton w-[50%] h-[16px]"></span>
        <div  class=" skeleton w-[40%] h-[12px]"></div>
      </div>
    </div>
    <div class="divider mt-0 mb-0 border-[#f6f6f6]  h-[1px]"></div>
  </div>
</template>

<script setup >
const props=defineProps()
</script>
