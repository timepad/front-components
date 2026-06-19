import React from 'react';

export const addQaTagsToChildren = (children: React.ReactNode, getAttr: (index: number) => string): React.ReactNode => {
    return React.Children.map(children, (child, index) => {
        return React.isValidElement(child)
            ? React.cloneElement(child, {'data-qa': getAttr(index), ...child.props})
            : child;
    });
};
