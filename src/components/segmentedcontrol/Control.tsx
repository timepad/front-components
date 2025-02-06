import React, {FC, HTMLAttributes, useContext, useEffect} from 'react';
import cx from 'classnames';
import {SegmentedControlContext} from './SegmentedControl';
import {component} from '../../services/helpers/classHelpers';

export type ControlId = string;

interface IControlProps extends HTMLAttributes<HTMLLIElement> {
    controlId: ControlId;
}

export const Control: FC<React.PropsWithChildren<IControlProps>> = ({children, className, controlId, ...rest}) => {
    const {activeControlId, onControlClick, setActiveControlId} = useContext(SegmentedControlContext);
    const liClasses = cx(
        component('segmentedcontrol', 'li')({['is-active']: activeControlId === controlId}),
        className,
    );
    const buttonClasses = component('segmentedcontrol', 'button')();

    // set default control id to this id, if empty
    useEffect(() => {
        if (!activeControlId) {
            setActiveControlId(controlId);
        }
    }, [controlId, activeControlId]);

    return (
        <li {...rest} className={liClasses}>
            <button className={buttonClasses} onClick={() => onControlClick(controlId)}>
                {children}
            </button>
        </li>
    );
};
