import React, {useEffect, useState} from 'react';

import './index.less';
import {ISearchInputProps} from './SearchInput.types';
import {Button} from '../../button';
import {Form} from '../Form';
import CloseIcon from '../../../assets/svg/24/icon-close-24.svg';
import BackIcon from '../../../assets/svg/24/icon-arrow-tale-24.svg';
import {keyPressHelper} from '../../../services/helpers/keyPressHelper';
import {component} from '../../../services/helpers/classHelpers';

export const SearchInput: React.FC<ISearchInputProps> = ({
    value,
    onBlur,
    onEnterPress,
    onEscPress,
    onReset,
    onFocus,
    onChange,
    showBackButton,
    inputRef,
    ...spread
}) => {
    const [inputWide, setInputWide] = useState(!!value); // показываем ли широкий вариант
    const [inputFocus, setInputFocus] = useState(false);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    };

    const searchStyles = component('searchbar__input')({
        wide: inputWide || value.length > 0,
        fullscreen: showBackButton,
    });
    const resetButtonStyles = component('searchbar__input__close')({
        visible: inputFocus && value.length > 0,
        fullfill: value.length > 0,
    });

    return (
        <div className={searchStyles}>
            {showBackButton && <Button icon={<BackIcon />} variant={Button.variant.transparent} />}

            <Form.Text
                inputRef={inputRef}
                id="search-bar"
                type="text"
                name="search"
                autoComplete="off"
                enterKeyHint="search"
                value={value}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...spread}
            />

            <Button
                icon={<CloseIcon />}
                variant={Button.variant.transparent}
                className={resetButtonStyles}
                onClick={handleInputReset}
            />
        </div>
    );
};
