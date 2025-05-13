export const colors = ['warning', 'info', 'success', 'error', 'secondary', 'default'] as const;
export type Color = (typeof colors)[number];
