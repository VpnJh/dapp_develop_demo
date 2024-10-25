<template>
  <header class="bg-white fixed top-0 left-0 right-0 border-b border-solid border-gray-200 shadow-[0px_4px_6px_#eee]" style="z-index: 10000">
    <div class="flex items-center justify-between px-[10px] pt-[20px] pb-[10px] relative ">
      <label class="input input-bordered flex items-center gap-2 w-full">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-5 w-5 opacity-70">
          <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd" />
        </svg>
        <input type="text" placeholder="Search..." v-model="searchValue" @input="handleInput" class="grow" />
      </label>
    </div>
  </header>
  <div class="h-[82px]"></div>
  <popup border-radius="0px" :mask-click="false" bg-color="transparent" :show="lists.length>0"  is-cover-all>
    <div class="bg-white w-[100vw] h-[100vh] overflow-y-scroll">
      <div class="h-[82px]"></div>
      <FreeListItem v-for="(item,index) in lists" :key="item.id.attributes['im:id']" :index="index" :data="item"  />
    </div>
  </popup>
</template>
<script setup>
import {onMounted, onUnmounted, toRef} from "vue";
import {emitter} from "@/utils/mitt.utils.js";
import {EVENT_BUS_NAME} from "@/constant/eventBusName";
import _ from 'lodash'
import Popup from "@/components/popup/popup.vue";
import FreeListItem from "@/views/index/components/FreeList/FreeListItem.vue";

const searchValue= toRef('');
const lists= toRef([])
const handleInput = _.debounce(($event) => {
  //@ts-ignore
  searchValue.value = ($event.target?.value ?? '').toString();
  emitter.emit(EVENT_BUS_NAME.SEARCH_FREE_LIST, searchValue.value)
}, 500)
function  handleCallBackData(data){
  lists.value= data;
}
onMounted(()=>{
  emitter.on(EVENT_BUS_NAME.SEARCH_FREE_LIST_CALLBACK, handleCallBackData)
})
onUnmounted(()=>{
  eventBus.off(EVENT_BUS_NAME.SEARCH_FREE_LIST_CALLBACK)
})
</script>
