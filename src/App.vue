<template>
  <SplashScreen />
  <div class="app">
    <header class="app-header">
      <h2>活动图片编辑器</h2>
      <el-button
        v-if="currentTemplate"
        class="export-btn"
        type="primary"
        :loading="exporting"
        @click="handleExportClick"
      >
        {{ exporting ? "导出中..." : "导出图片" }}
      </el-button>
    </header>
    <div
      class="editor"
      :class="{ 'template-list-collapsed': isTemplateListCollapsed }"
    >
      <div class="template-list">
        <div class="template-list-header">
          <span>模板列表</span>
          <el-button
            type="text"
            :icon="isTemplateListCollapsed ? Expand : Fold"
            @click="toggleTemplateList"
          />
        </div>
        <TemplateList
          v-if="!isTemplateListCollapsed"
          :templates="templates"
          @select="handleTemplateSelect"
        />
      </div>
      <div class="canvas-container">
        <div class="canvas-wrapper">
          <template v-if="currentTemplate">
            <EditorCanvas
              ref="canvasRef"
              :template="currentTemplate"
              :selectedArea="selectedArea"
              @select-area="handleAreaSelect"
            />
          </template>
          <div v-else class="empty-placeholder">
            <el-empty description="请先选择模板">
              <template #image>
                <el-icon :size="60" class="empty-icon">
                  <Picture />
                </el-icon>
              </template>
            </el-empty>
          </div>
        </div>
      </div>
      <div class="settings-panel">
        <template v-if="currentTemplate">
          <template v-if="selectedArea">
            <SettingsPanel
              :area="selectedArea"
              @update="handleSettingsUpdate"
            />
          </template>
          <div v-else class="empty-placeholder">
            <el-empty description="请选择要编辑的区域">
              <template #image>
                <el-icon :size="60" class="empty-icon">
                  <Edit />
                </el-icon>
              </template>
            </el-empty>
          </div>
        </template>
        <div v-else class="empty-placeholder">
          <el-empty description="请先选择模板">
            <template #image>
              <el-icon :size="60" class="empty-icon">
                <Select />
              </el-icon>
            </template>
          </el-empty>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="exportDialogVisible"
      title="导出设置"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="export-dialog"
    >
      <el-form :model="exportConfig" label-width="80px">
        <el-form-item label="倍数">
          <el-select v-model="exportConfig.scale" class="scale-select">
            <el-option label="1x" :value="1" />
            <el-option label="2x" :value="2" />
            <el-option label="3x" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="格式">
          <el-radio-group v-model="exportConfig.format">
            <el-radio label="jpg">JPG</el-radio>
            <el-radio label="png">PNG</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="exportConfig.format === 'jpg'" label="质量">
          <el-slider
            v-model="exportConfig.quality"
            :min="60"
            :max="100"
            :step="5"
            show-stops
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="exportDialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="exporting" @click="handleExport">
            {{ exporting ? "导出中..." : "导出" }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import "./App.less";
import { ref } from "vue";
import { templates } from "./mock/templates";
import type { Template, TemplateArea } from "./types/template";
import domtoimage from "dom-to-image-more";
import TemplateList from "./components/TemplateList.vue";
import EditorCanvas from "./components/EditorCanvas.vue";
import SettingsPanel from "./components/SettingsPanel.vue";
import { ElMessage, ElLoading, ElMessageBox } from "element-plus";
import { Picture, Edit, Select, Expand, Fold } from "@element-plus/icons-vue";
import SplashScreen from './components/SplashScreen.vue'

const currentTemplate = ref<Template | null>(null);
const selectedArea = ref<TemplateArea | null>(null);
const canvasRef = ref();
const exporting = ref(false);
const isTemplateListCollapsed = ref(false);
const exportDialogVisible = ref(false);
const exportConfig = ref({
  scale: 2,
  format: "jpg",
  quality: 85,
});

const handleTemplateSelect = async (template: Template) => {
  if (currentTemplate.value) {
    try {
      await ElMessageBox.confirm(
        currentTemplate.value.id === template.id
          ? "重新应用模板将重置所有编辑内容，是否继续？"
          : "切换模板将丢失当前的编辑内容，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      );
    } catch (e) {
      return;
    }
  }

  currentTemplate.value = JSON.parse(JSON.stringify(template));
  selectedArea.value = null;
};

const handleAreaSelect = (area: TemplateArea) => {
  selectedArea.value = area;
};

const handleSettingsUpdate = (updatedArea: TemplateArea) => {
  if (!currentTemplate.value) return;

  const areaIndex = currentTemplate.value.areas.findIndex(
    (a) => a.id === updatedArea.id
  );
  if (areaIndex > -1) {
    currentTemplate.value.areas[areaIndex] = updatedArea;
  }
};

const handleExportClick = () => {
  exportDialogVisible.value = true;
};

const handleExport = async () => {
  if (!canvasRef.value) return;

  const loading = ElLoading.service({
    lock: true,
    text: "正在导出图片...",
    background: "rgba(0, 0, 0, 0.7)",
  });

  exporting.value = true;

  const editableAreas = canvasRef.value.$el.querySelectorAll(".editable-area");
  editableAreas.forEach((area: HTMLElement) => {
    area.classList.add("exporting");
  });

  const needScale = currentTemplate.value?.needScale ?? true;

  try {
    // 获取导出配置
    const scale = exportConfig.value.scale;
    const format = exportConfig.value.format;
    const quality = exportConfig.value.quality / 100;

    // 获取目标元素
    const element = canvasRef.value.$el;
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    // 创建临时容器
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
    // 设置容器尺寸为缩放后的尺寸
    container.style.width = `${width * scale}px`;
    container.style.height = `${height * scale}px`;
    document.body.appendChild(container);

    // 克隆元素到临时容器
    const clone = element.cloneNode(true);
    // 设置克隆元素尺寸为缩放后的尺寸
    clone.style.transform = `scale(${scale})`;
    clone.style.transformOrigin = "top left";
    container.appendChild(clone);

    // 等待一下确保样式应用完成
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 配置导出选项
    const options = {
      quality: format === "jpg" ? quality : 1,
      bgcolor: "transparent",
      width: width * scale,
      height: height * scale,
      cacheBust: true, // 避免缓存
      imagePlaceholder:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", // 图片占位符
    };

    try {
      // 根据格式选择导出方法
      let dataUrl;
      if (format === "jpg") {
        dataUrl = await domtoimage.toJpeg(clone, options);
      } else {
        dataUrl = await domtoimage.toPng(clone, options);
      }

      // 下载图片
      const link = document.createElement("a");
      link.download = `${currentTemplate.value?.name || "export"}.${format}`;
      link.href = dataUrl;
      link.click();

      exportDialogVisible.value = false;
      ElMessage.success("导出成功");
    } finally {
      // 清理临时元素
      document.body.removeChild(container);
    }
  } catch (error) {
    console.error("导出图片失败:", error);
    ElMessage.error("导出失败，请重试");
  } finally {
    editableAreas.forEach((area: HTMLElement) => {
      area.classList.remove("exporting");
    });
    loading.close();
    exporting.value = false;
  }
};

const toggleTemplateList = () => {
  isTemplateListCollapsed.value = !isTemplateListCollapsed.value;
};
</script>

<style scoped lang="less">
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &-header {
    height: var(--header-height);
    background: #fff;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    padding: 0 var(--padding-base);
    justify-content: space-between;
    flex-shrink: 0;

    h2 {
      margin: 0;
      font-size: 18px;
      color: var(--text-color);
    }
  }
}

.editor {
  flex: 1;
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr var(--settings-width);
  min-height: 0;
  background-color: var(--bg-color);
  transition: all 0.3s;

  &.template-list-collapsed {
    grid-template-columns: 48px 1fr var(--settings-width);

    .template-list {
      .template-list-header {
        padding: 0 12px;
        justify-content: center;

        span {
          display: none;
        }
      }
    }
  }
}

.template-list {
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;

  &-header {
    height: 48px;
    padding: 0 var(--padding-base);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    span {
      font-size: 14px;
      color: var(--text-color);
      font-weight: 500;
    }

    .el-button {
      padding: 0;
      font-size: 16px;
    }
  }
}

.canvas-container {
  padding: var(--padding-base);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.canvas-wrapper {
  flex: 1;
  overflow: auto;
  display: flex;
  justify-content: center;
  min-height: 0;
}

.settings-panel {
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:deep(.el-loading-mask) {
  .el-loading-spinner {
    .el-loading-text {
      color: #fff;
      font-size: 16px;
      margin-top: 10px;
    }
  }
}

.empty-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-radius: var(--border-radius);
  padding: var(--padding-base);

  :deep(.el-empty) {
    padding: 40px;

    .empty-icon {
      color: var(--el-text-color-secondary);
    }

    .el-empty__description {
      margin-top: 20px;
      color: var(--el-text-color-secondary);
    }
  }
}

.canvas-wrapper {
  .empty-placeholder {
    height: 100%;
  }
}

.settings-panel {
  .empty-placeholder {
    height: 100%;
  }
}

.export-dialog {
  :deep(.el-dialog__body) {
    padding: 20px 30px;
  }

  .scale-select {
    width: 120px;
  }

  .el-slider {
    margin-top: 8px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
