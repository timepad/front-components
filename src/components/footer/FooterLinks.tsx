import React from 'react';
import {Grid} from '../grid';
import {Typography} from '../typography';
import {component} from '../../services/helpers/classHelpers';

export interface IFooterLinksProps {
    links: Array<IFooterLinksItem>;
}

export interface IFooterLinksItem {
    title: string;
    items: Record<string, string | (() => void)>;
}

export const FooterLinks: React.FC<IFooterLinksProps> = ({links}) => (
    <Grid rowGap={16}>
        {links.map((item, index) => (
            <Grid.Col desktop={3} tablet={3} mobile={1} key={index}>
                <Typography.Caption fontWeight="bold">{item.title}</Typography.Caption>
                {Object.entries(item.items).map(([name, action], index) => {
                    return (
                        <Typography.Caption key={index}>
                            <a
                                className={component('footer', 'link--inverse')()}
                                onClick={typeof action === 'function' ? action : undefined}
                                href={typeof action === 'string' ? action : undefined}
                            >
                                {name}
                            </a>
                        </Typography.Caption>
                    );
                })}
            </Grid.Col>
        ))}
    </Grid>
);
