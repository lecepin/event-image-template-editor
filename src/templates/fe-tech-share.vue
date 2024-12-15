<template>
  <div class="tpl-fe-tech-share" @mousedown.stop>
    <div class="tpl-fe-tech-share__header">
      <img
        class="tpl-fe-tech-share__logo"
        src="https://fe-video-qc.xhscdn.com/fe-platform/adbf5d0b8fc3cfc89d6d249b3be297e958f94c29.svg"
      />
    </div>
    <div class="tpl-fe-tech-share__content">
      <!-- 标题区域 -->
      <h1
        class="editable-area"
        :class="{ 'is-selected': isSelected('title') }"
        data-area-id="title"
        :style="{
          fontSize: getConfigValue('title', 'fontSize') + 'px',
          color: getConfigValue('title', 'color'),
        }"
        @mousedown.stop
        @click="handleAreaClick('title')"
      >
        {{ getConfigValue("title", "value") }}
      </h1>

      <!-- 海报图片区域 -->
      <div
        class="tpl-fe-tech-share__image-placeholder editable-area"
        :class="{ 'is-selected': isSelected('poster') }"
        data-area-id="poster"
        @mousedown.stop
        @click="handleAreaClick('poster')"
      >
        <img :src="getConfigValue('poster', 'value')" crossorigin="anonymous" />
      </div>

      <!-- 演讲嘉宾区域 -->
      <div
        class="tpl-fe-tech-share__speaker editable-area"
        :class="{ 'is-selected': isSelected('speaker') }"
        data-area-id="speaker"
        :style="{
          fontSize: getConfigValue('speaker', 'fontSize') + 'px',
          color: getConfigValue('speaker', 'color'),
          fontWeight: getConfigValue('speaker', 'fontWeight'),
          textAlign: getConfigValue('speaker', 'textAlign'),
        }"
        @mousedown.stop
        @click="handleAreaClick('speaker')"
      >
        {{ getConfigValue("speaker", "value") }}
      </div>

      <!-- 团队区域 -->
      <div
        class="tpl-fe-tech-share__team editable-area"
        :class="{ 'is-selected': isSelected('team') }"
        data-area-id="team"
        :style="{
          fontSize: getConfigValue('team', 'fontSize') + 'px',
          color: getConfigValue('team', 'color'),
          textAlign: getConfigValue('team', 'textAlign'),
        }"
        @mousedown.stop
        @click="handleAreaClick('team')"
      >
        {{ getConfigValue("team", "value") }}
      </div>

      <!-- 描述区域 -->
      <div
        class="tpl-fe-tech-share__description editable-area"
        :class="{ 'is-selected': isSelected('description') }"
        data-area-id="description"
        :style="{
          fontSize: getConfigValue('description', 'fontSize') + 'px',
          color: getConfigValue('description', 'color'),
          lineHeight: getConfigValue('description', 'lineHeight'),
        }"
        @mousedown.stop
        @click="handleAreaClick('description')"
        v-html="formatText(getConfigValue('description', 'value'))"
      />

      <!-- 地点和时间区域 -->
      <div
        class="tpl-fe-tech-share__location editable-area"
        :class="{ 'is-selected': isSelected('location') }"
        data-area-id="location"
        :style="{
          fontSize: getConfigValue('location', 'fontSize') + 'px',
          color: getConfigValue('location', 'color'),
        }"
        @mousedown.stop
        @click="handleAreaClick('location')"
      >
        <img
          src="https://picasso-static.xiaohongshu.com/fe-platform/7fab15ac47f222ab286c58490f1274a216259c40.jpeg"
          alt="位置图标"
          class="tpl-fe-tech-share__location-icon"
        />
        <div v-html="formatText(getConfigValue('location', 'value'))" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import type { TemplateProps, TemplateEmits } from "../types/template-props";
import { useTemplateArea } from "../composables/useTemplateArea";

const props = defineProps<TemplateProps>();
const emit = defineEmits<TemplateEmits>();

const { getConfigValue, isSelected, handleAreaClick } = useTemplateArea(
  props.template,
  toRef(props, "selectedArea"),
  emit
);

// 格式化文本，处理换行符
const formatText = (text: string) => {
  return text.replace(/\n/g, "<br>");
};
</script>

<style scoped lang="less">
.tpl-fe-tech-share {
  margin: 0;
  padding: 0;
  background-color: #f6f7f9;
  color: #333;
  width: 750px;
  box-sizing: border-box;
  padding-bottom: 60px;

  &__header {
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: 120px;
    padding-left: 32px;
  }

  &__logo {
    margin-right: 10px;
    height: 100%;
  }

  &__subtitle {
    font-size: 14px;
    color: #666;
  }

  &__content {
    margin: 0 90px;
    margin-top: 50px;

    h1 {
      font-size: 35px;
      color: #ff385c;
      text-align: center;
    }
  }

  &__image-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 380px;
    margin: 20px auto;
    border: 10px solid #fff;
    border-radius: 50%;
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__speaker {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    color: #ff385c;
    margin-bottom: 5px;
  }

  &__team {
    text-align: center;
    font-size: 26px;
    color: #666;
    margin-bottom: 50px;
  }

  &__description {
    font-size: 30px;
    line-height: 1.8;
    color: #454545;
    margin-bottom: 50px;
  }

  &__location {
    display: flex;
    font-size: 24px;
    color: #333;
    margin-top: 20px;
  }

  &__location-icon {
    height: 45px;
    margin-right: 10px;
  }
}
</style>
