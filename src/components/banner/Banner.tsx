import React, {useState} from 'react';
import {Row} from '../row';
import InfoIcon from '../../assets/svg/24/icon-info-24.svg';
import CloseIcon from '../../assets/svg/24/icon-close-24.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';
import {Button, ButtonVariant} from '../button';

interface IProps {
    theme?: string;
    closeable?: boolean;
    withIcon?: boolean;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Banner: React.FC<IProps> = (props) => {
    const [show, setShow] = useState(true);
    if (!show) return null;
    const {children, closeable, icon, withIcon} = props;

    const Icon = () => {
        if (props.icon) {
            return <props.icon />;
        }
        if (withIcon) {
            return <InfoIcon />;
        }

        return null;
    };

    // TODO: Временное решение. Исправить в будующем в самом row. Сделать row мод multiline.
    const BodyStyle = {paddingLeft: icon ? 0 : '16px', paddingRight: closeable ? 0 : '16px'};

    return (
        <Row className={component('banner')()}>
            {icon && (
                <Row.Icon className={component('banner', 'icon')()}>
                    <Icon />
                </Row.Icon>
            )}
            <Row.Body style={BodyStyle} className={component('banner', 'content')()}>
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
