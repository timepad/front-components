import React from 'react';
import {Grid} from '../grid';
import {Typography} from '../typography';
import {component} from '../../services/helpers/classHelpers';

export interface IFooterLinksItem {
    title: string;
    items: Array<string>;
}

interface IFooterLinksProps {
    links: Array<IFooterLinksItem>;
}

export const FooterLinks: React.FC<IFooterLinksProps> = ({links}) => (
    <Grid rowGap={16}>
        {links.map((item, index) => (
            <Grid.Col desktop={3} tablet={3} mobile={1} key={index}>
                <Typography.Caption fontWeight="bold">{item.title}</Typography.Caption>
                {item.items.map((link, index) => (
                    <Typography.Caption key={index}>
                        <a className={component('footer', 'link--inverse')()} href="#">
                            {link}
                        </a>
                    </Typography.Caption>
                ))}
            </Grid.Col>
        ))}
    </Grid>
);
