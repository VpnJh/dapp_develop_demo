<template>
  <div class="flex flex-col w-full ">
    <p class="px-[10px] pt-[15px] py-[0]" v-show="props.title">
      {{props.title}}
    </p>
    <div class="py-[5px]">
      <div class="carousel carousel-center bg-white rounded-box max-w-full space-x-4 pl-4 pr-4 pt-4 pb-0" v-if="isLoading" >
        <RecommendSkeletonItem  v-for="(item,index) in loadingList" :key="index" />
      </div>
      <div class="carousel carousel-center bg-white rounded-box max-w-full space-x-4 pl-4 pt-4 pr-4 pb-0" v-if="!isLoading" >
        <RecommendItem v-for="(item) in lists" :data="item"  :key="item.id.attributes['im:id']" />
      </div>
    </div>
  </div>
</template>
<script setup >
import { testApi } from "@/api";
import {onMounted, toRef} from "vue";
import RecommendItem from "@/views/index/components/recommend/RecommendItem.vue";
import RecommendSkeletonItem from "@/views/index/components/recommend/RecommendSkeletonItem.vue";
import {storage} from "@/utils/storage.utils";
import {STORAGE_NAME} from "@/constant/storageName";

const props = defineProps();
const lists= toRef([])
const loadingList= new Array(4).fill(0);
const isLoading= toRef(false);
onMounted(()=>{
  isLoading.value =true;
  const dataList = storage.get(STORAGE_NAME.HOT_APP_LIST);
  if(dataList){
    lists.value = dataList;
  }
  testApi.getHotAppList().then((res)=>{
    const { feed } = res.data;
    if(feed){
      isLoading.value =false;
      lists.value = feed.entry;
      storage.set(STORAGE_NAME.HOT_APP_LIST, lists.value);
    }
  }).catch((err)=>{
    console.error('error',err);
    isLoading.value = false;
    const dataList = storage.get(STORAGE_NAME.HOT_APP_LIST);
    if(dataList){
      lists.value = dataList;
    }
  })
})
</script>
