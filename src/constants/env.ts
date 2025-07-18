export const STAGES = {
  Local: 'local',
  Dev: 'dev',
  Prod: 'prod',
} as const;

export type StageKey = keyof typeof STAGES;
export type Stage = (typeof STAGES)[StageKey];
