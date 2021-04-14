import * as React from 'react';
import {getSizeForSpacer} from '../../../services/helpers/SpacerHelper';

interface IGapProps {
    size?: number;
    plusHalf?: boolean;
}

export const Gap: React.FC<IGapProps> = ({size, plusHalf}) => {
    return <div className={getSizeForSpacer('lgap', size, plusHalf)} />;
};
