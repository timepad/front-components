import React, {Component, ReactNode} from 'react';
import {component} from '../../services/helpers/classHelpers';

import './index.less';

interface IRowProps {
    children: string | ReactNode | ReactNode[];
    disabled?: boolean;
    hoverable?: boolean;
    theme?: 'light' | 'dark';
}

interface IRowState {
    disabled?: boolean;
    hoverable?: boolean;
    theme?: 'light' | 'dark';
}

interface IRowIconProps {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    right?: boolean;
}

export class Row extends Component<IRowProps, IRowState> {
    static Body: React.FC<{children: ReactNode | ReactNode[]}> = ({children}): JSX.Element => {
        return <div className="crow--body">{children}</div>;
    };

    static Caption: React.FC = ({children}): JSX.Element => {
        return <div className="crow--body--caption">{children}</div>;
    };

    static Text: React.FC = ({children}) => {
        return <div className="crow--body--text">{children}</div>;
    };

    static Icon: React.FC<IRowIconProps> = ({children, right}: IRowIconProps): JSX.Element => {
        const classNames = component('row--icon')({
            right,
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

    constructor(props: IRowProps) {
        super(props);

        this.state = {
            disabled: props.disabled,
            hoverable: props.hoverable,
        };
    }
    render(): JSX.Element {
        const {children, disabled, hoverable} = this.props;

        const className = component('row')({
            disabled: disabled,
            hoverable: hoverable,
        });

        const Children =
            typeof children === 'string' ? (
                <Row.Body>
                    <Row.Text>{children}</Row.Text>
                </Row.Body>
            ) : (
                children
            );

        return <div className={className}>{Children}</div>;
    }
}
