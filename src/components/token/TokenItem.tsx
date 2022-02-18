import React, {FC} from 'react';
import {component} from '../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../button';
import DeleteIcon from 'svg/24/icon-close-24.svg';
//import cx from 'classnames';

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    readonly?: boolean;
    tokenValue: string;
    onDelete: () => void;
}

export const TokenItem: FC<IProps> = ({readonly, onDelete, tokenValue, ...props}): JSX.Element => {
    const baseClassName = 'token';
    return (
        <div className={component(baseClassName, 'item')()}>
            <div className={component(baseClassName, 'title')()} {...props}>
                {tokenValue}
            </div>
            {!readonly && <Button variant={ButtonVariant.transparent} icon={<DeleteIcon />} onClick={onDelete} />}
        </div>
    );
};
