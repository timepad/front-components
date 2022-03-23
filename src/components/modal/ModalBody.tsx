import * as React from 'react';
import {Brick} from '../brick';
import {IBrickProps} from '../brick/Brick';

export interface IModalBodyProps {
    brickProps?: IBrickProps;
}

export const Body: React.FC<IModalBodyProps> = ({children, brickProps}) => {
    return (
        <div>
            <Brick size={0.5} {...brickProps} />
            {children}
        </div>
    );
};
