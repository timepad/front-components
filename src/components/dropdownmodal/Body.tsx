import * as React from 'react';
import {PropsWithChildren, useContext} from 'react';
import {DropDownManagerContext} from './ManagerContext';
import {component} from '../../services/helpers/classHelpers';
import {Theme} from '../utility/Modifiers';
import {Button} from '../button';
import {useMedia} from './MediaHook';

interface IProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
    className?: string;
}

const Body: React.FC<IProps | any> = ({children, className}) => {
    const classNames = className ? className : component('drop', 'list')();
    const context = useContext(DropDownManagerContext);
    const isSmall = useMedia('(max-width: 735.6px)');

    if (!context) {
        return null;
    }
    const {setPopperElement, styles, attributes, show, onCloseHandler, white, dropClassName, scrollRef} = context;
    if (!show) {
        return null;
    }
    const closeAll = () => {
        const event = new CustomEvent('dropdown-close', {});
        document.dispatchEvent(event);
    };

    if (isSmall) {
        return (
            <div className={component('drop-mobile')()}>
                <div className={component('drop-mobile', 'overlay')()} onClick={onCloseHandler} />
                <div className={component('drop-mobile', 'menu')()}>
                    <Theme dark={!white}>
                        <div className={component('drop', 'cancel')()}>
                            <div className={component('drop', 'cancel-wrapper')()}>
                                <Button
                                    label="Назад"
                                    variant={Button.variant.transparent}
                                    onClick={onCloseHandler}
                                    fixed
                                />
                                <Button label="Закрыть" variant={Button.variant.transparent} onClick={closeAll} fixed />
                            </div>
                        </div>
                        <div className={component('drop', 'hr-wrapper')()}>
                            <span className={component('drop', 'hr')()} />
                        </div>
                    </Theme>
                </div>
                <div
                    className={component(
                        'drop-mobile',
                        'body',
                    )({
                        white,
                    })}
                >
                    {children}
                </div>
            </div>
        );
    }
    return (
        <div
            className={component('drop-bg')({
                show,
            })}
        >
            <div
                className={component('drop-animate')({
                    show: show,
                })}
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
            >
                {show && (
                    <div
                        className={dropClassName}
                        onClick={(e: React.MouseEvent) => {
                            // if (doNotCloseMobileDDOnAnyClick) {
                            //     e.target === e.currentTarget && onCloseHandler();
                            // } else {
                            onCloseHandler();
                            // }
                        }}
                    >
                        <div className={classNames}>
                            <div className={component('drop', 'scroll')()} ref={scrollRef}>
                                <div>{children}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export {Body};
