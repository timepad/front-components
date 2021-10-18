import React, {createContext, FC, HTMLAttributes, useMemo} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import {Control, ControlId} from './Control';
import {ControlList} from './ControlList';
import {action, observable} from 'mobx';

import './index.less';

class SegmentedControlStore {
    @observable activeControlId: string;

    constructor(activeControlId = '') {
        this.activeControlId = activeControlId;
    }

    @action.bound setActiveControlId(id: string) {
        this.activeControlId = id;
    }
}

interface ISegmentedControlStoreContext {
    segmentedControlStore: SegmentedControlStore;
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

export const SegmentedControl: FC<ISegmentedControlProps> & {
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

    const segmentedControlStore = useMemo(
        () => new SegmentedControlStore(initialControlId ?? activeControlId),
        [initialControlId, activeControlId],
    );

    const handleOnControlClick: ControlClickHandler = onControlClick
        ? (ControlId: string) => {
              onControlClick(ControlId, segmentedControlStore.setActiveControlId);
          }
        : (ControlId: string) => {
              segmentedControlStore.setActiveControlId(ControlId);
          };

    return (
        <div {...rest} className={divClasses}>
            <SegmentedControlContext.Provider
                value={{
                    segmentedControlStore,
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
