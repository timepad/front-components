import React, {useState} from 'react';
import {Row} from '../row';
import InfoIcon from 'svg/24/icon-info-24.svg';
import CloseIcon from 'svg/24/icon-close-24.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';
import {Button, ButtonVariant} from '../button';

export enum BannerThemes {
    info = 'info',
    warning = 'warning',
}

interface IEnumprops {
    themes: Record<BannerThemes, string>;
}

interface IProps {
    theme?: string;
    closeable?: boolean;
    icon?: boolean;
}

export const Banner: React.FC<IProps> & IEnumprops = ({children, theme = Banner.themes.info, closeable, icon}) => {
    const [show, setShow] = useState(true);
    if (!show) return null;
    return (
        <Row className={component('banner')({theme})}>
            {icon && (
                <Row.Icon className={component('banner', 'icon')()}>
                    <InfoIcon />
                </Row.Icon>
            )}
            <Row.Body
                style={{paddingLeft: icon ? 0 : '16px', paddingRight: closeable ? 0 : '16px'}}
                className={component('banner', 'content')()}
            >
                {children}
            </Row.Body>
            {closeable && (
                <Row.Icon className={component('banner', 'icon')()}>
                    <Button onClick={() => setShow(false)} variant={ButtonVariant.transparent} icon={<CloseIcon />} />
                </Row.Icon>
            )}
        </Row>
    );
};

Banner.themes = BannerThemes;
