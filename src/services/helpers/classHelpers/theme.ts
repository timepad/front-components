import {Preset, withNaming} from '@bem-react/classname';
import {defaultPreset} from './classHelper';

export enum Theme {
    default = 'default',
    darkpic = 'darkpic',
    lightpic = 'lightpic',
}

// DON'T USE!!! DEPRICATED!!! Нужно только для поддержки старых классов тем.
const moleculePreset: Preset = {...defaultPreset, n: 'm'};
const molecule = withNaming(moleculePreset);

export const getThemeClassName = (theme: Theme): string => {
    return molecule('theme')({theme});
};
