import * as React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import Text from './RowText';
import Body from './RowBody';
import Icon from './RowIcon';
import Caption from './RowCaption';
import {RowFontEnum} from './Row.const';

import './index.less';

interface IRowProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: string | React.ReactNode | React.ReactNode[];
    disabled?: boolean;
    hoverable?: boolean;
    small?: boolean;
    fontFamily?: RowFontEnum;
}

const Row = (props: IRowProps): JSX.Element => {
    const {children, fontFamily = RowFontEnum.FFSystem} = props;
    const customClassNames = component('row')({
        disabled: props.disabled,
        hoverable: props.hoverable,
        small: props.small,
        ff: fontFamily === RowFontEnum.FF,
        ff_system: fontFamily === RowFontEnum.FFSystem,
    });

    const finalClassNames = cx(customClassNames, props.className);

    const Children =
        typeof children === 'string' ? (
            <Body>
                <Text>{children}</Text>
            </Body>
        ) : (
            children
        );

    return (
        <div {...props} className={finalClassNames}>
            {Children}
        </div>
    );
};

Row.Body = Body;
Row.Icon = Icon;
Row.Text = Text;
Row.Caption = Caption;

export default Row;
