// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Runtime types are defined by the adjacent facade declaration.
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';

/** Runtime vanilla Uppy и его стили, изолированные от TypeScript resolver-а потребителя. */
export {Dashboard, Uppy};
