/**
 * 简化的 Resume 操作 Hook
 * 让组件可以直接操作状态，而不需要层层传递回调函数
 */
import {
  addSectionAtom,
  deleteSectionAtom,
  getBasicSectionAtom,
  getNonBasicSectionsAtom,
  getSectionAtom,
  getSectionsByPageAtom,
  resetResumeAtom,
  updateMultipleSectionsPageAtom,
  updatePageSettingsAtom,
  updateSectionDataAtom,
  updateSectionPropsAtom,
  updateSectionsOrderAtom,
} from '@/store/resumeStore';
import type { BasicInfo, ListItem, TextContent, TimelineItem } from '@/types/resume';
import { useAtomValue, useSetAtom } from 'jotai';

/**
 * Resume 操作相关的 hook
 */
export const useResumeActions = () => {
  // 设置函数
  const updateSectionData = useSetAtom(updateSectionDataAtom);
  const updateSectionProps = useSetAtom(updateSectionPropsAtom);
  const updateSectionsOrder = useSetAtom(updateSectionsOrderAtom);
  const addSection = useSetAtom(addSectionAtom);
  const deleteSection = useSetAtom(deleteSectionAtom);
  const updatePageSettings = useSetAtom(updatePageSettingsAtom);
  const updateMultipleSectionsPage = useSetAtom(updateMultipleSectionsPageAtom);
  const resetResume = useSetAtom(resetResumeAtom);

  // 获取函数
  const getSection = useAtomValue(getSectionAtom);
  const getNonBasicSections = useAtomValue(getNonBasicSectionsAtom);
  const getBasicSection = useAtomValue(getBasicSectionAtom);
  const getSectionsByPage = useAtomValue(getSectionsByPageAtom);

  /**
   * 更新模块数据（这是最常用的操作）
   */
  const updateSection = (
    sectionId: string,
    data: BasicInfo | TimelineItem[] | ListItem[] | TextContent,
    iconName?: string
  ) => {
    updateSectionData({ sectionId, data, iconName });
  };

  /**
   * 更新模块图标
   */
  const updateSectionIcon = (sectionId: string, iconName: string) => {
    updateSectionProps({
      sectionId,
      props: { iconName },
    });
  };

  /**
   * 更新模块标题
   */
  const updateSectionTitle = (sectionId: string, title: string) => {
    updateSectionProps({
      sectionId,
      props: { title },
    });
  };

  /**
   * 切换模块可见性
   */
  const toggleSectionVisibility = (sectionId: string) => {
    const section = getSection(sectionId);
    if (section) {
      updateSectionProps({
        sectionId,
        props: { visible: !section.visible },
      });
    }
  };

  /**
   * 更新模块编辑器类型
   */
  const updateSectionEditorType = (sectionId: string, editorType: 'timeline' | 'list' | 'text') => {
    updateSectionProps({
      sectionId,
      props: { editorType },
    });
  };

  /**
   * 启用或禁用多页模式
   */
  const toggleMultiPageMode = (enabled: boolean, totalPages: number = 2) => {
    updatePageSettings({ enableMultiPage: enabled, totalPages });
  };

  /**
   * 批量设置多个模块的页面分配
   */
  const batchSetSectionsPage = (updates: Array<{ sectionId: string; pageNumber: number }>) => {
    updateMultipleSectionsPage(updates);
  };

  /**
   * 重置简历到初始状态
   */
  const clearResume = () => {
    resetResume();
  };

  return {
    // 核心操作
    updateSection,
    updateSectionIcon,
    updateSectionTitle,
    updateSectionEditorType,
    toggleSectionVisibility,

    // 页面相关操作
    toggleMultiPageMode,
    batchSetSectionsPage,

    // 批量操作
    updateSectionsOrder,
    addSection,
    deleteSection,

    // 查询操作
    getSection,
    getNonBasicSections,
    getBasicSection,
    getSectionsByPage,

    // 清空操作
    clearResume,
  };
};
