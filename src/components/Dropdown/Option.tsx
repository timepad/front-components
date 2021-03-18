import React, {MouseEventHandler} from 'react';
import cx from 'classnames';
import IconBullet from '../../assets/svg/16/icon-bullet-16.svg';
import {atom, molecule} from '../../services/helpers/ClassHelper';

interface IProps {
    label: string;
    isSelected?: boolean;
    onClick?: MouseEventHandler;
    rowClass?: string;
    // determines if a drop down item is a subitem (extra space)
    subitem?: boolean;
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

export const Option = (props: IProps): React.ReactElement => {
    const rowClass = cx(props.rowClass || null, {
        'mdrop__list--subitem': props.subitem,
    });

    return (
        <li className={cx(molecule('drop', 'option-wrapper')(), rowClass)}>
            <span onClick={props.onClick}>
                {props.icon &&
                    React.cloneElement(props.icon, {className: cx(atom('icon')(), molecule('drop', 'row-icon')())})}
                {props.label}
                {props.isSelected && <IconBullet className={cx(atom('icon')(), molecule('drop', 'suffix')())} />}
            </span>
        </li>
    );
};
