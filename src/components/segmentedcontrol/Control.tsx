import * as React from 'react';
import {FC, HTMLAttributes, useContext, useEffect} from 'react';
import cx from 'classnames';
import {SegmentedcontrolContext} from './Segmentedcontrol';
import {component} from '../../services/helpers/classHelpers';
import {observer} from 'mobx-react';

export type ControlId = string;

interface IControlProps extends HTMLAttributes<HTMLLIElement> {
    controlId: ControlId;
}

export const Control: FC<IControlProps> = observer(({children, className, controlId, ...rest}) => {
    const {segmentedcontrolStore, handleOnControlClick} = useContext(SegmentedcontrolContext);
    const liClasses = cx(
        component('segmentedcontrol', 'li')({['is-active']: segmentedcontrolStore.activeControlId === controlId}),
        className,
    );
    const buttonClasses = component('segmentedcontrol', 'button')();

    // set default control id to this id, if empty
    useEffect(() => {
        if (!segmentedcontrolStore.activeControlId) {
            segmentedcontrolStore.setActiveControlId(controlId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <li {...rest} className={liClasses}>
            <button className={buttonClasses} onClick={() => handleOnControlClick(controlId)}>
                {children}
            </button>
        </li>
    );
});
