import React, {useEffect} from 'react';
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
    className,
    autoFocus,
    placeholder,
    onBackButtonClick,
    isWide = true,
    id = 'search-input',
    autoComplete = 'off',
    ...props
}) => {
    useEffect(() => {
        const input = inputRef?.current;
        if (input && autoFocus) {
            input.focus();
            return () => input.blur();
        }
    }, [inputRef, autoFocus]);

    const handleKeyDown = keyPressHelper([
        {key: 'Escape', callback: onEscPress},
        {key: 'Enter', callback: onEnterPress},
    ]);

    const searchInputClassName = classNames(
        component(
            'search',
            'input',
        )({
            wide: value.length > 0 || isWide,
            fullscreen: showBackButton,
        }),
        className,
    );
    const resetBtnClassName = component(
        'search',
        'btn-close',
    )({
        fullfill: value.length > 0,
    });

    return (
        <label htmlFor={id} className={searchInputClassName}>
            {showBackButton && (
                <Button icon={<BackIcon />} variant={Button.variant.transparent} onClick={onBackButtonClick} />
            )}

            <Text
                id={id}
                value={value}
                enterKeyHint="search"
                inputRef={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
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
                onClick={onReset}
            />
        </label>
    );
};
