import * as React from 'react';
import LogoFull from '../../assets/svg/logo/logo.svg';

export const ExpandableLogo: React.FC = () => {
    return (
        <div className="expandable">
            <div className="expandable-logo-container">
                <LogoFull />
            </div>
        </div>
    );
};
