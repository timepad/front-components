// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Runtime types are defined by the adjacent facade declaration.
import {flushSync} from 'react-dom';
import {createRoot} from 'react-dom/client';
import Dashboard from '@uppy/react/dashboard';
import DashboardModal from '@uppy/react/dashboard-modal';

/** React Uppy runtime, подключаемый только через entry point `uppyReact`. */
export {createRoot, Dashboard, DashboardModal, flushSync};
