import React from 'react';
import {Grid} from '../grid';
import AppstoreIcon from '../../assets/svg/stores/icon-appstore.svg';
import {Gap} from '../gap';
import GooglePlayIcon from '../../assets/svg/stores/icon-googleplay.svg';
import {CaptionGroup} from './CaptionGroup';
import {Button, ButtonVariant} from '../button';
import TelegramIcon from '../../assets/svg/32/icon-telegram.svg';
import VKIcon from '../../assets/svg/32/icon-vk.svg';
import {IMiscLinksProps} from './Footer';

export const FooterSocials: React.FC<IMiscLinksProps> = ({links}) => (
    <Grid rowGap={32}>
        <Grid.Col desktop={6}>
            <CaptionGroup
                text="Cкачайте Timepad Check-in для организаторов"
                caption={
                    <>
                        Проверяйте билеты на своих событиях быстрее. <br />
                        Отслеживайте участников. Никто не потеряется
                    </>
                }
            />
            <div className="lflex">
                <a href={links.apple} target="_blank" rel="noreferrer">
                    <AppstoreIcon />
                </a>
                <Gap size={0.5} />
                <a href={links.google} target="_blank" rel="noreferrer">
                    <GooglePlayIcon />
                </a>
            </div>
        </Grid.Col>
        <Grid.Col desktop={6}>
            <CaptionGroup
                text="Следите за новостями"
                caption={
                    <>
                        Присоединяйтесь к сообществу организаторов: <br />
                        делимся опытом, новостями и вдохновением.
                    </>
                }
            />
            <div className="lflex">
                <a href={links.vk} target="_blank" rel="noreferrer">
                    <Button variant={ButtonVariant.secondary} icon={<VKIcon />} large />
                </a>
                <Gap size={0.5} />
                <a href={links.telegram} target="_blank" rel="noreferrer">
                    <Button variant={ButtonVariant.secondary} icon={<TelegramIcon />} large />
                </a>
            </div>
        </Grid.Col>
    </Grid>
);
