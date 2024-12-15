<template>
  <div class="image-container">
    <img 
      :src="area.value" 
      crossorigin="anonymous"
      @load="handleImageLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TemplateArea } from '../../types/template'

const props = defineProps<{
  area: TemplateArea
}>();

const handleImageLoad = (e: Event) => {
  const img = e.target as HTMLImageElement;
  const container = img.parentElement;
  if (!container) return;

  const containerRatio = container.offsetWidth / container.offsetHeight;
  const imageRatio = img.naturalWidth / img.naturalHeight;
  const fit = props.area.config.fit || 'cover';

  if (fit === 'contain') {
    if (imageRatio > containerRatio) {
      // 图片更宽，使用宽度作为基准
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.top = '50%';
      img.style.transform = 'translateY(-50%)';
    } else {
      // 图片更高，使用高度作为基准
      img.style.height = '100%';
      img.style.width = 'auto';
      img.style.left = '50%';
      img.style.transform = 'translateX(-50%)';
    }
  } else if (fit === 'cover') {
    if (imageRatio > containerRatio) {
      // 图片更宽，使用高度作为基准
      img.style.height = '100%';
      img.style.width = 'auto';
      img.style.left = '50%';
      img.style.transform = 'translateX(-50%)';
    } else {
      // 图片更高，使用宽度作为基准
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.top = '50%';
      img.style.transform = 'translateY(-50%)';
    }
  }
};
</script>

<style scoped lang="less">
.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  
  img {
    position: absolute;
    display: block;
  }
}
</style> 