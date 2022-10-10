import React, {
    TdHTMLAttributes,
    ThHTMLAttributes,
    MouseEvent,
    useCallback,
    useMemo,
    useRef,
    useState,
    useLayoutEffect,
} from 'react';
import cx from 'classnames';
import {component} from '../../../../services/helpers/classHelpers';
import './index.less';
import {IPopupActions, PopopCornerPosition, Popup} from '../../../popup';

export const enum CellType {
    'header' = 'th',
    'data' = 'td',
}

type ICellProps = (ICellThProps | ICellTdProps) & ICellGeneralProps;

interface ICellThProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
    as?: CellType.header;
}

interface ICellTdProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
    as?: CellType.data;
}

type ICellGeneralProps = ICellSimpleProps | ICellExpandableProps;

interface ICellSimpleProps {
    children?: React.ReactNode;
    expandable?: boolean;
    big?: boolean;
    noPadding?: boolean;
}

interface ICellExpandableProps extends ICellSimpleProps {
    expandable: true;
    expandWidth?: number;
    expandHeight?: number;
}

export const Cell = React.forwardRef<HTMLTableCellElement, ICellProps>(
    ({expandable = false, noPadding = false, big = false, onClick, className, children, ...props}, ref) => {
        const Tag = useMemo(() => props.as || CellType.data, [props.as]);
        // region ClassNames
        const cn = useMemo(() => cx(component('cell')({expandable}), className), [expandable, className]);
        const cnContainer = useMemo(() => component('cell', 'content')({big}), [big]);
        const cnExpanded = useMemo(() => component('cell', 'expanded')({padding: !noPadding}), [noPadding]);
        // endregion

        const [position, setPositionElem] = useCellPosition();
        const [initialCellWidth, setWidth] = useState<number>(80);
        const [isExpanded, setExpanded] = useState<boolean>(false);

        const contentContainerRef = useCallback((el: HTMLDivElement) => {
            setWidth(el?.offsetWidth);
        }, []);
        const popupRef = useRef<IPopupActions>(null);
        const expandedCellRef = useRef<HTMLDivElement>(null);

        const setExpandedCellStyles = useCallback(() => {
            expandedCellRef.current?.style.setProperty('--closed-width', initialCellWidth + 'px');
            expandedCellRef.current?.style.setProperty('--closed-height', big ? '48px' : '40px');
            // TODO: прокинуть "expanded" ширину. Понять как она считается всерху и внутри. этого компонента.
            expandedCellRef.current?.style.setProperty('--expanded-width', '400px');
            // expandedCellRef.current?.style.setProperty('--expanded-width', 'max-content');
            // expandedCellRef.current?.style.setProperty('--expanded-height', 'max-content');
            expandedCellRef.current?.style.setProperty('--expanded-height', '400px');
            setPositionElem(expandedCellRef?.current || undefined);
        }, [big, initialCellWidth, setPositionElem]);

        useLayoutEffect(() => {
            setExpandedCellStyles();
        }, [setExpandedCellStyles, isExpanded]);

        const handleExpandCell = useCallback(
            (e: MouseEvent<HTMLTableCellElement>) => {
                if (!expandable) {
                    return;
                }
                onClick && onClick(e);
                popupRef?.current?.open();
            },
            [expandable, onClick],
        );

        // TODO: это не надежно. Добавить нормальный уникальный id
        const uuid = useMemo(() => Math.random().toString(), []);

        return (
            <Tag {...props} ref={ref} className={cn} onClick={handleExpandCell}>
                <div className={cnContainer} id={uuid} ref={contentContainerRef}>
                    {expandable && (
                        <Popup
                            position={position}
                            customPopupRoot={uuid}
                            contentStyle={{position: 'absolute'}}
                            ref={popupRef}
                            trigger={({isOpen}) => {
                                setExpanded(isOpen);
                                return null;
                            }}
                            triggerProps={{style: {display: 'none'}}}
                        >
                            <div className={cnExpanded} ref={expandedCellRef}>
                                {children}
                            </div>
                        </Popup>
                    )}
                    {children}
                </div>
            </Tag>
        );
    },
);
Cell.displayName = 'Search';

const useCellPosition = (el?: HTMLDivElement): [PopopCornerPosition, (el: HTMLDivElement | undefined) => void] => {
    // TODO: доделать вычисления положения открытой ячейки относительно закрытой
    // TODO: добавить к вычислению безусловные отступы от краев  экрана
    // TODO: Сделать flexable ширину и высоту открытой ячейки (обсудить это с дизайном)
    const [elem, setElem] = useState<HTMLDivElement | undefined>(el);
    if (!elem) {
        return ['corner-top-left', setElem];
    }
    const rect = elem.getBoundingClientRect();
    // console.log('rect', rect);
    if (rect.x + rect.width > window.innerWidth) {
        return ['corner-top-right', setElem];
    }
    return ['corner-top-left', setElem];
    // rect.x + rect.width < 0 || rect.y + rect.height < 0 || rect.x > window.innerWidth || rect.y > window.innerHeight;
};
