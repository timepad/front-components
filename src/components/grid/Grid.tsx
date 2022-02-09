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
    size?: DesktopColumnSize;
}

export const Grid: FC<IGridProps> & IGridChildren = ({children, gap = 16, size, ...props}) => {
    const gridSize = getActualGridSize();

    const cssProperties = {
        display: 'grid',
        gridColumnGap: `${gap}px`,
        gridTemplateColumns: `repeat(${size || gridSize}, 1fr)`,
    };

    return (
        <div {...props} style={cssProperties}>
            {children}
        </div>
    );
};

Grid.Col = GridCol;
