import React, {FunctionComponent, SVGProps} from 'react';
import {component} from '../../services/helpers/classHelpers';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';

import './index.less';
export interface ICollectionSVGProps {
    SVGSrc: FunctionComponent<SVGProps<SVGSVGElement>>;
    title: string;
}

export interface ICollectionsSVGProps {
    titleTable: string;
    collectionsSVG: ICollectionSVGProps[];
}

export const CollectionTable: React.FC<ICollectionsSVGProps> = ({titleTable, collectionsSVG}) => {
    return (
        <>
            <StoryTitle>{`Таблица SVG Картинок ${titleTable}`}</StoryTitle>
            <table className={component('collection-svg', 'table')()}>
                <thead>
                    <tr>
                        <th className={component('collection-svg', 'item')()}>Изображение</th>
                        <th className={component('collection-svg', 'item')()}>Название</th>
                        <th className={component('collection-svg', 'item')()}>Импорт</th>
                    </tr>
                </thead>
                <tbody>
                    {collectionsSVG.map((icon, index) => {
                        const iconName = icon.SVGSrc.name.replace('Svg', '');
                        return (
                            <tr key={index}>
                                <td className={component('collection-svg', 'item')()}>
                                    <icon.SVGSrc />
                                </td>
                                <td className={component('collection-svg', 'item')()}>{icon.title}</td>
                                <td
                                    className={component('collection-svg', 'item')()}
                                >{`import { ${iconName} } from "front-components/src/icon"; `}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
