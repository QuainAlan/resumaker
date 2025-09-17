import type { LucideIcon } from 'lucide-react';

export interface CustomField {
  id: string;
  label: string;
  value: string;
  icon?: string;
  iconName: string;
}

export interface BasicInfo {
  avatar?: string;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  age?: string;
  location?: string;
  website?: string;
  customFields?: CustomField[];
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  secondarySubtitle?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

// 新增：列表项类型
export interface ListItem {
  id: string;
  content: string;
}

// 新增：纯文本内容类型
export interface TextContent {
  content: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  iconName: string;
  type: 'basic' | 'timeline' | 'list' | 'text' | 'custom';
  editorType?: 'timeline' | 'list' | 'text';
  visible: boolean;
  order: number;
  pageNumber?: number; // 新增：指定该模块在第几页显示 (1 或 2)
  data: BasicInfo | TimelineItem[] | ListItem[] | TextContent | Record<string, unknown>;
}

export interface Resume {
  id: string;
  title: string;
  sections: ResumeSection[];
  template: string;
  layout: 'side-by-side' | 'top-bottom';
  pageSettings?: {
    enableMultiPage: boolean; // 是否启用多页模式
    totalPages: number; // 总页数，目前支持1-2页
  };
}

export interface IconOption {
  name: string;
  icon: LucideIcon;
}
