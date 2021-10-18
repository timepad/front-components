import React, {FC, HTMLAttributes, useContext, useEffect} from 'react';
import cx from 'classnames';
import {SegmentedControlContext} from './SegmentedControl';
import {component} from '../../services/helpers/classHelpers';
import {observer} from 'mobx-react';

export type ControlId = string;

interface IControlProps extends HTMLAttributes<HTMLLIElement> {
    controlId: ControlId;
}

export const Control: FC<IControlProps> = observer(({children, className, controlId, ...rest}) => {
    const {segmentedControlStore, onControlClick} = useContext(SegmentedControlContext);
    const liClasses = cx(
        component('segmentedcontrol', 'li')({['is-active']: segmentedControlStore.activeControlId === controlId}),
        className,
    );
    const buttonClasses = component('segmentedcontrol', 'button')();

    // set default control id to this id, if empty
    useEffect(() => {
        if (!segmentedControlStore.activeControlId) {
            segmentedControlStore.setActiveControlId(controlId);
        }
    }, [controlId, segmentedControlStore]);

    return (
        <li {...rest} className={liClasses}>
            <button className={buttonClasses} onClick={() => onControlClick(controlId)}>
                {children}
            </button>
        </li>
    );
});
