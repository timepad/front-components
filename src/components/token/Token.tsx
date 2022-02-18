import React, {FC, useState, useEffect, useCallback} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import {TokenItem} from './TokenItem';
import './index.less';
import {TokenCreator} from './TokenCreator';

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    readonly?: boolean;
    values: string[];
    creatorValues?: string[];
    onTokenValuesChange: (values: string[]) => void;
}

export const Token: FC<IProps> = ({
    readonly = false,
    values,
    creatorValues,
    onTokenValuesChange,
    className,
    ...props
}): JSX.Element => {
    const [internalTokenValues, setInternalTokenValues] = useState<string[]>([]);
    const baseClassName = 'token';

    const containerClassNames = cx(
        component(baseClassName)({
            readonly,
        }),
        className,
    );

    const handleAddToken = useCallback(
        (value: string) => {
            const newTokenValues = [...internalTokenValues, value];
            onTokenValuesChange(newTokenValues);
        },
        [internalTokenValues, onTokenValuesChange],
    );

    const handleDeleteToken = (idx: number) => {
        const newTokenValues = [...internalTokenValues];
        newTokenValues.splice(idx, 1);
        onTokenValuesChange(newTokenValues);
    };

    const handleSetActiveToken = () => {
        console.log('active');
    };

    console.log(values);

    useEffect(() => {
        setInternalTokenValues(values);
    }, [values]);

    return (
        <div className={containerClassNames} role="presentation" {...props} onClick={handleSetActiveToken}>
            <div className={component(baseClassName, 'list')()}>
                {internalTokenValues &&
                    internalTokenValues.map((item, idx) => {
                        return (
                            <TokenItem
                                key={idx}
                                readonly={readonly}
                                tokenValue={item}
                                onDelete={() => handleDeleteToken(idx)}
                            />
                        );
                    })}
            </div>

            {!readonly && <TokenCreator values={creatorValues} handleAddToken={handleAddToken} />}
        </div>
    );
};
