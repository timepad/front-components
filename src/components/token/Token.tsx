import React, {FC} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import {Button, ButtonVariant} from '../button';
import DeleteIcon from 'svg/24/icon-close-24.svg';
import {TokenCell} from './TokenCell';
//import cx from 'classnames';

interface ITokenChildren {
    Cell: typeof TokenCell;
}

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    value: string;
    disabled?: boolean;
    onDelete?: () => void;
}

const Token: FC<IProps> & ITokenChildren = ({disabled, onDelete, value, className, ...props}): JSX.Element => {
    const baseClassName = 'token';
    const tokenClassNames = cx(
        component(baseClassName)({
            disabled,
        }),
        className,
    );

    return (
        <div className={tokenClassNames}>
            <div className={component(baseClassName, 'title')()} {...props}>
                {value}
            </div>
            {!!onDelete && (
                <Button
                    className={component(baseClassName, 'button')()}
                    variant={ButtonVariant.transparent}
                    icon={<DeleteIcon />}
                    onClick={onDelete}
                />
            )}
        </div>
    );
};

Token.Cell = TokenCell;

export default Token;
