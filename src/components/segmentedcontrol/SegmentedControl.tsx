import React, {createContext, FC, HTMLAttributes, useMemo, useState} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import {Control, ControlId} from './Control';
import {ControlList} from './ControlList';

import './index.less';

interface ISegmentedControlStoreContext {
    activeControlId: string;
    setActiveControlId: (id: string) => void;
    onControlClick: ControlClickHandler;
}

export const SegmentedControlContext = createContext<ISegmentedControlStoreContext>(
    {} as ISegmentedControlStoreContext,
);

type ControlClickHandler = (ControlId: string) => void;

export interface ISegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
    defaultControlId?: ControlId;
    activeControlId?: ControlId;
    fix?: boolean;
    onControlClick?: (ControlId: string, setActiveControlId: ControlClickHandler) => void;
}

export const SegmentedControl: FC<React.PropsWithChildren<ISegmentedControlProps>> & {
    Control: typeof Control;
    List: typeof ControlList;
} = ({
    children,
    defaultControlId,
    activeControlId,
    fix,
    onControlClick,
    className,
    ...rest
}: ISegmentedControlProps) => {
    const initialControlId = useMemo(() => defaultControlId, [defaultControlId]);
    const divClasses = cx(component('segmentedcontrol')({fix}), className);

    const [currentControlId, setCurrentControlId] = useState(initialControlId ?? activeControlId ?? '');
    const handleOnControlClick: ControlClickHandler = (ControlId) =>
        onControlClick ? onControlClick(ControlId, setCurrentControlId) : setCurrentControlId(ControlId);

    return (
        <div {...rest} className={divClasses}>
            <SegmentedControlContext.Provider
                value={{
                    activeControlId: currentControlId,
                    setActiveControlId: setCurrentControlId,
                    onControlClick: handleOnControlClick,
                }}
            >
                {children}
            </SegmentedControlContext.Provider>
        </div>
    );
};

SegmentedControl.Control = Control;
SegmentedControl.List = ControlList;
