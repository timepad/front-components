import React, {Component, ReactNode} from 'react';
import {component} from '../../services/helpers/classHelpers';

import './index.less';

interface IRowProps {
    children: string | ReactNode | ReactNode[];
    disabled?: boolean;
    hoverable?: boolean;
    small?: boolean;
    fontFamily?: RowFontEnum;
}

interface IRowIconProps {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    right?: boolean;
    top?: boolean;
}

export const enum RowFontEnum {
    FF = 'ff',
    FFSystem = 'ff_system',
}

export class Row extends Component<IRowProps> {
    static Body: React.FC<{children: ReactNode | ReactNode[]}> = ({children}): JSX.Element => {
        return <div className="crow--body">{children}</div>;
    };

    static Caption: React.FC = ({children}): JSX.Element => {
        return <div className="crow--body--caption">{children}</div>;
    };

    static Text: React.FC = ({children}) => {
        return <div className="crow--body--text">{children}</div>;
    };

    static Icon: React.FC<IRowIconProps> = ({children, right, top}: IRowIconProps): JSX.Element => {
        const classNames = component('row--icon')({
            right,
            top,
        });
        const iconClasses = ['aicon', 'cicon'];
        return (
            <div className={classNames}>
                {React.cloneElement(children, {
                    className: iconClasses.join(' '),
                })}
            </div>
        );
    };
    render(): JSX.Element {
        const {children, disabled, hoverable, small, fontFamily = RowFontEnum.FFSystem} = this.props;

        const className = component('row')({
            disabled,
            hoverable,
            small,
            ff: fontFamily === RowFontEnum.FF,
            ff_system: fontFamily === RowFontEnum.FFSystem,
        });

        const Children =
            typeof children === 'string' ? (
                <Row.Body>
                    <Row.Text>{children}</Row.Text>
                </Row.Body>
            ) : (
                children
            );

        return (
            <div className={className} {...this.props}>
                {Children}
            </div>
        );
    }
}
