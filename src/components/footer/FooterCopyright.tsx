import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import {Typography} from '../typography';
import {IMiscLinksProps} from './Footer';

export const FooterCopyright: React.FC<IMiscLinksProps> = ({links}) => (
    <Typography.Small>
        © ООО «ТаймПэд Лтд» 2008–2022 <br />
        Продолжая работу с нашим сайтом, вы подтверждаете согласие с{' '}
        <a href={links.rules} className={component('footer', 'link')()}>
            правилами его использования
        </a>
    </Typography.Small>
);
