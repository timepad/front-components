import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import RowText from './RowText';
import RowBody from './RowBody';
import RowIcon from './RowIcon';
import RowCaption from './RowCaption';

import './index.less';

interface IRowProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    disabled?: boolean;
    hoverable?: boolean;
    small?: boolean;
    ffFont?: boolean;
    dark?: boolean;
}

const Row: React.FC<IRowProps> & {
    Body: typeof RowBody;
    Icon: typeof RowIcon;
    Text: typeof RowText;
    Caption: typeof RowCaption;
} = (props: IRowProps): JSX.Element => {
    const customClassNames = component('row')({
        hoverable: props.hoverable,
        small: props.small,
        ff: props.ffFont,
        'ff-system': !props.ffFont,
        disabled: props.disabled,
    });

    const outContainerClassNames = component(
        'row',
        'outer',
    )({
        dark: props.dark,
    });

    const finalClassNames = cx(customClassNames, props.className);

    return (
        <div className={outContainerClassNames}>
            <div {...props} className={finalClassNames}>
                {props.children}
            </div>
        </div>
    );
};

Row.Body = RowBody;
Row.Icon = RowIcon;
Row.Text = RowText;
Row.Caption = RowCaption;

export default Row;
