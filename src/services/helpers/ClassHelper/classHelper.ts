import {withNaming, Preset} from '@bem-react/classname';

/* Расшифровка пресета:
  n: префикс
  e: элемент
  m: модификатор
  v: значение

  Пример использования component:
  component('form', 'input')({error: true, ['input-type']: 'simple'}) =>
  "cform__input cform__input--error cform__input--input-type_simple",
  где input — элемент, error: true — модификатор, type: 'simple' — значение
*/
const defaultPreset: Preset = {
    e: '__',
    m: '--',
    v: '_',
};

const atomPreset: Preset = {...defaultPreset, n: 'a'};
const componentPreset: Preset = {...defaultPreset, n: 'c'};
const layoutPreset: Preset = {...defaultPreset, n: 'l'};
const moleculePreset: Preset = {...defaultPreset, n: 'm'};

export const cn = withNaming(defaultPreset);

export const atom = withNaming(atomPreset);
export const component = withNaming(componentPreset);
export const layout = withNaming(layoutPreset);
export const molecule = withNaming(moleculePreset);
