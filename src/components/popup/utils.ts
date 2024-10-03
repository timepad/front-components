import {PopupPosition} from './';

export const POSITION_TYPES: PopupPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'right-top',
    'right-center',
    'right-bottom',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom',
    'screen-center',
];

type PositionModifiers = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    transform: string;
};

const getModifiersForPosition = (
    triggerBounding: DOMRect,
    ContentBounding: DOMRect,
    position: PopupPosition,
    {offsetX, offsetY}: {offsetX: number; offsetY: number},
): PositionModifiers => {
    const margin = 8;
    const args = position.split('-');
    const CenterTop = triggerBounding.top + triggerBounding.height / 2;
    const CenterLeft = triggerBounding.left + triggerBounding.width / 2;
    const {height, width} = ContentBounding;
    let top = CenterTop - height / 2;
    let left = CenterLeft - width / 2;
    let transform = '';

    if (args[0] === 'corner') {
        return {[args[1]]: 0, [args[2]]: 0, transform};
    } else if (args[0] === 'screen' && args[1] === 'center') {
        top = window.innerHeight / 2 - height / 2;
        left = window.innerWidth / 2 - width / 2;
        return {top, left, transform};
    } else {
        switch (args[0]) {
            case 'top':
                top -= height / 2 + triggerBounding.height / 2 + margin;
                transform = `rotate(180deg)  translateX(50%)`;
                break;
            case 'bottom':
                top += height / 2 + triggerBounding.height / 2 + margin;
                transform = `rotate(0deg) translateY(-100%) translateX(-50%)`;
                break;
            case 'left':
                left -= width / 2 + triggerBounding.width / 2 + margin;
                transform = ` rotate(90deg)  translateY(50%) translateX(-25%)`;
                break;
            case 'right':
                left += width / 2 + triggerBounding.width / 2 + margin;
                transform = `rotate(-90deg)  translateY(-150%) translateX(25%)`;
                break;
            default:
        }
        switch (args[1]) {
            case 'top':
                top = triggerBounding.top;
                break;
            case 'bottom':
                top = triggerBounding.top - height + triggerBounding.height;
                break;
            case 'left':
                left = triggerBounding.left;
                break;
            case 'right':
                left = triggerBounding.left - width + triggerBounding.width;
                break;
            default:
        }

        top = args[0] === 'top' ? top - offsetY : top + offsetY;
        left = args[0] === 'left' ? left - offsetX : left + offsetX;
    }

    return {top, left, transform};
};

interface IBox {
    top: number;
    left: number;
    width: number;
    height: number;
}

export const getTooltipBoundary = (keepTooltipInside: string | boolean): IBox => {
    let boundingBox = {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
    };
    if (typeof keepTooltipInside === 'string') {
        const selector = document.querySelector(keepTooltipInside);
        if (process.env.NODE_ENV !== 'production') {
            if (selector === null)
                throw new Error(
                    `${keepTooltipInside} такого селектора не существует : keepTooltipInside должен быть валидным и существующим в документе селекотором или boolean `,
                );
        }
        if (selector !== null) boundingBox = selector.getBoundingClientRect();
    }

    return boundingBox;
};

export const calculateModifiers = (
    triggerBounding: DOMRect,
    ContentBounding: DOMRect,
    position: PopupPosition | PopupPosition[],
    {offsetX, offsetY}: {offsetX: number; offsetY: number},
    keepTooltipInside: string | boolean,
): PositionModifiers => {
    let modifiers: PositionModifiers = {
        left: 0,
        top: 0,
        transform: 'rotate(135deg)',
    };
    let i = 0;
    const wrapperBox = getTooltipBoundary(keepTooltipInside);
    let positions = Array.isArray(position) ? position : [position];
    let isPositionFind = false;

    if (keepTooltipInside || Array.isArray(position)) positions = [...positions, ...POSITION_TYPES];

    while (i < positions.length) {
        modifiers = getModifiersForPosition(triggerBounding, ContentBounding, positions[i], {
            offsetX,
            offsetY,
        });

        const contentBox = {
            top: modifiers?.top || 0,
            left: modifiers?.left || 0,
            right: modifiers?.right,
            bottom: modifiers?.bottom,
            width: ContentBounding.width,
            height: ContentBounding.height,
        };

        if (positions[i].split('-')[0] === 'corner') {
            isPositionFind = true;
            break;
        }

        if (
            contentBox.top <= wrapperBox.top ||
            contentBox.left <= wrapperBox.left ||
            contentBox.top + contentBox.height >= wrapperBox.top + wrapperBox.height ||
            contentBox.left + contentBox.width >= wrapperBox.left + wrapperBox.width
        ) {
            i++;
        } else {
            isPositionFind = true;
            break;
        }
    }

    if (!isPositionFind) {
        modifiers = getModifiersForPosition(triggerBounding, ContentBounding, positions[0], {
            offsetX,
            offsetY,
        });
        modifiers.top = 0;
    }
    return modifiers;
};
