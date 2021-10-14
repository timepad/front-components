import * as React from 'react';
import {createContext, FC, HTMLAttributes, useMemo} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import {Control, ControlId} from './Control';
import {ControlList} from './ControlList';
import {action, observable} from 'mobx';

import './index.less';

class SegmentedcontrolStore {
    constructor(activeControlId = '') {
        this.activeControlId = activeControlId;
    }

    @observable activeControlId: string;
    @action.bound setActiveControlId(id: string) {
        this.activeControlId = id;
    }
}

interface ISegmentedcontrolStoreContext {
    segmentedcontrolStore: SegmentedcontrolStore;
    handleOnControlClick: ControlClickHandler;
}

export const SegmentedcontrolContext = createContext<ISegmentedcontrolStoreContext>(
    {} as ISegmentedcontrolStoreContext,
);

type ControlClickHandler = (ControlId: string) => void;

export interface ISegmentedcontrolProps extends HTMLAttributes<HTMLDivElement> {
    defaultControlId?: ControlId;
    activeControlId?: ControlId;
    light?: boolean;
    dark?: boolean;
    fix?: boolean;
    onControlClick?: (ControlId: string, setActiveControlId: (id: string) => void) => void;
}

const SegmentedcontrolBase: FC<ISegmentedcontrolProps> = ({
    children,
    defaultControlId,
    activeControlId,
    light,
    dark,
    fix,
    onControlClick,
    className,
    ...rest
}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialControlId = useMemo(() => defaultControlId, []);
    const divClasses = cx(component('segmentedcontrol')({light, dark, fix}), className);
    const segmentedcontrolStore = useMemo(
        () => new SegmentedcontrolStore(initialControlId !== undefined ? initialControlId : activeControlId),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [activeControlId],
    );
    const handleOnControlClick: ControlClickHandler = onControlClick
        ? (ControlId: string) => {
              onControlClick(ControlId, segmentedcontrolStore.setActiveControlId);
          }
        : (ControlId: string) => {
              segmentedcontrolStore.setActiveControlId(ControlId);
          };

    return (
        <div {...rest} className={divClasses}>
            <SegmentedcontrolContext.Provider
                value={{
                    segmentedcontrolStore: segmentedcontrolStore,
                    handleOnControlClick: handleOnControlClick,
                }}
            >
                {children}
            </SegmentedcontrolContext.Provider>
        </div>
    );
};

const segmentedcontrolChildren = {
    Control,
    List: ControlList,
};

export const Segmentedcontrol = Object.assign(SegmentedcontrolBase, segmentedcontrolChildren);
