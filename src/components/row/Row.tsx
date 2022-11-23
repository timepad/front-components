import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import RowText from './RowText';
import RowBody from './RowBody';
import RowIcon from './RowIcon';
import RowCaption from './RowCaption';

import './index.less';

export interface IRowProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    disabled?: boolean;
    hoverable?: boolean;
    activable?: boolean;
    selectable?: boolean;
    small?: boolean;
    transparent?: boolean;
    ffFont?: boolean;
    horizontalPadding?: 0 | 8 | 16 | 24 | 32;
}

const Row: React.FC<IRowProps> & {
    Body: typeof RowBody;
    Icon: typeof RowIcon;
    Text: typeof RowText;
    Caption: typeof RowCaption;
} = ({
    className = '',
    hoverable = false,
    activable = false,
    selectable = false,
    small = false,
    ffFont = false,
    disabled = false,
    transparent = false,
    horizontalPadding = small ? 8 : 16,
    ...props
}: IRowProps): JSX.Element => {
    const containerClassNames = cx(
        component('row')({
            hoverable: hoverable,
            activable: activable,
            small: small,
            selectable,
            transparent,
            ff: ffFont,
            'ff-system': !ffFont,
            disabled: disabled,
            [`${horizontalPadding}`]: true,
        }),
        className,
    );

    return (
        <div {...props} className={containerClassNames}>
            {props.children}
        </div>
    );
};

Row.Body = RowBody;
Row.Icon = RowIcon;
Row.Text = RowText;
Row.Caption = RowCaption;

export default Row;
