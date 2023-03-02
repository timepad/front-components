import * as React from 'react';
import {Fragment} from 'react';
import {component} from '../../services/helpers/classHelpers';
import {Brick, IBrickProps} from '../brick/Brick';

export interface IModalFooterProps {
    brickProps?: IBrickProps;
}

export const Footer: React.FC<React.PropsWithChildren<IModalFooterProps>> = ({children, brickProps}) => {
    return (
        <Fragment>
            <Brick size={2} {...brickProps} />
            <div className={component('form', 'footer')()}>{children}</div>
        </Fragment>
    );
};
