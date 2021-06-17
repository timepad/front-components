import * as React from 'react';
import {Fragment} from 'react';
import cx from 'classnames';
import {component, layout} from '../../services/helpers/classHelpers';

export const Footer: React.FC = ({children}) => {
    return (
        <Fragment>
            <div className={cx(layout('brick')(), layout('brick-2')())} />
            <div className={component('form', 'footer')()}>{children}</div>
        </Fragment>
    );
};
