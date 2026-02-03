import React, {useLayoutEffect} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import {IconCheck24} from '../../../icons';
import './index.less';
import {uniqueId} from '../../../services/helpers/uniqueId';
import {ITextLightProps} from './TextLight.types';
import './index.less';
import {Input} from './Input';

const CSS_VAR_LABEL_SPACE = '--tl-label-space';
const CSS_VAR_ICON_SPACE = '--tl-icon-space';

const ICON_SPACE_PX = 32;
const LABEL_INPUT_GAP_PX = 8;

export const TextLight: React.FC<ITextLightProps> = ({
    customIcon = undefined,
    success = false,
    disabled = false,
    error = '',
    caption = '',
    name = '',
    id = uniqueId() + '_field_text_light',
    ...props
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const labelRef = React.useRef<HTMLLabelElement>(null);

    const labelText = !!error ? error : props.placeholder;

    const hasIcon = !!customIcon || success;

    useLayoutEffect(() => {
        const container = containerRef.current;
        const label = labelRef.current;
        if (!container || !label) return;

        let raf = 0;

        const measure = () => {
            if (raf) cancelAnimationFrame(raf);

            raf = requestAnimationFrame(() => {
                const labelHeight = Math.ceil(label.getBoundingClientRect().height);
                container.style.setProperty(CSS_VAR_LABEL_SPACE, `${labelHeight + LABEL_INPUT_GAP_PX}px`);
                container.style.setProperty(CSS_VAR_ICON_SPACE, hasIcon ? `${ICON_SPACE_PX}px` : '0px');
            });
        };

        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(container);
        ro.observe(label);

        window.addEventListener('resize', measure);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [labelText, hasIcon]);

    const inputClasses = cx(
        component('text-light', 'container')(),
        component(
            'text-light',
            'input',
        )({
            disabled,
            error: !!error,
            success,
        }),
    );
    const iconClasses = component('icon')();
    const inputIconClasses = component('text-light', 'container__icon')();
    const captionClasses = component(
        'text-light',
        'caption',
    )({
        error: !!error,
        disabled,
    });

    const style =
        customIcon || success ? {...props.style, padding: '0 32px 12px 0'} : {...props.style, padding: '0 0 12px 0'};

    return (
        <>
            <div className={inputClasses} ref={containerRef}>
                <Input name={name} id={id} disabled={disabled} style={style} {...props} />
                <label ref={labelRef} htmlFor={id}>
                    {labelText}
                </label>
                <span className={inputIconClasses}>
                    {customIcon ? customIcon : success && <IconCheck24 className={iconClasses} />}
                </span>
            </div>
            {!!caption && <div className={captionClasses}>{caption}</div>}
        </>
    );
};
