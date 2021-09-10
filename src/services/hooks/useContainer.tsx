import React, {useContext} from 'react';
import EE from 'eventemitter3';

class Container extends EE {
    private readonly elements: Record<string, Record<string, any>>;

    constructor() {
        super();
        this.elements = {};
    }

    register<T extends new () => any>(cons: T, scope = 'default') {
        if (this.elements[scope] && this.elements[scope][cons.name]) {
            return this.elements[scope][cons.name];
        }

        if (!this.elements[scope]) {
            this.elements[scope] = {};
        }

        const newConstructor = new cons();
        this.elements[scope][cons.name] = newConstructor;

        this.emit('register', {[scope]: this.elements[scope][cons.name]});

        return newConstructor;
    }

    unregister<T extends new () => any>(cons: T, scope = 'default') {
        this.emit('unregistered', {[scope]: this.elements[scope][cons.name]});
        delete this.elements[scope][cons.name];
    }
}

export const ContainerContext = React.createContext<Container>(new Container());

type ConstructorValue<T> = T extends new () => infer U ? U : never;

export const useContainer = <T extends new () => any>(
    cons: T,
    scope = 'default',
): [ConstructorValue<T>, () => void] => {
    const ctx = useContext(ContainerContext);

    return [ctx.register(cons, scope), () => ctx.unregister(cons, scope)];
};
