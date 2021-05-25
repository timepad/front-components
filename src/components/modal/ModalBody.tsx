import * as React from 'react';
import cx from 'classnames';
import {layout} from '../../services/helpers/classHelpers';

export const Body: React.FC = ({children}) => {
    return (
        <div>
            <div className={cx(layout('brick')(), layout('brick-0-5')())} />
            {children}
        </div>
    );
};
