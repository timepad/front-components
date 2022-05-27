import React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';
import {Brick} from '../brick';
import {Divider} from '../list/Divider';
import {FooterLogo} from './FooterLogo';
import {FooterSocials} from './FooterSocials';
import {FooterCopyright} from './FooterCopyright';
import {FooterLinks, IFooterLinksItem} from './FooterLinks';

interface IFooterProps {
    links: Array<IFooterLinksItem>;
}

export const Footer: React.FC<IFooterProps> = ({links}) => {
    return (
        <div className={component('footer')()}>
            <div className="lpage">
                <Brick size={2} />
                <FooterLogo />
                <Brick size={1.5} />
                <Divider />
                <Brick size={1.5} />
                <FooterLinks links={links} />
                <Brick />
                <Divider />
                <Brick />
                <FooterSocials />
                <Brick size={1.5} />
                <Brick />
                <FooterCopyright />
                <Brick />
            </div>
        </div>
    );
};
