import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import {Typography} from '../typography';

export const FooterCopyright: React.FC = () => (
    <Typography.Small>
        © ООО «ТаймПэд Лтд» 2008–2022 <br />
        Продолжая работу с нашим сайтом, вы подтверждаете согласие с{' '}
        <a href="#" className={component('footer', 'link')()}>
            правилами его использования
        </a>
    </Typography.Small>
);
