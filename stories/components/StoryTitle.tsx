import React, {PropsWithChildren} from 'react';
import {Brick} from 'components/utility/Modifiers/Brick';

export const StoryTitle = ({children}: PropsWithChildren<unknown>): React.ReactElement => {
    return (
        <>
            <span className="t-caption t-caption-16" style={{color: '#808080'}}>
                {children}
            </span>
            <hr className="adivider adivider--thin" />
            <Brick size={2} />
        </>
    );
};
