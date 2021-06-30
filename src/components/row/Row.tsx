import React, {ReactNode} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import Text from './RowText';
import Body from './RowBody';
import Icon from './RowIcon';
import Caption from './RowCaption';
import {RowFontEnum} from './Row.const';

import './index.less';

interface IRowProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: string | ReactNode | ReactNode[];
    disabled?: boolean;
    hoverable?: boolean;
    small?: boolean;
    fontFamily?: RowFontEnum;
}

const Row = (props: IRowProps): JSX.Element => {
    const {disabled, hoverable, small, fontFamily = RowFontEnum.FFSystem} = props;
    const customClassNames = component('row')({
        disabled,
        hoverable,
        small,
        ff: fontFamily === RowFontEnum.FF,
        ff_system: fontFamily === RowFontEnum.FFSystem,
    });

    const finalClassNames = cx(customClassNames, props.className);

    const Children =
        typeof props.children === 'string' ? (
            <Body>
                <Text>{props.children}</Text>
            </Body>
        ) : (
            props.children
        );

    return (
        <div className={finalClassNames} {...props}>
            {Children}
        </div>
    );
};

Row.Body = Body;
Row.Icon = Icon;
Row.Text = Text;
Row.Caption = Caption;

export default Row;
