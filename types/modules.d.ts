declare module '*.less';
declare module '*.css';

declare module '@uppy/core/lib/index.js' {
    import Uppy from '@uppy/core';
    export default Uppy;
}

declare module '@uppy/react/lib/index.js' {
    export {DashboardModal} from '@uppy/react';
}

declare module '@uppy/react/lib/DashboardModal.js' {
    import {DashboardModal} from '@uppy/react';
    export default DashboardModal;
}

declare module '@uppy/image-editor/lib/index.js' {
    import ImageEditor from '@uppy/image-editor';
    export default ImageEditor;
}
