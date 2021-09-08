import React, {useContext} from 'react';

export const ContainerContext = React.createContext<Record<string, Record<string, any>>>({});

type ConstructorValue<T> = T extends new () => infer U ? U : never;

export const useContainer = <T extends new () => any>(
    cons: T,
    scope = 'default',
): [ConstructorValue<T>, () => void] => {
    const ctx = useContext(ContainerContext);

    if (ctx[scope] && ctx[scope][cons.name]) {
        return ctx[scope][cons.name];
    }

    if (!ctx[scope]) {
        ctx[scope] = {};
    }

    const newConstructor = new cons();
    ctx[scope][cons.name] = newConstructor;

    function dispose() {
        delete ctx[scope][cons.name];
    }

    return [newConstructor, dispose];
};
