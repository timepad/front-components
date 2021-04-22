import React from 'react';
import {RichLink} from '../utility/RichLink';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

interface IProps {
    label: string;
    href: string;
    cancelScroll?: boolean;
    rowClass?: string;
    external?: boolean;
    // determines if a drop down item is a subitem (extra space)
    subitem?: boolean;
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

export const Link: React.FC<IProps> = (props) => {
    const rowClass = cx(props.rowClass || null, {
        'mdrop__list--subitem': props.subitem,
    });

    return (
        <li className={rowClass}>
            <RichLink to={props.href} cancelScroll={props.cancelScroll} external={!!props.external}>
                {props.icon &&
                    React.cloneElement(props.icon, {
                        className: cx(component('icon')(), component('drop', 'row-icon')()),
                    })}
                {props.label}
            </RichLink>
        </li>
    );
};
