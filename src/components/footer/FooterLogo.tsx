import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import {Logo} from '../logo';

export const FooterLogo: React.FC = () => (
    <div className={component('footer', 'logo')()}>
        <Logo />
    </div>
);
