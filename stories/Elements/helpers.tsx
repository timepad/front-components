import React, {PropsWithChildren} from 'react';
import {Brick} from '../../src/components/utility/Modifiers/Brick';

export const Title = ({children}: PropsWithChildren<unknown>): React.ReactElement => {
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

const imageUrl = 'https://ucarecdn.com/a6b28451-2340-4b61-9776-8e186bf976fa/';

export {Brick, imageUrl};
