export const ModifierKey = {
  ctrl: "ctrl",
  shift: "shift",
  alt: "alt",
  none: "none",
} as const;
export type ModifierKeys = (typeof ModifierKey)[keyof typeof ModifierKey];
export const getPressedModifierKey = (
  e: React.MouseEvent<HTMLElement, MouseEvent>
): ModifierKeys => {
  if (e.ctrlKey || e.metaKey) {
    return ModifierKey.ctrl;
  }
  if (e.shiftKey) {
    return ModifierKey.shift;
  }
  if (e.altKey) {
    return ModifierKey.alt;
  }
  return ModifierKey.none;
};

