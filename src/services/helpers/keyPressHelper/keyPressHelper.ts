import React from 'react';

interface IUseKeyPress {
    key: string;
    callback: () => void;
}

export const keyPressHelper = (config: IUseKeyPress[]) => {
    return (e: React.KeyboardEvent<HTMLInputElement>): void => {
        config.map(({key, callback}) => {
            if (e.key === key) {
                callback();
            }
        });
    };
};
