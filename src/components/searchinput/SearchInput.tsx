import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import './index.less';
import {ISearchInputProps} from './SearchInput.types';
import {Button} from '../button';
import {Text} from '../form/Text';
import CloseIcon from '../../assets/svg/24/icon-close-24.svg';
import BackIcon from '../../assets/svg/24/icon-arrow-tale-24.svg';
import {keyPressHelper} from '../../services/helpers/keyPressHelper';
import {component} from '../../services/helpers/classHelpers';

export const SearchInput: React.FC<ISearchInputProps> = ({
    value,
    onBlur,
    onEnterPress,
    onEscPress,
    onReset,
    onFocus,
    showBackButton,
    inputRef,
    isWide = true,
    className,
    ...props
}) => {
    const [inputWide, setInputWide] = useState(!!value); // показываем ли широкий вариант
    const [inputFocus, setInputFocus] = useState(!value);

    // привязывем фокус к состоянию
    useEffect(() => {
        if (inputFocus) {
            inputRef?.current?.focus();
            onFocus?.();
        }
        if (!inputFocus) {
            inputRef?.current?.blur();
            onBlur?.();
        }
    }, [inputFocus, inputRef, onBlur, onFocus]);

    // обрабатываем Enter и Escape
    const handleEscPress = () => {
        setInputFocus(false);
        onEscPress?.();
    };

    const handleEnterPress = () => {
        if (value) {
            setInputFocus(false);
            onEnterPress?.(value);
        }
    };

    const handleKeyDown = keyPressHelper([
        {key: 'Escape', callback: handleEscPress},
        {key: 'Enter', callback: handleEnterPress},
    ]);

    // внутренние хендлеры
    const handleInputFocus = () => {
        setInputFocus(true);
        setInputWide(true);
    };

    const handleInputBlur = () => {
        if (!value) setInputWide(false);
        setInputFocus(false);
    };

    const handleInputReset = () => {
        setInputFocus(true); // чтобы не терять фокус
        onReset?.();
    };

    const searchClassName = classNames(
        component(
            'search',
            'input',
        )({
            wide: inputWide || value.length > 0 || isWide,
            fullscreen: showBackButton,
        }),
        className,
    );
    const resetBtnClassName = component(
        'search',
        'btn-close',
    )({
        visible: inputFocus && value.length > 0,
        fullfill: value.length > 0,
    });

    return (
        <div className={searchClassName}>
            {showBackButton && <Button icon={<BackIcon />} variant={Button.variant.transparent} />}

            <Text
                inputRef={inputRef}
                autoComplete="off"
                enterKeyHint="search"
                value={value}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...props}
            />

            <Button
                icon={<CloseIcon />}
                variant={Button.variant.transparent}
                className={resetBtnClassName}
                onClick={handleInputReset}
            />
        </div>
    );
};
