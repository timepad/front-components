import {PropsWithChildren} from 'react';
import * as React from 'react';

export const enum FORM_UNIT_SIZE {
    big = 'big',
}

export interface IUnitProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
    size?: FORM_UNIT_SIZE;
}
