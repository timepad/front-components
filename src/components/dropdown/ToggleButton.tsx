import * as React from 'react';
import {MutableRefObject, useContext} from 'react';
import {Button, IButtonProps} from '../button';
import {DropDownManagerContext} from './ManagerContext';

interface IToggleButton extends IButtonProps {
    customButton?: keyof JSX.IntrinsicElements;
}

export const ToggleButton: React.FC<IToggleButton> = ({customButton, children, ...props}) => {
    const context = useContext(DropDownManagerContext);
    if (!context) {
        return null;
    }
    const {toggle, ddBtnRef} = context;
    const handleClick = () => {
        toggle();
    };
    if (customButton) {
        const CustomButton: any = customButton;
        return (
            <CustomButton ref={ddBtnRef} onClick={handleClick} {...props}>
                {children}
            </CustomButton>
        );
    }
    return (
        <Button
            buttonRef={ddBtnRef as MutableRefObject<HTMLButtonElement> | undefined}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Button>
    );
};
