import React, {MouseEventHandler} from 'react';
import cx from 'classnames';
import IconBullet from '../../assets/svg/16/icon-bullet-16.svg';
import {component} from '../../services/helpers/classHelpers';

interface IProps {
    label: string;
    isSelected?: boolean;
    onClick?: MouseEventHandler;
    rowClass?: string;
    // determines if a drop down item is a subitem (extra space)
    subitem?: boolean;
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

export const Option: React.FC<IProps> = (props) => {
    const rowClass = cx(props.rowClass || null, {
        'cdrop__list--subitem': props.subitem,
    });

    return (
        <li className={cx(component('drop', 'option-wrapper')(), rowClass)}>
            <span onClick={props.onClick}>
                {props.icon &&
                    React.cloneElement(props.icon, {
                        className: cx(component('icon')(), component('drop', 'row-icon')()),
                    })}
                {props.label}
                {props.isSelected && <IconBullet className={cx(component('icon')(), component('drop', 'suffix')())} />}
            </span>
        </li>
    );
};
