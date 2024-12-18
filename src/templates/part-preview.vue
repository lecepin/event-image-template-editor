<template>
  <div
    class="tpl-part-preview editable-area"
    @mousedown.stop
    :class="{ 'is-selected': isSelected('part') }"
    @click="handleAreaClick('part')"
    :style="{
      backgroundImage: `url(${getConfigValue('part', 'bg')})`,
    }"
  >
    <img
      class="tpl-part-preview__image"
      :src="getConfigValue('part', 'picture')"
      alt="物料"
      :style="{
        maxWidth: getConfigValue('part', 'width') + '%',
        maxHeight: getConfigValue('part', 'width') + '%',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { TemplateProps, TemplateEmits } from "../types/template-props";
import { useTemplateArea } from "../composables/useTemplateArea";
import { toRef } from "vue";

const props = defineProps<TemplateProps>();
const emit = defineEmits<TemplateEmits>();

const { getConfigValue, isSelected, handleAreaClick } = useTemplateArea(
  props.template,
  toRef(props, "selectedArea"),
  emit
);
</script>

<style scoped lang="less">
.tpl-part-preview {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494875467image.png)
    no-repeat center center;
  background-size: cover;

  &__image {
    // width: 70%;
    max-height: 70%;
    max-width: 70%;
  }
}
</style>
