<template>
  <div class="splash-container" :class="{ 'fade-out': shouldHide }">
    <div class="splash">
      <div class="splash-circle"></div>
      <div class="splash-circle"></div>
      <div class="splash-circle"></div>
      <div class="splash-circle"></div>
      <div class="splash-circle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const shouldHide = ref(false);

onMounted(() => {
  setTimeout(() => {
    shouldHide.value = true;
  }, Math.random() * 2000);
});
</script>

<style lang="less" scoped>
.splash-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.5s ease-out;

  &.fade-out {
    opacity: 0;
    pointer-events: none;
  }
}

.splash {
  position: relative;
  width: 100px;
  height: 100px;
}

.splash-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0;
  animation: splash 1.4s ease-in-out infinite;
}

// 使用循环为每个圆圈设置延迟
.splash-circle:nth-child(1) {
  animation-delay: -0.16s;
}
.splash-circle:nth-child(2) {
  animation-delay: -0.32s;
}
.splash-circle:nth-child(3) {
  animation-delay: -0.48s;
}
.splash-circle:nth-child(4) {
  animation-delay: -0.64s;
}
.splash-circle:nth-child(5) {
  animation-delay: -0.8s;
}

@keyframes splash {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
