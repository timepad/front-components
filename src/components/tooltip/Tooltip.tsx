import React from 'react';
import {PopperOptions, TriggerType} from './types';
import {usePopperTooltip} from './usePopperTooltip';
import {component} from '../../services/helpers/classHelpers';

export interface ITooltipProps {
    trigger?: TriggerType;
    placement?: PopperOptions['placement'];
    content: string | JSX.Element;
    isOpen?: boolean;
}

export const Tooltip: React.FC<ITooltipProps> = ({children, trigger, content, isOpen, placement}) => {
    const tooltipClass = component('tooltip')();
    const {getTooltipProps, setTooltipRef, setTriggerRef, visible} = usePopperTooltip({
        placement,
        trigger,
        visible: isOpen,
    });
    return (
        <div>
            <div ref={setTriggerRef} className={component('tooltip-wrapper')()}>
                {children}
            </div>
            {visible && (
                <div ref={setTooltipRef} {...getTooltipProps({className: tooltipClass})}>
                    {content}
                </div>
            )}
        </div>
    );
};
