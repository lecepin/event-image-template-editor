<template>
  <div
    class="editor-canvas"
    :style="canvasStyle"
    @mousedown="handleCanvasClick"
  >
    <template v-if="template">
      <component
        :is="templateComponent"
        :template="template"
        :selectedArea="selectedArea"
        @select-area="handleAreaClick"
        @mousedown.stop
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import type { Template, TemplateArea } from "../types/template";

const props = defineProps<{
  template: Template | null;
  selectedArea: TemplateArea | null;
}>();

const emit = defineEmits<{
  (e: "select-area", area: TemplateArea | null): void;
}>();

// 动态加载模板组件
const templateComponent = computed(() => {
  if (!props.template?.templateFile) return null;
  return defineAsyncComponent(
    () => import(`../templates/${props.template.templateFile}.vue`)
  );
});

const canvasStyle = computed(() => {
  if (!props.template) return {};
  return {
    width: props.template.width ? `${props.template.width}px` : "unset",
    height: props.template.height
      ? `${props.template.height}px`
      : "max-content",
  };
});

const handleAreaClick = (area: TemplateArea) => {
  emit("select-area", area);
};

// 处理画布点击
const handleCanvasClick = (e: MouseEvent) => {
  // 如果点击的是画布本身（而不是其中的区域），则取消选择
  if (e.target === e.currentTarget) {
    emit("select-area", null);
  }
};
</script>

<style scoped lang="less">
.editor-canvas {
  position: relative;
  background: #fff;
  flex-shrink: 0;
}
</style>
