<template>
  <div class="template-list">
    <div class="templates">
      <div
        v-for="template in templates"
        :key="template.id"
        class="template-item"
        @click="$emit('select', template)"
      >
        <img :src="template.thumbnail" :alt="template.name" />
        <span>{{ template.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Template } from "../types/template";

defineProps<{
  templates: Template[];
}>();

defineEmits<{
  (e: "select", template: Template): void;
}>();
</script>

<style scoped lang="less">
.template-list {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.templates {
  flex: 1;
  padding: var(--padding-base);
  display: flex;
  flex-direction: column;
  gap: var(--gap-base);
  overflow: auto;
  min-height: 0;
  transition: all 0.3s;
}

.template-item {
  cursor: pointer;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 8px;
  transition: all 0.3s;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 140px;
    object-fit: contain;
    border-radius: calc(var(--border-radius) / 2);
    margin-bottom: 8px;
  }

  span {
    display: block;
    text-align: center;
    color: var(--text-color-secondary);
    font-size: 14px;
  }
}
</style>
