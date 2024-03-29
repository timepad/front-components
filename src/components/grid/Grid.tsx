import React, {FC} from 'react';
import {GridCol} from './GridCol';
import {getActualGridSize} from './getActualGridSize';
import {DesktopColumnSize} from './types';

interface IGridChildren {
    Col: typeof GridCol;
}

type GapSize = 8 | 16 | 24 | 32;

interface IGridProps extends React.HTMLAttributes<HTMLDivElement> {
    gap?: GapSize;
    rowGap?: GapSize | 0;
    size?: DesktopColumnSize;
}

export const Grid: FC<React.PropsWithChildren<IGridProps>> & IGridChildren = ({children, gap = 16, rowGap = 0, size, ...props}) => {
    const gridSize = getActualGridSize();

    const cssProperties = {
        display: 'grid',
        gridColumnGap: `${gap}px`,
        gridTemplateColumns: `repeat(${size || gridSize}, 1fr)`,
        gridRowGap: `${rowGap}px`,
    };

    return (
        <div {...props} style={cssProperties}>
            {children}
        </div>
    );
};

Grid.Col = GridCol;
