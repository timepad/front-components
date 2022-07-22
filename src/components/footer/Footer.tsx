import React, {useEffect, useMemo} from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';
import {Brick} from '../brick';
import {Divider} from '../list/Divider';
import {FooterLogo} from './FooterLogo';
import {FooterSocials} from './FooterSocials';
import {FooterCopyright} from './FooterCopyright';
import {FooterLinks} from './FooterLinks';
import {observer} from 'mobx-react';
import {FooterStore, MiscLinks} from './FooterStore';
import {FeedbackModal} from './Feedback/FeedbackModal';

export interface IMiscLinksProps {
    links: MiscLinks;
}

export const Footer: React.FC = observer(() => {
    const store = useMemo(() => new FooterStore(), []);
    useEffect(() => {
        store.fetchFooterData();
    }, []);
    return (
        <>
            <div className={component('footer')()}>
                <div className="lpage">
                    <Brick size={2} />
                    <FooterLogo />
                    <Brick size={1.5} />
                    <Divider />
                    <Brick size={1.5} />
                    <FooterLinks links={store.inlineLinks} />
                    <Brick />
                    <Divider />
                    <Brick />
                    <FooterSocials links={store.miscLinks} />
                    <Brick size={1.5} />
                    <Brick />
                    <FooterCopyright links={store.miscLinks} />
                    <Brick />
                </div>
            </div>
            <FeedbackModal
                feedbackStore={store.feedback}
                isOpen={store.modals.isFeedbackModalOpen}
                onClose={store.modals.toggleModal}
            />
        </>
    );
});
