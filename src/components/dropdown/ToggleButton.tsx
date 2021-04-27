import * as React from 'react';
import {useContext} from 'react';
import {Button} from '../button';
import {DropDownManagerContext} from './ManagerContext';

export const ToggleButton = ({customButton, children, ...props}: any) => {
    const context = useContext(DropDownManagerContext);
    if (!context) {
        return null;
    }
    const {toggle, ddBtnRef} = context;
    const handleClick = () => {
        toggle();
    };
    if (customButton) {
        const CustomButton = customButton;
        return (
            <CustomButton ref={ddBtnRef} onClick={handleClick} {...props}>
                {children}
            </CustomButton>
        );
    }
    return (
        <Button buttonRef={ddBtnRef} onClick={handleClick} {...props}>
            {children}
        </Button>
    );
};
