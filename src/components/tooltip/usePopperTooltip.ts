import {useCallback, useEffect, useMemo, useState} from 'react';
import {usePopper} from 'react-popper';
import {generateBoundingClientRect, useControlledState, useGetLatest} from './utils';
import {Config, PopperOptions, PropsGetterArgs, TriggerType} from './types';

const virtualElement = {
    getBoundingClientRect: generateBoundingClientRect(),
};

const defaultConfig: Config = {
    closeOnOutsideClick: true,
    closeOnTriggerHidden: false,
    defaultVisible: false,
    followCursor: false,
    interactive: false,
    mutationObserverOptions: {
        attributes: true,
        childList: true,
        subtree: true,
    },
    offset: [0, 12],
    trigger: 'hover',
    placement: 'top',
};

export const usePopperTooltip = (config: Config = {}, popperOptions: PopperOptions = {}) => {
    const finalConfig = (Object.keys(defaultConfig) as Array<keyof typeof defaultConfig>).reduce(
        (config, key) => ({
            ...config,
            [key]: config[key] !== undefined ? config[key] : defaultConfig[key],
        }),
        config,
    );

    const defaultModifiers = useMemo(
        () => [{name: 'offset', options: {offset: finalConfig.offset}}],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Array.isArray(finalConfig.offset) ? finalConfig.offset : [],
    );

    const finalPopperOptions = {
        ...popperOptions,
        placement: popperOptions.placement || finalConfig.placement,
        modifiers: popperOptions.modifiers || defaultModifiers,
    };

    const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
    const [tooltipRef, setTooltipRef] = useState<HTMLElement | null>(null);
    const [visible, setVisible] = useControlledState({
        initial: finalConfig.defaultVisible,
        value: finalConfig.visible,
        onChange: finalConfig.onVisibleChange,
    });

    const {styles, attributes, ...popperProps} = usePopper(triggerRef, tooltipRef, finalPopperOptions);

    const update = popperProps.update;

    const getLatest = useGetLatest({
        visible,
        triggerRef,
        tooltipRef,
        finalConfig,
    });

    const isTriggeredBy = useCallback(
        (trigger: TriggerType) => {
            return Array.isArray(finalConfig.trigger)
                ? finalConfig.trigger.includes(trigger)
                : finalConfig.trigger === trigger;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Array.isArray(finalConfig.trigger) ? finalConfig.trigger : [finalConfig.trigger],
    );

    const hideTooltip = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const showTooltip = useCallback(() => {
        setVisible(true);
    }, [setVisible]);

    const toggleTooltip = useCallback(() => {
        if (getLatest().visible) {
            hideTooltip();
        } else {
            showTooltip();
        }
    }, [getLatest, hideTooltip, showTooltip]);

    useEffect(() => {
        if (!getLatest().finalConfig.closeOnOutsideClick) {
            return;
        }

        const handleClickOutside: EventListener = (event) => {
            const {tooltipRef, triggerRef} = getLatest();
            const target = event.composedPath?.()?.[0] || event.target;
            if (target instanceof Node) {
                if (
                    tooltipRef != null &&
                    triggerRef != null &&
                    !tooltipRef.contains(target) &&
                    !triggerRef.contains(target)
                ) {
                    hideTooltip();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [getLatest, hideTooltip]);

    // Trigger: click
    useEffect(() => {
        if (triggerRef == null || !isTriggeredBy('click')) {
            return;
        }

        triggerRef.addEventListener('click', toggleTooltip);

        return () => triggerRef.removeEventListener('click', toggleTooltip);
    }, [triggerRef, isTriggeredBy, toggleTooltip]);

    // Trigger: focus
    useEffect(() => {
        if (triggerRef == null || !isTriggeredBy('focus')) {
            return;
        }

        triggerRef.addEventListener('focus', showTooltip);
        triggerRef.addEventListener('blur', hideTooltip);
        return () => {
            triggerRef.removeEventListener('focus', showTooltip);
            triggerRef.removeEventListener('blur', hideTooltip);
        };
    }, [triggerRef, isTriggeredBy, showTooltip, hideTooltip]);

    // Trigger: hover on trigger
    useEffect(() => {
        if (triggerRef == null || !isTriggeredBy('hover')) {
            return;
        }

        triggerRef.addEventListener('mouseenter', showTooltip);
        triggerRef.addEventListener('mouseleave', hideTooltip);
        return () => {
            triggerRef.removeEventListener('mouseenter', showTooltip);
            triggerRef.removeEventListener('mouseleave', hideTooltip);
        };
    }, [triggerRef, isTriggeredBy, showTooltip, hideTooltip]);

    // Trigger: hover on tooltip, keep it open if hovered
    useEffect(() => {
        if (tooltipRef == null || !getLatest().finalConfig.interactive) {
            return;
        }

        tooltipRef.addEventListener('mouseenter', showTooltip);
        tooltipRef.addEventListener('mouseleave', hideTooltip);
        return () => {
            tooltipRef.removeEventListener('mouseenter', showTooltip);
            tooltipRef.removeEventListener('mouseleave', hideTooltip);
        };
    }, [tooltipRef, showTooltip, hideTooltip, getLatest]);

    // Handle closing tooltip if trigger hidden
    const isReferenceHidden = popperProps?.state?.modifiersData?.hide?.isReferenceHidden;
    useEffect(() => {
        if (finalConfig.closeOnTriggerHidden && isReferenceHidden) {
            hideTooltip();
        }
    }, [finalConfig.closeOnTriggerHidden, hideTooltip, isReferenceHidden]);

    // Handle follow cursor
    useEffect(() => {
        if (!finalConfig.followCursor || triggerRef == null) {
            return;
        }

        function setMousePosition({clientX, clientY}: {clientX: number; clientY: number}) {
            virtualElement.getBoundingClientRect = generateBoundingClientRect(clientX, clientY);
            update?.();
        }

        triggerRef.addEventListener('mousemove', setMousePosition);
        return () => triggerRef.removeEventListener('mousemove', setMousePosition);
    }, [finalConfig.followCursor, triggerRef, update]);

    useEffect(() => {
        if (tooltipRef == null || update == null || finalConfig.mutationObserverOptions == null) {
            return;
        }

        const observer = new MutationObserver(update);
        observer.observe(tooltipRef, finalConfig.mutationObserverOptions);
        return () => observer.disconnect();
    }, [finalConfig.mutationObserverOptions, tooltipRef, update]);

    // Tooltip props getter
    const getTooltipProps = (args: PropsGetterArgs = {}) => {
        return {
            ...args,
            style: {
                ...args.style,
                ...styles.popper,
            },
            ...attributes.popper,
        };
    };

    return {
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        tooltipRef,
        triggerRef,
        visible,
        ...popperProps,
    };
};
