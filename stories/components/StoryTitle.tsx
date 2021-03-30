import * as React from 'react';
import {PropsWithChildren} from 'react';
import {Brick} from 'components/utility/Modifiers/Brick';

export const StoryTitle: React.FC<PropsWithChildren<unknown>> = ({children}: PropsWithChildren<unknown>) => {
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
