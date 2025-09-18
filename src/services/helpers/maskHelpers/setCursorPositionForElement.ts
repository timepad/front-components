export function setCursorPositionForElement(element: HTMLInputElement, cursorPosition: number): void {
    // if (!element) return;
    //
    // const apply = () => {
    //     try {
    //         if (document.activeElement !== element) return;
    //         element.setSelectionRange(cursorPosition, cursorPosition, 'none');
    //     } catch (_) {
    //         // ignore selection errors for unsupported input types
    //     }
    // };
    //
    // // Apply immediately after render
    // apply();
    // // And once more on next frame to defeat late browser/React cursor resets
    // requestAnimationFrame(apply);
    element?.setSelectionRange(cursorPosition, cursorPosition, 'forward');
}
