import React, {FC} from 'react';
import {component} from '../../services/helpers/classHelpers';
import {Dropdown} from '../dropdown';
import {Button, ButtonVariant} from '../button';
import {List} from '../list';
import AddIcon from 'svg/24/icon-plus-24.svg';

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    values?: string[];
    handleAddToken: (value: string) => void;
}

export const TokenCreator: FC<IProps> = ({values, handleAddToken, ...props}): JSX.Element => {
    const baseClassName = 'token';
    return (
        <div className={component(baseClassName, 'creator')()}>
            <Dropdown {...props} trigger={() => <Button variant={ButtonVariant.stroke} icon={<AddIcon />}  />}>
                <List variant="dark" size="lg">
                    {values &&
                        values.map((item, index) => {
                            return (
                                <List.Item key={index} onClick={() => handleAddToken(item)}>
                                    {item}
                                </List.Item>
                            );
                        })}
                </List>
            </Dropdown>
        </div>
    );
};
