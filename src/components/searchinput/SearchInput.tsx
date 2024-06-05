import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import './index.less';
import {ISearchInputProps} from './SearchInput.types';
import {Button} from '../button';
import {Text} from '../form/Text';
import CloseIcon from '../../assets/svg/24/icon-close-24.svg';
import BackIcon from '../../assets/svg/24/icon-arrow-tale-24.svg';
import SearchIcon from '../../assets/svg/24/icon-search-24.svg';
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
    className,
    autoFocus,
    placeholder,
    onBackButtonClick,
    isWide = true,
    id = 'search-input',
    autoComplete = 'off',
    withSearchIcon = false,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        const input = inputRef?.current;
        if (input && autoFocus) {
            input.focus();
            setIsFocus(true);
        }
    }, [inputRef, autoFocus]);

    const handleEscPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        inputRef?.current?.blur();
        onEscPress?.(event);
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onEnterPress?.(event);
    };

    const handleKeyDown = keyPressHelper([
        {key: 'Escape', callback: handleEscPress},
        {key: 'Enter', callback: handleEnterPress},
    ]);

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
        setIsFocus(false);
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(event);
        setIsFocus(true);
    };

    const handleResetButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        inputRef?.current?.focus();
        onReset?.(event);
    };

    const searchInputClassName = classNames(
        component(
            'search',
            'input',
        )({
            wide: value.length > 0 || isWide,
            fullscreen: showBackButton,
            ['with-search-icon']: withSearchIcon,
        }),
        className,
    );
    const resetBtnClassName = component(
        'search',
        'btn-close',
    )({
        visible: isFocus && value.length > 0,
        fullfill: value.length > 0,
    });

    return (
        <label htmlFor={id} className={searchInputClassName}>
            {showBackButton && (
                <Button icon={<BackIcon />} variant={Button.variant.transparent} onClick={onBackButtonClick} />
            )}

            {/*white modifier only for mdark-theme*/}
            {withSearchIcon && <SearchIcon className={component('search', 'search-icon')({white: value.length > 0})} />}

            <Text
                id={id}
                value={value}
                enterKeyHint="search"
                inputRef={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                placeholder={isWide ? placeholder : ''}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                {...props}
            />

            <Button
                icon={<CloseIcon />}
                variant={Button.variant.transparent}
                className={resetBtnClassName}
                onClick={handleResetButtonClick}
                tabIndex={-1}
            />
        </label>
    );
};
