declare module '*.less';
declare module '*.css';

declare module '@uppy/core' {
    class Uppy {
        constructor(options?: unknown);
        use: (...args: unknown[]) => unknown;
        on: (...args: unknown[]) => unknown;
        upload: (...args: unknown[]) => unknown;
        setFileMeta: (...args: unknown[]) => unknown;
        getPlugin: (...args: unknown[]) => unknown;
        removePlugin: (...args: unknown[]) => unknown;
        destroy: (...args: unknown[]) => unknown;
        close: (...args: unknown[]) => unknown;
    }
    export default Uppy;
}

declare module '@uppy/dashboard' {
    const Dashboard: unknown;
    export default Dashboard;
}

declare module '@uppy/image-editor' {
    const ImageEditor: unknown;
    export default ImageEditor;
}

declare module '@uppy/xhr-upload' {
    const XHRUpload: unknown;
    export default XHRUpload;
}

declare module '@uppy/react/dashboard' {
    import type React from 'react';

    const Dashboard: React.ComponentType<any>;
    export default Dashboard;
}

declare module '@uppy/react/dashboard-modal' {
    import type React from 'react';

    const DashboardModal: React.ComponentType<any>;
    export default DashboardModal;
}
