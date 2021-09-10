import React, {useContext} from 'react';
import EE from 'eventemitter3';

class Container extends EE {
    private elements: Map<string, Map<string, any>>;

    constructor() {
        super();
        this.elements = new Map();
        this.elements.set('default', new Map());
    }

    register<T extends new () => any>(cons: T, scope = 'default') {
        if (this.elements.has(scope) && this.elements.get(scope)?.has(cons.name)) {
            return this.elements.get(scope)?.get(cons.name);
        }

        const newConstructor = new cons();
        this.elements.set(scope, new Map([cons.name, newConstructor]));

        this.emit('register', {[scope]: this.elements.get(scope)});

        return newConstructor;
    }

    unregister<T extends new () => any>(cons: T, scope = 'default') {
        this.emit('unregistered', {[scope]: this.elements.get(scope)});

        this.elements.get(scope)?.delete(cons.name);
    }
}

export const ContainerContext = React.createContext<Container>(new Container());

type ConstructorValue<T> = T extends new () => infer U ? U : never;

export const useContainer = <T extends new () => any>(
    cons: T,
    scope = 'default',
): [ConstructorValue<T>, () => void] => {
    const ctx = useContext(ContainerContext);

    // if (ctx[scope] && ctx[scope][cons.name]) {
    //     return ctx[scope][cons.name];
    // }
    //
    // if (!ctx[scope]) {
    //     ctx[scope] = {};
    // }
    //
    // const newConstructor = new cons();
    // ctx[scope][cons.name] = newConstructor;
    //

    return [ctx.register(cons, scope), () => ctx.unregister(cons, scope)];
};
