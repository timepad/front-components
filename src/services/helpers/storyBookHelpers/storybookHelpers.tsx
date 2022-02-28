import React, {FC, HTMLAttributes} from 'react';

export interface IStorybookComponent extends React.FC {
    storyName?: string;
}

export const StoryTitle: FC = ({children}) => {
    return (
        <>
            <span className="t-caption t-caption-16">{children}</span>
            <hr className="cdivider cdivider--thin" />
            <div className="lbrick-2" />
        </>
    );
};

export const StoryDescription: FC = ({children}) => {
    return (
        <>
            <span className="t-small">{children}</span>
            <div className="lbrick-2" />
        </>
    );
};

interface ISpacerProp extends HTMLAttributes<HTMLDivElement> {
    width?: number;
}
export const Spacer: FC<ISpacerProp> = ({width = 32}) => <div style={{width: width}} />;

export const dummy = (): null => {
    return null;
};
