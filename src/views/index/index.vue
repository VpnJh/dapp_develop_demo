<script setup >
import SearchHeader from "@/views/index/components/searchHeader/SearchHeader.vue";
import Recommend from "@/views/index/components/recommend/Recommend.vue";
import AppScrollList from "@/components/appScrollList/AppScrollList.vue";
import FreeListItem from "@/views/index/components/FreeList/FreeListItem.vue";
import {computed, onMounted, onUnmounted, reactive, toRef} from "vue";
import {testApi} from "@/api";
import FreeSkeletonItem from "@/views/index/components/FreeList/FreeSkeletonItem.vue";
import {storage} from "@/utils/storage.utils";
import {STORAGE_NAME} from "@/constant/storageName";
import {emitter} from "@/utils/mitt.utils.js";
import {EVENT_BUS_NAME} from "@/constant/eventBusName";
debugger;
const lists= toRef([])
const loadingList= new Array(6).fill(0);
const isLoading= toRef(false);
const pageParams= reactive({
  page: 1,
  limit: 30,
  lists: [],
  total: 0,
})

const pageLists= computed(()=> lists.value.slice(0,pageParams.page * pageParams.limit))

function handleSearch(searchText){
  if(!searchText.length){
    return  emitter.emit(EVENT_BUS_NAME.SEARCH_FREE_LIST_CALLBACK,[]);
  }
  const text= searchText.trim();
  const callBackDataList=[...lists.value].filter((item)=>{
    return item.description.indexOf(text)>-1||item['im:contentType'].attributes.label.indexOf(text)>-1|| item['im:name'].label.indexOf(text)>-1|| item.title.label.indexOf(text)>-1;
  })
  emitter.emit(EVENT_BUS_NAME.SEARCH_FREE_LIST_CALLBACK,callBackDataList)
}

function loadMoreAppList(){
  const totalPage=(pageParams.total / pageParams.limit ) + ((pageParams.total % pageParams.limit)>0?1:0);
  if(pageParams.page <= totalPage){
    pageParams.page++;
  }
  return true;
}

onMounted(()=>{
  emitter.on(EVENT_BUS_NAME.SEARCH_FREE_LIST, handleSearch)
  isLoading.value =true;
  const dataList = storage.get(STORAGE_NAME.FREE_APP_LIST);
  if(dataList){
    lists.value = dataList;
    pageParams.total=lists.value.length;
  }
  testApi.getFreeAppList({limit: 100}).
  then((res )=>{
    const { feed } = res.data;
    if(feed){
      const listsData = feed.entry;
      const ids= listsData.map((item)=>{
        return item.id.attributes['im:id'];
      });
      testApi.getFreeListInfo({id: ids.join(',')}).then(
          (response)=>{
            const { results } = response.data;
            if(results&&results.length>0){
              isLoading.value =false;
              lists.value=  listsData.map((item,index) => {
                return {...item,...results[index], $index: index}
              })
              pageParams.total=lists.value.length;
              storage.set(STORAGE_NAME.FREE_APP_LIST, lists.value);
            }
          }
      )
    }
  }).catch((err)=>{
    console.error('error',err);
    isLoading.value = false;
    const dataList = storage.get(STORAGE_NAME.FREE_APP_LIST);
    if(dataList){
      lists.value = dataList;
      pageParams.total=lists.value.length;
    }
  })
})
onUnmounted(()=>{
  emitter.off(EVENT_BUS_NAME.SEARCH_FREE_LIST)
})
</script>
<template>
  <AppScrollList :load-more-items="loadMoreAppList" :lists="pageLists" :itemContainerHeight="105">
    <template v-slot:before>
      <SearchHeader  />
      <Recommend  title="Recommend"/>
      <div class="divider mt-0 mb-0 border-[#f6f6f6] h-[1px]"></div>
      <div v-if="lists.length<=0&&isLoading">
        <FreeSkeletonItem  :index="index" v-for="(item,index) in loadingList" :key="index" />
      </div>
    </template>
    <template v-slot:after>
<!--      <div class="max-w-[100vw] " v-if="!isLoading">-->
<!--        <FreeListItem v-for="(item,index) in lists" :key="item.id.attributes['im:id']" :index="index" :data="item"  />-->
<!--      </div>-->
    </template>
    <template  #listItem="listItem">
      <FreeListItem :data="listItem.data" :index="listItem.index"  />
    </template>
  </AppScrollList>
</template>
