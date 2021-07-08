import * as React from 'react';
import './index.less';
import {usePopperTooltip} from 'react-popper-tooltip';
import {component} from '../../services/helpers/classHelpers';

export interface ITooltipProps {
    trigger?: 'click' | 'right-click' | 'hover' | 'focus';
    placement?:
        | 'auto'
        | 'auto-start'
        | 'auto-end'
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'right'
        | 'right-start'
        | 'right-end'
        | 'left'
        | 'left-start'
        | 'left-end';
    content: string | JSX.Element;
}

export const Tooltip: React.FC<ITooltipProps> = ({children, placement = 'top', trigger = 'hover', content}) => {
    const {getTooltipProps, setTooltipRef, setTriggerRef, visible} = usePopperTooltip({placement, trigger});

    return (
        <div>
            <div ref={setTriggerRef}>{children}</div>
            {visible && (
                <div ref={setTooltipRef} {...getTooltipProps({className: component('tooltip')()})}>
                    {content}
                </div>
            )}
        </div>
    );
};
