import React, {FC} from 'react';
import {DropdownFooter} from './DropdownHeaderFooter';
import {Button, ButtonVariant} from '../../button';
import {component} from '../../../services/helpers/classHelpers';

interface IDefaultFooterProps {
    onCancel?: () => void;
}

export const DefaultFooter: FC<React.PropsWithChildren<IDefaultFooterProps>> = ({onCancel}) => {
    return (
        <DropdownFooter down>
            <Button
                large
                variant={ButtonVariant.transparent}
                className={component('cancel-button', 'mobile')()}
                onClick={onCancel}
            >
                Отменить
            </Button>
        </DropdownFooter>
    );
};
