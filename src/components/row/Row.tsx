import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import RowText from './RowText';
import RowBody from './RowBody';
import RowIcon from './RowIcon';
import RowCaption from './RowCaption';

import './index.less';

interface IRowProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: string | React.ReactNode | React.ReactNode[];
    disabled?: boolean;
    hoverable?: boolean;
    small?: boolean;
    ffFont?: boolean;
}

const Row = (props: IRowProps): JSX.Element => {
    const customClassNames = component('row')({
        disabled: props.disabled,
        hoverable: props.hoverable,
        small: props.small,
        ff: props.ffFont,
        ff_system: !props.ffFont,
    });

    const finalClassNames = cx(customClassNames, props.className);

    const Children =
        typeof props.children === 'string' ? (
            <RowBody>
                <RowText>{props.children}</RowText>
            </RowBody>
        ) : (
            props.children
        );

    return (
        <div {...props} className={finalClassNames}>
            {Children}
        </div>
    );
};

Row.Body = RowBody;
Row.Icon = RowIcon;
Row.Text = RowText;
Row.Caption = RowCaption;

export default Row;
