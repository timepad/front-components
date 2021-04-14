import * as React from 'react';
import {getSizeForSpacer} from '../../../services/helpers/SpacerHelper';

interface IBrickProps {
    size?: number;
    plusHalf?: boolean;
}

export const Brick: React.FC<IBrickProps> = ({size, plusHalf}) => {
    return <div className={getSizeForSpacer('lbrick', size, plusHalf)} />;
};
