import React, {FC} from 'react';
import {getActualGridSize} from './getActualGridSize';
import {DesktopColumnSize, MobileColumnSize, TabletColumnSize} from './types';

interface IGridColProps extends React.HTMLAttributes<HTMLDivElement> {
    desktop?: DesktopColumnSize;
    tablet?: TabletColumnSize;
    mobile?: MobileColumnSize;
    offset?: number;
}

const PossibleSizes: Record<'Desktop' | 'Tablet' | 'Mobile', number> = {
    Desktop: 12,
    Tablet: 6,
    Mobile: 2,
};

export const GridCol: FC<IGridColProps> = ({children, desktop = 12, tablet = 6, mobile = 2, offset = 0, ...props}) => {
    const gridSize = getActualGridSize();

    const getGridColumn = (value: number) => {
        return offset > 0 ? `${offset + 1} / ${offset + value + 1}` : `span ${value}`;
    };

    const gridColumnsByGridSize = {
        [PossibleSizes.Desktop]: getGridColumn(desktop),
        [PossibleSizes.Tablet]: getGridColumn(tablet),
        [PossibleSizes.Mobile]: getGridColumn(mobile),
    };

    const gridColumn = gridColumnsByGridSize[gridSize];

    return (
        <div {...props} style={{gridColumn}}>
            {children}
        </div>
    );
};
