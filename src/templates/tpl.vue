<template>
  <div class="template-618" @mousedown.stop>
    <!-- 背景图 -->

    <!-- 主标题区域 -->
    <div
      class="title-area editable-area"
      :class="{ 'is-selected': isSelected('title') }"
      data-area-id="title"
      :style="{
        fontSize: getConfigValue('title', 'fontSize') + 'px',
        color: getConfigValue('title', 'color'),
        fontWeight: getConfigValue('title', 'fontWeight'),
        textAlign: getConfigValue('title', 'textAlign'),
      }"
      @mousedown.stop
      @click="handleAreaClick('title')"
    >
      {{ getConfigValue("title", "value") }}
    </div>

    <!-- 商品图片区域 -->
    <div
      class="product-area editable-area"
      :class="{ 'is-selected': isSelected('product') }"
      data-area-id="product"
      @mousedown.stop
      @click="handleAreaClick('product')"
    >
      <img
        :src="getConfigValue('product', 'value')"
        :style="{
          objectFit: getConfigValue('product', 'fit'),
        }"
        crossorigin="anonymous"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Template, TemplateArea } from "../types/template";

const props = defineProps<{
  template: Template;
  selectedArea: TemplateArea | null;
}>();

const emit = defineEmits<{
  (e: "select-area", area: TemplateArea): void;
}>();

// 获取配置值
const getConfigValue = (areaId: string, key: string) => {
  const area = props.template.areas.find((area) => area.id === areaId);
  return area?.config[key]?.default ?? "";
};

// 检查是否选中
const isSelected = (areaId: string) => {
  return props.selectedArea?.id === areaId;
};

// 处理区域点击
const handleAreaClick = (areaId: string) => {
  // 如果点击的是当前选中的区域，则取消选择
  if (props.selectedArea?.id === areaId) {
    emit("select-area", null);
    return;
  }

  // 否则选中点击的区域
  const area = props.template.areas.find((area) => area.id === areaId);
  if (area) {
    emit("select-area", area);
  }
};
</script>

<style scoped lang="less">
.template-618 {
  position: relative;
  width: 100%;
  height: 100%;

  .editable-area {
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      outline: 2px solid var(--primary-color);
    }

    &.is-selected {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  }

  .title-area {
    position: absolute;
    left: 50px;
    top: 100px;
    width: 650px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-area {
    position: absolute;
    left: 100px;
    top: 200px;
    width: 550px;
    height: 550px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
