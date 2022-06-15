import React, {FC, useState, useEffect, useCallback, useRef} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import Token from './Token';
import './index.less';
import {TokenCreator} from './TokenCreator';

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    readonly?: boolean;
    values: string[];
    creatorValues?: string[];
    onTokenValuesChange: (values: string[]) => void;
}

export const TokenCell: FC<IProps> = ({
    readonly = false,
    values,
    creatorValues,
    onTokenValuesChange,
    className,
    ...props
}): JSX.Element => {
    const [internalTokenValues, setInternalTokenValues] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const baseClassName = 'token';

    const containerClassNames = cx(
        component(
            baseClassName,
            'container',
        )({
            readonly,
        }),
        className,
    );

    const handleAddToken = useCallback(
        (value: string) => {
            const newTokenValues = [...internalTokenValues, value];
            onTokenValuesChange(newTokenValues);
            containerRef.current?.focus();
        },
        [internalTokenValues, onTokenValuesChange],
    );

    const handleDeleteToken = (idx: number) => {
        const newTokenValues = [...internalTokenValues];
        newTokenValues.splice(idx, 1);
        onTokenValuesChange(newTokenValues);
        containerRef.current?.focus();
    };

    let height: number = 32;

    useEffect(() => {
        setInternalTokenValues(values);
        if (containerRef.current?.parentElement) {
            height = containerRef.current?.parentElement?.offsetHeight;
        }
    }, [values]);

    console.log(height);

    return (
        <div className={component(baseClassName, 'wrapper')()} style={{height: `${height}px`}}>
            <div className={containerClassNames} role="presentation" tabIndex={0} {...props} ref={containerRef}>
                <div className={component(baseClassName, 'list')()}>
                    {internalTokenValues &&
                        internalTokenValues.map((item, idx) => {
                            return (
                                <Token
                                    key={idx}
                                    disabled={readonly}
                                    value={item}
                                    onDelete={() => handleDeleteToken(idx)}
                                />
                            );
                        })}
                </div>

                {!readonly && <TokenCreator values={creatorValues} handleAddToken={handleAddToken} />}
            </div>
        </div>
    );
};
