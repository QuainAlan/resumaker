import type { KeyboardEvent } from 'react';

/** 在代码类 textarea 中按 Tab 插入缩进，避免焦点跳出。Shift+Tab 不拦截，便于焦点导航。 */
export function handleTextareaInsertTab(
  e: KeyboardEvent<HTMLTextAreaElement>,
  value: string,
  setValue: (next: string) => void,
  indent = '\t',
): void {
  if (e.key !== 'Tab' || e.shiftKey) return;
  e.preventDefault();
  const el = e.currentTarget;
  const start = el.selectionStart;
  const end = el.selectionEnd;

  if (start !== end) {
    const before = value.slice(0, start);
    const selected = value.slice(start, end);
    const after = value.slice(end);
    const lines = selected.split('\n');
    const indented = lines.map((line) => `${indent}${line}`).join('\n');
    const next = before + indented + after;
    setValue(next);
    const newEnd = start + indented.length;
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start, newEnd);
    }, 0);
    return;
  }

  const next = `${value.slice(0, start)}${indent}${value.slice(end)}`;
  setValue(next);
  const pos = start + indent.length;
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(pos, pos);
  }, 0);
}
