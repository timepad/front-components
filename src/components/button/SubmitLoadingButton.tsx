import React, {FC} from 'react';
import {Button, IButtonProps} from './Button';
import {SpinLoaderWrapper} from '../loader';
import {observer} from 'mobx-react';

export interface ISubmitLoadingButtonProps extends IButtonProps {
    label?: string;
    loading?: boolean;
}

export const SubmitButton: FC<ISubmitLoadingButtonProps> = observer(({label, loading, disabled, ...props}) => {
    return (
        <Button disabled={loading || disabled} variant={Button.variant.primary} type="submit" fixed large {...props}>
            <SpinLoaderWrapper isLoading={!!loading}>{label || 'Сохранить'}</SpinLoaderWrapper>
        </Button>
    );
});
