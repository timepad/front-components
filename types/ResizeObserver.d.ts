declare const ResizeObserver: {
    prototype: ResizeObserver;
    new (callback: ResizeObserverCallback): ResizeObserver;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ResizeObserver {
    disconnect(): void;
    observe(target: Element, options?: ResizeObserverOptions): void;
    unobserve(target: Element): void;
}
