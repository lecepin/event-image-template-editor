<template>
  <div class="settings-panel">
    <h3>{{ area.name }}设置</h3>
    <el-form label-position="top">
      <!-- 配置编辑器 -->
      <template v-for="(schema, key) in area.config" :key="key">
        <el-form-item :label="schema.title">
          <template v-if="schema.type === 'select'">
            <el-select
              v-model="configValues[key]"
              :placeholder="schema.title"
              @change="handleConfigUpdate(key)"
            >
              <el-option
                v-for="option in schema.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </template>
          <template v-else-if="schema.type === 'image'">
            <div class="image-input-wrapper">
              <el-input
                v-model="configValues[key]"
                @change="handleConfigUpdate(key)"
                placeholder="请输入图片链接"
              />
              <el-button type="primary" link @click="handleOpenUploadUrl">
                <el-icon><Upload /></el-icon>
                上传图片
              </el-button>
            </div>
          </template>
          <component
            v-else
            :is="getSchemaEditor(schema.type)"
            v-model="configValues[key]"
            v-bind="getSchemaBindings(schema)"
            @change="handleConfigUpdate(key)"
          >
            <template
              v-for="(slotContent, slotName) in schema.slot"
              :key="slotName"
              v-slot:[slotName]
            >
              {{ slotContent }}
            </template>
          </component>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { TemplateArea } from "../types/template";
import { AreaSchemas } from "../types/schema";
import type { SchemaProperty } from "../types/schema";
import { Upload } from "@element-plus/icons-vue";

type EditorType =
  | "string"
  | "number"
  | "color"
  | "select"
  | "image"
  | "textarea";

const props = defineProps<{
  area: TemplateArea;
}>();

const emit = defineEmits<{
  (e: "update", area: TemplateArea): void;
}>();

const localArea = ref<TemplateArea>(JSON.parse(JSON.stringify(props.area)));

// 配置值的本地状态
const configValues = ref<Record<string, any>>({});

// 初始化配置值
const initConfigValues = () => {
  const values: Record<string, any> = {};
  Object.entries(localArea.value.config).forEach(([key, config]) => {
    values[key] = config.default;
  });
  configValues.value = values;
};

// 获取值的 schema
const valueSchema = computed(() => {
  const schema = AreaSchemas[props.area.type];
  return schema?.properties?.value;
});

// 根据类型获取编辑器组件
const getSchemaEditor = (type: EditorType): string => {
  switch (type) {
    case "string":
      return "el-input";
    case "textarea":
      return "el-input";
    case "number":
      return "el-input-number";
    case "color":
      return "el-color-picker";
    case "select":
      return "el-select";
    case "image":
      return "el-input";
    default:
      return "el-input";
  }
};

// 获取组件绑定属性
const getSchemaBindings = (schema: SchemaProperty) => {
  const bindings: Record<string, any> = {};

  if (schema.type === "number") {
    if (schema.min !== undefined) bindings.min = schema.min;
    if (schema.max !== undefined) bindings.max = schema.max;
    if (schema.step !== undefined) bindings.step = schema.step;
  }

  if (schema.type === "select" && schema.options) {
    bindings.options = schema.options;
  }

  if (schema.type === "textarea") {
    bindings.type = "textarea";
    bindings.rows = schema.rows || 3;
    bindings.resize = "none";
  }

  return bindings;
};

// 处理配置更新
const handleConfigUpdate = (key: string) => {
  if (!localArea.value.config[key]) return;

  localArea.value.config[key] = {
    ...localArea.value.config[key],
    default: configValues.value[key],
  };

  handleUpdate();
};

const handleOpenUploadUrl = () => {
  window.open("https://play.devops.xxx.com/link/l/263", "_blank");
};

watch(
  () => props.area,
  (newArea) => {
    localArea.value = JSON.parse(JSON.stringify(newArea));
    initConfigValues();
  },
  { deep: true, immediate: true }
);

const handleUpdate = () => {
  emit("update", JSON.parse(JSON.stringify(localArea.value)));
};
</script>

<style scoped lang="less">
.settings-panel {
  padding: var(--padding-base);

  h3 {
    margin: 0 0 var(--padding-base);
    font-size: 16px;
    color: var(--text-color);
  }

  :deep(.el-form-item) {
    margin-bottom: var(--padding-base);
  }

  :deep(.el-form-item__label) {
    padding-bottom: 8px;
  }

  :deep(.el-input),
  :deep(.el-select) {
    width: 100%;
  }

  :deep(.el-select-dropdown__item) {
    padding: 0 12px;
  }

  :deep(.el-color-picker) {
    width: 100%;

    .el-color-picker__trigger {
      width: 100%;
    }
  }

  :deep(.el-input__textarea) {
    font-family: inherit;
  }

  .image-input-wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;

    :deep(.el-input) {
      flex: 1;
    }
  }
}
</style>
