import { SchemaOption, SchemaValueType } from "./schema";

export interface TemplateArea {
  id: string;
  name: string;
  type: "text" | "image" | "color";
  config: Record<string, SchemaProperty>;
}

export interface SchemaProperty {
  type: SchemaValueType;
  title: string;
  default?: any;
  min?: number;
  max?: number;
  step?: number;
  options?: SchemaOption[];
  description?: string;
  slot?: Record<string, any>;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  width: number;
  height?: number;
  templateFile: string;
  areas: TemplateArea[];
  needScale: boolean;
}
