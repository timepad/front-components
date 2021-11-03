import React, {FC, useState} from 'react';
import {Row} from '../row';
import InfoIcon from '../../assets/svg/24/icon-info-circle-24.svg';
import ErrorIcon from '../../assets/svg/24/icon-error-24.svg';
import CloseIcon from '../../assets/svg/24/icon-close-24.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';
import {Button, ButtonVariant} from '../button';

type CloseClickHandler = () => void;

interface IBannerProps {
    theme?: string;
    closeable?: boolean;
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    onCloseClick?: CloseClickHandler;
}

export const Banner: FC<IBannerProps> = ({children, closeable = false, onCloseClick, icon}) => {
    const [show, setShow] = useState(true);
    if (!show) {
        return null;
    }

    const handleOnCloseClick = () => {
        if (onCloseClick) {
            setShow(false);
            onCloseClick();
        } else {
            setShow(false);
        }
    };

    return (
        <Row className={component('banner')()}>
            {icon && <Row.Icon className={component('banner', 'icon')()}>{icon}</Row.Icon>}
            <Row.Body className={component('banner', 'content')()}>{children}</Row.Body>
            {closeable && (
                <Row.Icon className={component('banner', 'icon')()}>
                    <Button
                        onClick={() => handleOnCloseClick()}
                        variant={ButtonVariant.transparent}
                        icon={<CloseIcon />}
                    />
                </Row.Icon>
            )}
        </Row>
    );
};

export const InfoBanner: FC<Omit<IBannerProps, 'icon'>> = (props) => {
    return <Banner {...props} icon={<InfoIcon />} />;
};

export const WarningBanner: FC<Omit<IBannerProps, 'icon'>> = (props) => {
    return <Banner {...props} icon={<ErrorIcon />} />;
};
