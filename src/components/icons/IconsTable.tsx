import React, {FunctionComponent, SVGProps} from 'react';
import {component} from '../../services/helpers/classHelpers';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';

import './index.less';
export interface IIconProps {
    SVGSrc: FunctionComponent<SVGProps<SVGSVGElement>>;
    title: string;
}

interface IIconsProps {
    titleTable: string;
    icons: IIconProps[];
}

export const IconsTable: React.FC<IIconsProps> = ({titleTable, icons}) => {
    return (
        <>
            <StoryTitle>{`Таблица SVG Картинок ${titleTable}`}</StoryTitle>
            <table className={component('icons', 'table')()}>
                <thead>
                    <tr>
                        <th className={component('icons', 'item')()}>Изображение</th>
                        <th className={component('icons', 'item')()}>Название</th>
                        <th className={component('icons', 'item')()}>Импорт</th>
                    </tr>
                </thead>
                <tbody>
                    {icons.map((icon, index) => {
                        const iconName = icon.SVGSrc.name.replace('Svg', '');
                        return (
                            <tr key={index}>
                                <td className={component('icons', 'item')()}>
                                    <icon.SVGSrc />
                                </td>
                                <td className={component('icons', 'item')()}>{icon.title}</td>
                                <td
                                    className={component('icons', 'item')()}
                                >{`import { ${iconName} } from "front-components/src/icon"; `}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
