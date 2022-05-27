import React from 'react';
import {Grid} from '../grid';
import AppstoreIcon from '../../assets/svg/stores/icon-appstore.svg';
import {Gap} from '../gap';
import GooglePlayIcon from '../../assets/svg/stores/icon-googleplay.svg';
import {CaptionGroup} from './CaptionGroup';
import {Button, ButtonVariant} from '../button';
import TelegramIcon from '../../assets/svg/32/icon-telegram.svg';
import VKIcon from '../../assets/svg/32/icon-vk.svg';

export const FooterSocials: React.FC = () => (
    <Grid>
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
                <AppstoreIcon />
                <Gap size={0.5} />
                <GooglePlayIcon />
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
                <a href="#" target="_blank">
                    <Button variant={ButtonVariant.secondary} icon={<VKIcon />} large />
                </a>
                <Gap size={0.5} />
                <a href="#" target="_blank">
                    <Button variant={ButtonVariant.secondary} icon={<TelegramIcon />} large />
                </a>
            </div>
        </Grid.Col>
    </Grid>
);
