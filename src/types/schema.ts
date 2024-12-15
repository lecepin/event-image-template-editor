// 基础属性类型
export type SchemaValueType = 
  | 'string' 
  | 'textarea' 
  | 'number' 
  | 'boolean' 
  | 'color' 
  | 'select' 
  | 'image';

// 选项类型
export interface SchemaOption {
  label: string;
  value: string | number;
}

// Schema 属性定义
export interface SchemaProperty {
  rows: number;
  type: SchemaValueType;
  title: string;
  default?: any;
  min?: number;
  max?: number;
  step?: number;
  options?: SchemaOption[];
  description?: string;
  required?: boolean;
}

// Schema 定义
export interface Schema {
  type: 'object';
  properties: Record<string, SchemaProperty>;
}

// 区域类型对应的 Schema
export const AreaSchemas: Record<string, Schema> = {
  text: {
    type: 'object',
    properties: {
      value: {
        type: 'string',
        title: '文本内容',
        required: true,
        rows: 0
      },
      fontSize: {
        type: 'number',
        title: '字体大小',
        default: 14,
        min: 12,
        max: 72,
        step: 1,
        rows: 0
      },
      color: {
        type: 'color',
        title: '字体颜色',
        default: '#333333',
        rows: 0
      },
      fontWeight: {
        type: 'select',
        title: '字体粗细',
        default: 'normal',
        options: [
          { label: '正常', value: 'normal' },
          { label: '加粗', value: 'bold' }
        ],
        rows: 0
      },
      textAlign: {
        type: 'select',
        title: '对齐方式',
        default: 'left',
        options: [
          { label: '左对齐', value: 'left' },
          { label: '居中', value: 'center' },
          { label: '右对齐', value: 'right' }
        ],
        rows: 0
      }
    }
  },
  image: {
    type: 'object',
    properties: {
      value: {
        type: 'image',
        title: '图片地址',
        required: true,
        rows: 0
      },
      fit: {
        type: 'select',
        title: '填充方式',
        default: 'cover',
        options: [
          { label: '覆盖', value: 'cover' },
          { label: '包含', value: 'contain' },
          { label: '拉伸', value: 'fill' }
        ],
        rows: 0
      }
    }
  },
  color: {
    type: 'object',
    properties: {
      value: {
        type: 'color',
        title: '颜色值',
        default: '#ffffff',
        rows: 0
      }
    }
  }
}; 