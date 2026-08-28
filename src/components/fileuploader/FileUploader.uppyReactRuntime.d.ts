import type React from 'react';
import type {IReactRootLike} from './FileUploader.uppyDriver';

export const createRoot: (container: HTMLElement) => IReactRootLike;
export const flushSync: (callback: () => void) => void;
export const Dashboard: React.ComponentType<Record<string, unknown>>;
export const DashboardModal: React.ComponentType<Record<string, unknown>>;
