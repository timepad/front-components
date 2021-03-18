import React from 'react';
import cx from 'classnames';

interface IProps {
    rowClass?: string;
}

export const Hr = (props: IProps): React.ReactElement => {
    const rowClass = cx('mdrop__hr', props.rowClass);
    return <li className={rowClass} />;
};
