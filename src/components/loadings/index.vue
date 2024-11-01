<template>
  <van-overlay :show="loadStatus" z-index="100" :lock-scroll="true">
    <div class="wrapper" @click.stop>
      <div class="loader">
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import useStatusPup from "@/hooks/index";
const { loadStatus } = useStatusPup();
</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.loader {
  display: flex;
  align-items: center;
}

.bar {
  display: inline-block;
  width: 3px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  animation: scale-up4 1s linear infinite;
}

.bar:nth-child(2) {
  height: 35px;
  margin: 0 5px;
  animation-delay: 0.25s;
}

.bar:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes scale-up4 {
  20% {
    background-color: #ffff;
    transform: scaleY(1.5);
  }

  40% {
    transform: scaleY(1);
  }
}
</style>
