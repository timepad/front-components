/* eslint-disable prettier/prettier */
import React, {useState, useCallback} from 'react';
import {IStorybookComponent, StoryTitle, StoryDescription} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {Token} from './index';

import 'css/bundle.less';

export default {
    title: 'Token',
    component: Token,
} as Meta;

const themes = {
    default: {
        title: 'Default theme',
        containerClasses: [],
    },
    light: {
        title: 'Light theme',
        containerClasses: ['mtheme--lightpic'],
    },
    dark: {
        title: 'Dark theme',
        containerClasses: ['mtheme--darkpic'],
    },
};

export const Default: IStorybookComponent = () => {
    const [values, setValues] = useState(['444', '555']);

    const handleTokenValuesChange = (newTokenValues: string[]) => {
        console.log('tokenValues before', values, 'newTokenValues', newTokenValues);
        setValues(newTokenValues);
    };

    return (
        <>
            <StoryTitle>Default Segmented Control</StoryTitle>
            <Token
                values={values}
                creatorValues={['123', '321', '333']}
                onTokenValuesChange={handleTokenValuesChange}
            />
        </>
    );
};

// export const Light: IStorybookComponent = () => {
//     return (
//         <>
//             <StoryTitle>Light Segmented Control</StoryTitle>
//             <div className={themes['light'].containerClasses.join(' ')}>123</div>
//         </>
//     );
// };

// export const Dark: IStorybookComponent = () => {
//     return (
//         <>
//             <StoryTitle>Dark Segmented Control</StoryTitle>
//             <div className={themes['dark'].containerClasses.join(' ')}>
//                 <div className="mtheme__typo mtheme--bg--demo">
//                     <div className="lbrick-2"></div>
//                     <div className="lflex">
//                         <div className="lgap-4-0"></div>
//                         <div className="lflex--y-axis" style={{flexGrow: 1}}>
//                             123
//                         </div>
//                         <div className="lgap-4-0"></div>
//                     </div>
//                     <div className="lbrick-2"></div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export const CustomClick: IStorybookComponent = () => {
//     return (
//         <>
//             <StoryTitle>Custom click Segmented Control</StoryTitle>
//             <StoryDescription>
//                 This control will log <b>controlId</b> to console on click.
//             </StoryDescription>
//             123
//         </>
//     );
// };
