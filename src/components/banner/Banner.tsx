import React, {useState} from 'react';
import {Row} from '../row';
import InfoIcon from '../../assets/svg/24/icon-info-circle-24.svg';
import CloseIcon from '../../assets/svg/24/icon-close-24.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';
import {Button, ButtonVariant} from '../button';

interface IProps {
    theme?: string;
    closeable?: boolean;
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>> | boolean;
}

export const Banner: React.FC<IProps> = ({children, closeable = false, icon}) => {
    const [show, setShow] = useState(true);
    if (!show) {
        return null;
    }

    return (
        <Row className={component('banner')()}>
            {icon && (
                <Row.Icon className={component('banner', 'icon')()}>
                    <BannerIcon icon={icon} />
                </Row.Icon>
            )}
            <Row.Body className={component('banner', 'content')()}>{children}</Row.Body>
            {closeable && (
                <Row.Icon className={component('banner', 'icon')()}>
                    <Button onClick={() => setShow(false)} variant={ButtonVariant.transparent} icon={<CloseIcon />} />
                </Row.Icon>
            )}
        </Row>
    );
};

const BannerIcon: React.FC<{icon: React.ReactElement<React.SVGProps<SVGSVGElement>> | boolean}> = ({icon}) => {
    if (icon) {
        if (typeof icon === 'boolean') {
            return <InfoIcon />;
        }
        return icon;
    }
    return null;
};
