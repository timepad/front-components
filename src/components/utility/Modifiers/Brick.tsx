import React from 'react';
import {getSizeForSpacer} from '../../../services/helpers/SpacerHelper';

interface IBrickProps {
    size?: number;
    plusHalf?: boolean;
}

export const Brick = ({size, plusHalf}: IBrickProps): React.ReactElement => {
    return <div className={getSizeForSpacer('lbrick', size, plusHalf)} />;
};
