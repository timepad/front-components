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
    icon?: boolean | React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Banner: React.FC<IProps> = (props) => {
    const [show, setShow] = useState(true);
    if (!show) return null;
    const {children, closeable, icon} = props;

    const Icon = () => {
        if (typeof icon === 'boolean') {
            return <InfoIcon />;
        }

        if (((icon: IProps['icon']): icon is React.FC<React.SVGProps<SVGSVGElement>> => true)(props.icon)) {
            return <props.icon />;
        }
        return null;
    };

    return (
        <Row className={component('banner')()}>
            {icon && (
                <Row.Icon className={component('banner', 'icon')()}>
                    <Icon />
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
