import React, {useCallback, useContext} from 'react';
import {ConstructorValue, DependencyContainer} from '../helpers/dependencyContainer';

export const ContainerContext = React.createContext<DependencyContainer>(new DependencyContainer());

interface IContainerEvent<T extends new () => any> {
    scope: string;
    cons: T;
}

interface IContainerEventHandler<T extends new () => any> {
    (event: IContainerEvent<T>): void;
}

interface IContainerEventAdapter<T extends new () => any> {
    (eventName: 'registered' | 'unregistered', fn: IContainerEventHandler<T>): void;
}

type UseContainerHookResult<T extends new () => any> = [ConstructorValue<T>, IContainerEventAdapter<T>, () => void];

/**
 * Возвращает кортедж из 3 элементов
 * @param {T} cons - Конструктор класса T
 * @param {string} scope - Область видимости
 * @return {UseContainerHookResult<T>} - Возврашает кортедж из 3 элементов.
 * Первый элемент это экземпляр класса.
 * Второй элемент это функция, которая позволяет контролировать подписку/отписку экземпляра класса в контейнер
 * Третий элемент это dispose функция, которая позволяет отписаться и удалить экземпляр класса из контейнера
 */
export function useContainer<T extends new () => any>(cons: T, scope = 'default'): UseContainerHookResult<T> {
    const ctx = useContext(ContainerContext);

    const on: IContainerEventAdapter<T> = useCallback((eventName, fn) => ctx.on(eventName, fn), [ctx]);

    return [ctx.get(cons, scope), on, () => ctx.unregister(cons, scope)];
}
