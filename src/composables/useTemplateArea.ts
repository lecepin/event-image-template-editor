import { Ref } from "vue";
import type { Template, TemplateArea } from "../types/template";
import type { TemplateEmits } from "../types/template-props";

export function useTemplateArea(
  template: Template,
  selectedArea: Ref<TemplateArea | null>,
  emit: TemplateEmits
) {
  // 获取配置值
  const getConfigValue = (areaId: string, key: string) => {
    const area = template.areas.find((area) => area.id === areaId);
    return area?.config[key]?.default ?? "";
  };

  // 检查是否选中
  const isSelected = (areaId: string) => {
    return selectedArea.value?.id === areaId;
  };

  // 处理区域点击
  const handleAreaClick = (areaId: string) => {
    // 如果点击的是当前选中的区域，则取消选择
    if (selectedArea.value?.id === areaId) {
      emit("select-area", null);
      return;
    }

    // 否则选中点击的区域
    const area = template.areas.find((area) => area.id === areaId);
    if (area) {
      emit("select-area", area);
    }
  };

  return {
    getConfigValue,
    isSelected,
    handleAreaClick,
  };
}
