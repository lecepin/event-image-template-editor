<template>
  <div 
    class="text-area"
    :style="textStyle"
  >
    {{ area.value }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TemplateArea } from '../../types/template'

const props = defineProps<{
  area: TemplateArea
}>()

const textStyle = computed(() => ({
  fontSize: `${props.area.config.fontSize}px`,
  color: props.area.config.color,
  fontWeight: props.area.config.fontWeight
}))
</script> 