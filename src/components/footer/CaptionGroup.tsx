import React from 'react';
import {Typography} from '../typography';

interface IMultiplyCaptionOverride {
    text: string | JSX.Element;
    caption: string | JSX.Element;
}

export const CaptionGroup: React.FC<IMultiplyCaptionOverride> = ({text, caption}) => (
    <Typography.Caption>
        <Typography.Caption className="caption-override" fontWeight="bold">
            {text}
        </Typography.Caption>
        <Typography.Caption className="caption-override">{caption}</Typography.Caption>
    </Typography.Caption>
);
