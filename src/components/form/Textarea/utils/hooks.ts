import React, {useEffect, useLayoutEffect, useRef} from 'react';

type Writable<T> = {-readonly [P in keyof T]: T[P]};

// basically Exclude<React.ClassAttributes<T>["ref"], string>
type UserRef<T> = ((instance: T | null) => void) | React.RefObject<T> | null | undefined;

const updateRef = <T>(ref: NonNullable<UserRef<T>>, value: T | null) => {
    if (typeof ref === 'function') {
        ref(value);
        return;
    }

    (ref as Writable<typeof ref>).current = value;
};

export const useComposedRef = <T extends HTMLElement>(
    libRef: React.MutableRefObject<T | null>,
    userRef: UserRef<T>,
): ((instance: T | null) => void) => {
    const prevUserRef = React.useRef<UserRef<T>>();

    return React.useCallback(
        (instance: T | null) => {
            libRef.current = instance;

            if (prevUserRef.current) {
                updateRef(prevUserRef.current, null);
            }

            prevUserRef.current = userRef;

            if (!userRef) {
                return;
            }

            updateRef(userRef, instance);
        },
        [libRef, userRef],
    );
};

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;

const useLatest = <T>(value: T) => {
    const ref = useRef(value);

    useIsomorphicLayoutEffect(() => {
        ref.current = value;
    });

    return ref;
};

export const useWindowResizeListener = (listener: (event: UIEvent) => any): void => {
    const latestListener = useLatest(listener);

    React.useLayoutEffect(() => {
        const handler: typeof listener = (event) => {
            latestListener.current(event);
        };

        window.addEventListener('resize', handler);

        return () => {
            window.removeEventListener('resize', handler);
        };
    }, [latestListener]);
};
