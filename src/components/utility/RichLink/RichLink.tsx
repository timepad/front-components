import React from 'react';
import {Link, LinkProps} from 'react-router-dom';

import {LocationDescriptorObject} from 'history';

interface IRichLinkProps extends LinkProps<ILinkState> {
    cancelScroll?: boolean;
    external?: boolean;
}

interface ILinkState {
    cancelScroll?: boolean;
}

export const RichLink = (props: IRichLinkProps): React.ReactElement => {
    const {cancelScroll, external, ...linkProps} = props;

    let location: LocationDescriptorObject<ILinkState> = {state: {cancelScroll}};

    if (typeof linkProps.to === 'string') {
        location.pathname = linkProps.to as string;
    } else {
        location = {...linkProps.to, ...location};
    }

    return external ? (
        <a href={location.pathname} className={linkProps.className}>
            {linkProps.children}
        </a>
    ) : (
        <Link<ILinkState> {...linkProps} to={location} />
    );
};
