import * as React from 'react';
import {Brick} from 'components/utility/Modifiers/Brick';

export const StoryTitle: React.FC = ({children}) => {
    return (
        <>
            <span className="t-caption t-caption-16">{children}</span>
            <hr className="adivider adivider--thin" />
            <Brick size={2} />
        </>
    );
};
