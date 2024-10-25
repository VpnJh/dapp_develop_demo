<template>
  <div class="overflow-hidden h-full w-full">
    <DynamicScroller
      :items="items"
      :min-item-size="props.itemContainerHeight"
      :emit-update="true"
      page-mode
      class="h-full w-full"
      @resize="onResize"
      @update="onUpdate"
      @scroll-end="handleReachBottom"
    >
      <template #before>
        <slot name="before" />
      </template>
      <template #after>
        <slot name="after" />
      </template>
      <template #default="{ item, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.$index]"
          :data-index="item.$index"
          :data-active="active"
          :title="`Click to change message ${item.$index}`"
          @click="changeMessage()"
        >
          <slot name="listItem" :data="item" :index="item.$index" />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>
<script setup>
import { computed, reactive,  toRef } from 'vue'
import _ from 'lodash'
const props = withDefaults(defineProps(), {
  itemContainerHeight: 50,
  lists: () => [],
  loadMoreItems: () => false
})
const isLoading = toRef(false)
const updateParts = reactive({
  viewStartIdx: 0,
  viewEndIdx: 0,
  visibleStartIdx: 0,
  visibleEndIdx: 0
})
const items = computed(() => props.lists)

const loadMoreDebounced = _.throttle(() => {
  const isBoolean = props.loadMoreItems()
  if (isBoolean) {
    isLoading.value = false
  }
}, 500)

function changeMessage() {}

function onResize() {}

function handleReachBottom() {
  if (isLoading.value) return
  isLoading.value = true
  loadMoreDebounced()
}

function onUpdate(
  viewStartIndex,
  viewEndIndex,
  visibleStartIndex,
  visibleEndIndex
) {
  updateParts.viewStartIdx = viewStartIndex
  updateParts.viewEndIdx = viewEndIndex
  updateParts.visibleStartIdx = visibleStartIndex
  updateParts.visibleEndIdx = visibleEndIndex
}
</script>
