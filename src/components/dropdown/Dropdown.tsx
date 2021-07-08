import * as React from 'react';
import {ReactNode, useEffect, useRef, useState, useCallback, Ref} from 'react';
import cx from 'classnames';

import {Row} from './Row';
import {Button as ButtonRow} from './Button';
import {Option} from './Option';
import {useClickOutside} from '../../services/hooks/useClickOutside';

import './index.less';
import {Body} from './Body';
import {DropDownManagerContext} from './ManagerContext';
import {ToggleButton} from './ToggleButton';
import {component} from '../../services/helpers/classHelpers';

/*
┌───────┐ ┌───┐    ┌───┐ ┌───────┐
│   tl  │ │   │    │   │ │  tr   │
└───────┘ │rt │    │ lt│ └───────┘
┌───┐ ┌─┐ │   │    │   │ ┌─┐ ┌───┐
│   │ └─┘ └───┘    └───┘ └─┘ │   │
│ lb│ ┌───────┐    ┌───────┐ │rb │
│   │ │  br   │    │   bl  │ │   │
└───┘ └───────┘    └───────┘ └───┘
*/
type DropdownPosition = 'tl' | 'rt' | 'br' | 'lb' | 'lt' | 'tr' | 'rb' | 'bl';

export interface IDropdownProps {
    show?: boolean;
    white?: boolean;
    onClose?: () => void;
    parent?: React.MutableRefObject<HTMLElement | null>;
    children?: ReactNode;
    priorityPositions?: DropdownPosition[];
    // enable with icons dropdown style
    withIcons?: boolean;
    doNotCloseMobileDDOnAnyClick?: boolean;
    childrenRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const EDGE_PADDING = 8;

const TOP_SHIFT = 2;

const TOP_PADDING = 16;

const AUTOPOSITION_CLASS = 'cdrop__drop--autoposition';

// Возвращает позицию DD относительно родителя с учётом выбранного позиционирования.
// Функция очень не KISS но на века (надеюсь). Возможные позиции см `DropdownPosition`
const smartPositionResolve = (
    rectParent: DOMRect,
    rectDropDown: DOMRect,
    priority: Array<DropdownPosition>,
): {
    top: number | '';
    left: number | '';
    height: number | '';
    scrollable: boolean;
} => {
    const {innerWidth, innerHeight} = window; // размеры видимой области экрана
    const {x: px, y: py, width: pw, height: ph} = rectParent; // размеры и позиция элемента, к которому надо прикрепить DD
    const {width: dw, height: dh} = rectDropDown; // размеры DD

    let top = 0;
    let left = 0;
    let height = dh;
    let success = false; // поиск успешен
    let isTall = false; // высокий, но ещё не прокрутка
    // определяем нужна ли прорутка (больше ли высота DD, чем видимая область)
    const scrollable = height > innerHeight - EDGE_PADDING * 2; // высокий на столько, что нужна прокрутка

    // в мобиле нет позиционирования
    if (innerWidth < 736) {
        return {
            top: '',
            left: '',
            height,
            scrollable,
        };
    }

    // если высота больше половины допустимой области экрана, то может не поместиться
    if (dh > innerHeight / 2 - EDGE_PADDING) {
        isTall = true;
    }

    const topTest = () => top >= EDGE_PADDING - TOP_SHIFT && top + dh - TOP_SHIFT <= innerHeight - EDGE_PADDING;

    for (let i = 0, {length} = priority; i < length; i++) {
        const position = priority[i];

        // if position under or bottom parent and scrollable, skip
        if (scrollable && (position[0] === 't' || position[0] === 'b')) {
            continue;
        }

        // тут простая арифметика
        switch (position[0]) {
            case 't':
                top = py - TOP_SHIFT - EDGE_PADDING - dh;
                break;
            case 'b':
                top = py + ph + EDGE_PADDING - TOP_SHIFT;
                break;
            case 'l':
                left = px - EDGE_PADDING - dw;
                break;
            case 'r':
                left = px + pw + EDGE_PADDING;
                break;
        }

        // тут арифметика проста для вариантов xl и xr
        switch (position[1]) {
            case 't':
                top = py + ph - dh - TOP_SHIFT;
                // если высокий элемент не проходит тест
                if (isTall && !topTest()) {
                    top = py - TOP_SHIFT; // позиционируем прибивая к противоположной грани родителя
                    // если тест снова провален
                    if (!topTest()) {
                        top = EDGE_PADDING - TOP_SHIFT; // прибиваем к верхней границе (с учётом отступа)
                        // если DD вышел оторванным от родителя (например кнопка снизу, а DD к верху прибит)
                        if (py < top - TOP_SHIFT || top + dh - TOP_SHIFT > py + ph) {
                            top = py + ph - dh - TOP_SHIFT; // сбрасываем значение до исходного
                        }
                    }
                }
                break;
            case 'b':
                top = py - TOP_SHIFT;
                // если высокий элемент не проходит тест
                if (isTall && !topTest()) {
                    top = py + ph - dh - TOP_SHIFT; // позиционируем прибивая к противоположной грани родителя
                    // если тест снова провален
                    if (!topTest()) {
                        top = innerHeight - EDGE_PADDING - TOP_SHIFT - dh; // прибиваем к нижней границе (с учётом отступа)
                        // если DD вышел оторванным от родителя (например кнопка сверху, а DD к низу прибит)
                        if (py < top - TOP_SHIFT || top + dh - TOP_SHIFT > py + ph) {
                            top = py - TOP_SHIFT; // сбрасываем значение до исходного
                        }
                    }
                }
                break;
            case 'l':
                left = px + pw - dw;
                break;
            case 'r':
                left = px;
                break;
        }

        // проверки: если элемент прокручиваемый и нашлось место справа или слева от родителя
        // ИЛИ
        // проходит тест, что DD внутри видимой зоны
        if (
            (scrollable && left >= EDGE_PADDING && left + dw <= innerWidth - EDGE_PADDING) ||
            (!scrollable && topTest() && left >= EDGE_PADDING && left + dw <= innerWidth - EDGE_PADDING)
        ) {
            success = true; // успех и выход из цикла
            break;
        }
    }

    // в случае успеха поиска, позиционируем
    if (success) {
        if (scrollable) {
            top = TOP_PADDING;
            height = innerHeight - EDGE_PADDING * 2;
        }
    } else {
        // если провал, то, вероятно, недостаточно позиций было описано и мы пробуем пройтись снова по всем позициям,
        // но если мы и так только что прошлись по всем позициям (м.б. не уникальным, но не стал делать проверку),
        // то откидываем вариант, когда DD позиционируется вправо и вниз, тем самым раздвигая экран
        if (priority.length === 8) {
            // TODO по идее такого быть не может, но если вдруг, то избегаем зацикливания
            window.console.error('Позиция не удалась');
            top = top = py + ph - dh - TOP_SHIFT;
            left = px + pw + EDGE_PADDING;
        } else {
            // фолбек с перечислением всех возможных позиций
            return smartPositionResolve(rectParent, rectDropDown, ['tl', 'rt', 'br', 'lb', 'lt', 'tr', 'rb', 'bl']);
        }
    }

    return {top, left, scrollable, height};
};

export const Dropdown = ({
    show: propShow = false,
    white,
    onClose,
    parent,
    children,
    priorityPositions,
    withIcons,
    doNotCloseMobileDDOnAnyClick,
    childrenRef,
}: IDropdownProps): React.ReactElement => {
    // generate unique name for autoposition class
    // so that different dropdowns will have different autoposition class
    // which is convinient when few dropdowns should be opened altogether
    // --
    // also definition through state gurantee so that same dropdown will have same class name
    const [autopositionClassName] = useState(
        AUTOPOSITION_CLASS +
            '-' +
            Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5),
    );
    // determine if long dropdown has been scrolled to bottom
    const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const [applyAutoPosition, setApplyAutoPosition] = useState(false);
    const [scrollable, setScrollable] = useState(false);
    const [show, setShow] = useState(propShow);

    const dropClassName = cx(
        component(
            'drop',
            'drop',
        )({
            right: false,
            scrollable: scrollable,
            show: show,
            white: white,
            scrolledtobottom: scrolledToBottom,
            'with-icons': withIcons,
        }),
        {
            [autopositionClassName]: applyAutoPosition,
        },
    );

    const ddRef = useRef<HTMLDivElement | null>(null);
    const ddListRef = useRef<HTMLDivElement | null>(null);
    const ddBtnRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (!show) {
            // TODO: очередная территория костылей
            document.body.classList.remove('dd-open');
        }
    }, [show]);

    useEffect(() => {
        setShow(propShow);
    }, [propShow]);

    const onCloseHandler = useCallback(() => {
        if (onClose) {
            onClose();
        }
        setShow(false);
        document.body.classList.remove('dd-open');
    }, [onClose]);

    const target = parent ? parent : ddBtnRef;
    useClickOutside(
        ddRef,
        (event) => {
            if (childrenRef && childrenRef.current) {
                if (childrenRef.current.contains(event.target as any)) {
                    return;
                }
            }
            onCloseHandler();
        },
        target as React.MutableRefObject<HTMLButtonElement>,
    );
    // useClickOutside(
    //     ddRef,
    //     (event) => {
    //         const el = Array.from(document.querySelectorAll('.cdrop-bg')).find((item) =>
    //             item.contains(event.target as any),
    //         );
    //         if (el) {
    //             return;
    //         }
    //         onCloseHandler();
    //     },
    //     target as React.MutableRefObject<HTMLButtonElement>,
    // );

    useEffect(() => {
        const currentDdRef = ddRef?.current;
        const onResize = () => {
            const realParent = parent ? parent : ddBtnRef;
            if (!show || !currentDdRef || !realParent.current || !ddListRef.current) {
                return;
            }

            const dropdownElement = currentDdRef;
            const rectDropDown = ddListRef.current.getBoundingClientRect();
            const rectParent = realParent.current.getBoundingClientRect();

            document.body.classList.add('dd-open');

            const {top, left, scrollable} = smartPositionResolve(
                rectParent,
                rectDropDown,
                priorityPositions || ['rb', 'bl', 'lb'],
            );
            setScrollable(scrollable);
            // ---
            // top и left добавляются в динамически созданный класс, который навешивается на дропдаун
            // вместо того, чтобы задавать это через  dropdownElement.style
            // т.о. когда длинный дропадун будет пролистан до низу,
            // позиционирование будет переопределено в классе cdrop__drop--scrolledtobottom
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = `${autopositionClassName}-id`;
            style.innerHTML = `.${autopositionClassName} {
        ${top === '' ? '' : 'top: ' + top + 'px;'}
        ${left === '' ? '' : 'left: ' + left + 'px;'}
      }`;
            document.getElementById(style.id)?.remove();
            document.getElementsByTagName('head')[0].appendChild(style);
            setApplyAutoPosition(true);
            dropdownElement.style.visibility = 'visible';
        };

        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
            const dropdownElement = currentDdRef;
            if (dropdownElement?.style) {
                dropdownElement.style.visibility = '';
            }
            setApplyAutoPosition(false);
            document.getElementById(`${autopositionClassName}-id`)?.remove();
            setScrolledToBottom(false);
        };
    }, [parent, ddRef, show, priorityPositions, autopositionClassName]);

    useEffect(() => {
        const onScroll = () => {
            onCloseHandler();
        };
        if (show) {
            window.addEventListener('scroll', onScroll);

            return () => {
                window.removeEventListener('scroll', onScroll);
            };
        }
    }, [onCloseHandler, show]);

    const toggle = () => {
        setShow(!show);
    };

    return (
        <DropDownManagerContext.Provider
            value={{
                toggle,
                show,
                ddRef,
                ddBtnRef,
                doNotCloseMobileDDOnAnyClick,
                onCloseHandler,
                setScrolledToBottom,
                ddListRef,
                white,
                dropClassName,
            }}
        >
            {children}
        </DropDownManagerContext.Provider>
    );
};

Dropdown.Row = Row;
Dropdown.Button = ButtonRow;
Dropdown.Option = Option;
Dropdown.Body = Body;
Dropdown.ToggleButton = ToggleButton;
