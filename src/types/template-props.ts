import type { Template, TemplateArea } from "./template";

export interface TemplateProps {
  template: Template;
  selectedArea: TemplateArea | null;
}

export interface TemplateEmits {
  (e: "select-area", area: TemplateArea | null): void;
} 