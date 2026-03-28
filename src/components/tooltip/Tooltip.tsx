import React from 'react';
import {PopperOptions, TriggerType} from './types';
import {usePopperTooltip} from './usePopperTooltip';
import {component} from '../../services/helpers/classHelpers';
import {IAdditionalAttributes} from '../../../types';
import {qaTags} from '../../services';

export interface ITooltipProps extends IAdditionalAttributes {
    trigger?: TriggerType;
    placement?: PopperOptions['placement'];
    content: string | JSX.Element;
    isOpen?: boolean;
}

export const Tooltip: React.FC<React.PropsWithChildren<ITooltipProps>> = ({
    children,
    trigger,
    content,
    isOpen,
    placement,
    ...props
}) => {
    const tooltipClass = component('tooltip')();
    const {getTooltipProps, setTooltipRef, setTriggerRef, visible} = usePopperTooltip({
        placement,
        trigger,
        visible: isOpen,
    });
    return (
        <div data-qa={props['data-qa'] || qaTags.tooltip}>
            <div ref={setTriggerRef} className={component('tooltip-wrapper')()}>
                {children}
            </div>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({className: tooltipClass})}
                    data-qa={qaTags.blockDescription}
                >
                    {content}
                </div>
            )}
        </div>
    );
};
