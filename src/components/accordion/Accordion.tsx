import React, {FC, MouseEvent, useState} from 'react';
import {Row} from '../row';
import ArrowDown from '../../assets/svg/24/icon-arrow-down-24.svg';
import ArrowUp from '../../assets/svg/24/icon-arrow-up-24.svg';
import {component} from '../../services/helpers/classHelpers';
import {observer} from 'mobx-react';

interface IProps {
    text: string;
    status?: string;
}

export const Accordion: FC<IProps> = observer(({text = '', status, children}) => {
    const [open, setOpen] = useState(false);

    const Icon = open ? <ArrowUp /> : <ArrowDown />;

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setOpen(!open);
    };

    const accordionClasses = component(
        'accordion',
        'content',
    )({
        open,
    });

    return (
        <div className="caccordion">
            <Row ffFont horizontalPadding={0} onClick={handleClick}>
                <Row.Body>
                    <Row.Text className="caccordion__text">{text}</Row.Text>
                </Row.Body>
                <Row.Body className="caccordion__additional-text">
                    <Row.Text>{status}</Row.Text>
                </Row.Body>
                <Row.Icon>{Icon}</Row.Icon>
            </Row>
            <div className={accordionClasses}>{children}</div>
        </div>
    );
});
