import React, {FC} from 'react';
import {IFormSelectProps} from './FormSelect.types';

export const FormSelect: FC<IFormSelectProps> = (props) => {
    return (
        <select>
            <option>1</option>
            <option>2</option>
        </select>
    );
};
