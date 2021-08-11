import React from 'react';
import {PopperOptions, TriggerType} from './types';
import {usePopperTooltip} from './usePopperTooltip';
import {component} from '../../services/helpers/classHelpers';

export interface ITooltipProps {
    trigger?: TriggerType;
    placement?: PopperOptions['placement'];
    content: string | JSX.Element;
}

export const Tooltip: React.FC<ITooltipProps> = ({children, trigger, content, placement}) => {
    const tooltipClasses = component('tooltip')();
    const {getTooltipProps, setTooltipRef, setTriggerRef, visible} = usePopperTooltip({
        placement,
        trigger,
    });
    return (
        <div>
            <div ref={setTriggerRef} className={component('tooltip-wrapper')()}>
                {children}
            </div>
            {visible && (
                <div ref={setTooltipRef} {...getTooltipProps({className: tooltipClasses})}>
                    {content}
                </div>
            )}
        </div>
    );
};
