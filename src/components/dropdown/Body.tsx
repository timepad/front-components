import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PropsWithChildren, useContext} from 'react';
import {Theme} from '../utility/Modifiers';
import {Button} from '../button';
import {DropDownManagerContext} from './ManagerContext';
import {component} from '../../services/helpers/classHelpers';

interface IProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
    className?: string;
}

export const Body: React.FC<IProps> = ({children, className}) => {
    const classNames = className ? className : component('drop', 'list')();
    const context = useContext(DropDownManagerContext);

    if (!context) {
        return null;
    }
    const {
        show,
        ddRef,
        doNotCloseMobileDDOnAnyClick,
        onCloseHandler,
        setScrolledToBottom,
        ddListRef,
        white,
        dropClassName,
    } = context;
    return ReactDOM.createPortal(
        <div className={component('drop-bg')()}>
            <div
                className={component('drop-animate')({
                    show: show,
                })}
            >
                {show && (
                    <div
                        className={classNames}
                        onClick={(e: React.MouseEvent) => {
                            if (doNotCloseMobileDDOnAnyClick) {
                                e.target === e.currentTarget && onCloseHandler();
                            } else {
                                onCloseHandler();
                            }
                        }}
                    >
                        <div className={dropClassName} ref={ddRef}>
                            <div
                                className={component('drop', 'scroll')()}
                                onScroll={(event) => {
                                    // set scroll bottom flag just before actually scroll to bottom,
                                    // f.e. there is a possible situation when scrolled to buttom, but
                                    // event.currentTarget.scrollTop less than (event.currentTarget.scrollHeight - event.currentTarget.offsetHeight)
                                    // in 1px
                                    setScrolledToBottom(
                                        event.currentTarget.scrollTop + 10 >=
                                            event.currentTarget.scrollHeight - event.currentTarget.offsetHeight,
                                    );
                                    // prevent extra scroll
                                    if (event.currentTarget.scrollTop < 0) {
                                        event.currentTarget.scrollTop = 0;
                                    } else if (
                                        event.currentTarget.scrollTop >
                                        event.currentTarget.scrollHeight - event.currentTarget.offsetHeight
                                    ) {
                                        event.currentTarget.scrollTop =
                                            event.currentTarget.scrollHeight - event.currentTarget.offsetHeight;
                                    }
                                    // --
                                }}
                            >
                                <div ref={ddListRef}>{children}</div>
                            </div>
                            <div className="hidden-desktop hidden-tablet">
                                <Theme dark={!white}>
                                    <div className={component('drop', 'hr-wrapper')()}>
                                        <span className={component('drop', 'hr')()} />
                                    </div>
                                    <div className={component('drop', 'cancel')()}>
                                        <div className={component('drop', 'cancel-wrapper')()}>
                                            <Button
                                                label="Отменить"
                                                variant={Button.variant.transparent}
                                                onClick={onCloseHandler}
                                                fixed
                                            />
                                        </div>
                                    </div>
                                </Theme>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
};
