<template>
  <div @click="handleLink(props.data.id.label)" class="flex flex-col align-items-center w-full px-[15px] ">
    <div class="flex flex-row  align-items-center items-center py-[15px] gap-x-[1rem]">
      <span class="text-[#666] flex justify-center items-center">
        {{props.index + 1}}
      </span>
      <div class="avatar " :style="{'position':'initial'}">
        <div class="w-[75px] h-[75px] " :class="{'rounded-xl': props.index % 2 === 0,'rounded-full': props.index % 2 !== 0 }">
          <img v-lazy="{src:props.data['im:image'][1].label}" />
        </div>
      </div>
      <div class="flex-col flex gap-0.5 justify-items-start items-start flex-1">
<!--        <p class="tooltip" @click="handleSelect" :class="{'tooltip-open':show }" :data-tip="props.data['im:name'].label">-->
<!--          <button  class="text-left text-[#000] line-clamp-1 overflow-hidden">-->
<!--            {{props.data['im:name'].label}}-->
<!--          </button>-->
<!--        </p>-->
        <p  class="text-left text-[#000] line-clamp-1 overflow-hidden">
          {{props.data['im:name'].label}}
        </p>
        <span class="text-[#999] text-[12px]">{{props.data.category.attributes.label}}</span>
        <div class="flex items-center ">
          <div class="rating rating-sm rating-half">
            <input type="radio" name="rating-10" class="mask mask-star-2"
                   :class="{'mask-half-1': (index +1) % 2 !== 0, 'mask-half-2': (index +1) % 2 === 0,'bg-yellow-400':handleChecked(index+1),'bg-yellow-100':!handleChecked(index+1)}" v-for="(item,index) in new Array(10).fill(0)" :key="index"
                   />
          </div>
          <span>（{{props.data.userRatingCount}}）</span>
        </div>
      </div>
    </div>
    <div class="divider mt-0 mb-0 border-[#f6f6f6]  h-[1px]"></div>
  </div>
</template>
<script setup >
import {computed,  onUnmounted, toRef} from "vue";

const props=defineProps()
// const show: Ref<boolean> = toRef<boolean>(false);
const timer= toRef<number|null>(null);
// function handleSelect(){
//   if(show.value){
//     return;
//   }
//   timer.value && clearTimeout(timer.value);
//   show.value = true;
//   timer.value = setTimeout(()=>{
//     timer.value && clearTimeout(timer.value);
//     show.value = false;
//     nextTick(()=>{
//       console.log('  timer.value&& clearTimeout(timer.value);', show.value)
//     });
//   }, 2000)
// }
const averageUserRating=computed(()=>  Math.floor(props.data.averageUserRating/ 0.5));
const handleChecked = function (index){
  return index <= averageUserRating.value;
}
function handleLink(link){
  window.open(link, '_self');
}
onUnmounted(()=>{
  timer.value && clearTimeout(timer.value);
})
</script>
