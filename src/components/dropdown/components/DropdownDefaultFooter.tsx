import React, {FC} from 'react';
import {DropdownFooter} from './DropdownHeaderFooter';
import {Button, ButtonVariant} from '../../button';
import {component} from '../../../services/helpers/classHelpers';

interface IDefaultFooterProps {
    onCancel?: () => void;
    isMobile?: boolean;
}

export const DefaultFooter: FC<React.PropsWithChildren<IDefaultFooterProps>> = ({onCancel, isMobile}) => {
    return (
        <DropdownFooter down>
            <Button
                large
                variant={ButtonVariant.transparent}
                className={isMobile ? component('cancel-button', 'mobile')() : component('cancel-button', 'tablet')()}
                onClick={onCancel}
            >
                Отменить
            </Button>
        </DropdownFooter>
    );
};
