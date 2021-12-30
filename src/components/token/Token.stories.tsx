import React, {useState} from 'react';
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
    return (
        <>
            <StoryTitle>Default Segmented Control</StoryTitle>
            <Token>123</Token>
            <Token disabled>123</Token>
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
