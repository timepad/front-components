import * as React from 'react';
import {useContext} from 'react';
import {Button, IButtonProps} from '../button';
import {DropDownManagerContext} from './ManagerContext';
import {mergeRefs} from '../../services/helpers/mergeRefs';

interface IToggleButton extends IButtonProps {
    customButton?: keyof JSX.IntrinsicElements;
}

export const ToggleButton: React.FC<IToggleButton> = ({customButton, buttonRef, children, ...props}) => {
    const context = useContext(DropDownManagerContext);
    if (!context) {
        return null;
    }
    const {toggle, setReferenceElement} = context;
    const handleClick = () => {
        toggle();
    };
    if (customButton) {
        const CustomButton: any = customButton;
        return (
            <CustomButton buttonRef={mergeRefs([setReferenceElement, buttonRef])} onClick={handleClick} {...props}>
                {children}
            </CustomButton>
        );
    }
    return (
        <Button buttonRef={mergeRefs([setReferenceElement, buttonRef])} onClick={handleClick} {...props}>
            {children}
        </Button>
    );
};
