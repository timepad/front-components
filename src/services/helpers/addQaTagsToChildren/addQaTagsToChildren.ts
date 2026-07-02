import React from 'react';

export const addQaTagsToChildren = (children: React.ReactNode, getAttr: (index: number) => string): React.ReactNode => {
    return React.Children.toArray(children).map((child, index) => {
        return React.isValidElement(child)
            ? React.cloneElement(child, {'data-qa': getAttr(index), ...child.props})
            : child;
    });
};
