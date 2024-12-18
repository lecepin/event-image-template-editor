import type { Template } from "../types/template";

export const templates: Template[] = [
  {
    id: "1",
    name: "前端双周分享",
    thumbnail:
      "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494395614image.png",
    width: 750,
    templateFile: "fe-tech-share",
    areas: [
      {
        id: "title",
        name: "标题",
        type: "text",
        config: {
          value: {
            type: "string",
            title: "标题内容",
            default: "《最强生态表单解决方案》",
          },
          fontSize: {
            type: "number",
            title: "字体大小",
            default: 35,
            min: 24,
            max: 48,
            step: 1,
          },
          color: {
            type: "color",
            title: "字体颜色",
            default: "#ff385c",
          },
        },
      },
      {
        id: "speaker",
        name: "演讲嘉宾",
        type: "text",
        config: {
          value: {
            type: "string",
            title: "演讲嘉宾",
            default: "演讲嘉宾：九九",
          },
          fontSize: {
            type: "number",
            title: "字体大小",
            default: 35,
            min: 24,
            max: 48,
            step: 1,
          },
          color: {
            type: "color",
            title: "字体颜色",
            default: "#ff385c",
          },
          fontWeight: {
            type: "select",
            title: "字体粗细",
            default: "bold",
            options: [
              { label: "正常", value: "normal" },
              { label: "加粗", value: "bold" },
            ],
          },
        },
      },
      {
        id: "team",
        name: "团队",
        type: "text",
        config: {
          value: {
            type: "string",
            title: "团队名称",
            default: "社区前端研发二组",
          },
          fontSize: {
            type: "number",
            title: "字体大小",
            default: 26,
            min: 20,
            max: 36,
            step: 1,
          },
          color: {
            type: "color",
            title: "字体颜色",
            default: "#666666",
          },
        },
      },
      {
        id: "description",
        name: "描述",
        type: "text",
        config: {
          value: {
            type: "textarea",
            title: "描述内容",
            default:
              "前端开发，表单无处不在，却也常常令人头疼。校验、联动、布局、动态渲染、异步问题…．重重困扰，复杂表单更是难上加难。但今天，我们带来了表单解决方案！全新升级的 DelightFormily 1.0，特性满满。一站式文档，交互体验超棒。还有最强生态一— 表单设计器和代码片段演练场，让你的表单开发如鱼得水。\n快来探索，终结表单难题！",
          },
          fontSize: {
            type: "number",
            title: "字体大小",
            default: 30,
            min: 24,
            max: 36,
            step: 1,
          },
          color: {
            type: "color",
            title: "字体颜色",
            default: "#454545",
          },
          lineHeight: {
            type: "number",
            title: "行高",
            default: 1.8,
            min: 1,
            max: 3,
            step: 0.1,
          },
        },
      },
      {
        id: "location",
        name: "地点和时间",
        type: "text",
        config: {
          value: {
            type: "textarea",
            title: "地点和时间",
            default:
              "上海-复兴广场 C栋2F-C202电影院Cinema\n北京-中海国际大厦 A座8F-编辑室Editorial Ofhce\n2024.9.20 16:00~17:00",
          },
          fontSize: {
            type: "number",
            title: "字体大小",
            default: 24,
            min: 18,
            max: 32,
            step: 1,
          },
          color: {
            type: "color",
            title: "字体颜色",
            default: "#333333",
          },
        },
      },
      {
        id: "poster",
        name: "海报图片",
        type: "image",
        config: {
          value: {
            type: "image",
            title: "图片地址",
            default:
              "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494437582image.png",
          },
        },
      },
    ],
    needScale: true,
  },
  {
    id: "2",
    name: "Part 物料预览图",
    thumbnail:
      "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494482084image.png",
    width: 750,
    height: (750 * 9) / 16,
    templateFile: "part-preview",
    areas: [
      {
        id: "part",
        name: "物料",
        type: "text",
        config: {
          width: {
            type: "number",
            title: "图片大小",
            default: 70,
            min: 50,
            max: 90,
            step: 1,
            slot: {
              suffix: "%",
            },
          },
          picture: {
            type: "image",
            title: "图片地址",
            default:
              "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494514963image.png",
          },
          bg: {
            type: "select",
            title: "背景图",
            default:
              "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494547851image.png",
            options: [
              {
                label: "灰色石材",
                value:
                  "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494547851image.png",
              },
              {
                label: "蓝紫-纯色",
                value:
                  "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494580419image.png",
              },
              {
                label: "沙丘",
                value:
                  "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494608910image.png",
              },
              {
                label: "windows-光束线条-绿蓝",
                value:
                  "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494650018image.png",
              },
              {
                label: "windows-光束线条-黄蓝",
                value:
                  "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494679577image.png",
              },
              {
                label: "windows-深色-黑蓝",
                value:
                  "https://qa-cos-1251524319.cos.ap-shanghai.myqcloud.com/yunxiao/1734494704493image.png",
              },
            ],
          },
        },
      },
    ],
    needScale: false,
  },
];
