import React from 'react';
import {getSizeForSpacer} from '../../../services/helpers/SpacerHelper';

interface IGapProps {
    size?: number;
    plusHalf?: boolean;
}

export const Gap = ({size, plusHalf}: IGapProps): React.ReactElement => {
    return <div className={getSizeForSpacer('lgap', size, plusHalf)} />;
};
