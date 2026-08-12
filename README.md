## Команды

-   `npm i` — установить все зависимости.
-   `npm run storybook` — запускает локальную копию сторибука с dev-сервером, разрабатывать новые компоненты удобнее всего именно в ней.
-   `npm run lint` — проверка линтером обязательна перед пушем.
-   `npm run lint:fix` — запуск линтера с исправлением найденных проблем (разумеется только тех, которые можно исправить)

## Подключение в другой репозиторий

Подключение только через Git SHA (без `file:`).

### 1. Запушьте изменения в `front-components` и возьмите SHA

```bash
git push
git rev-parse HEAD
```

### 2. Укажите SHA в приложении

`ntp-web-app/package.json` или `otp/packages/front/package.json`:

```json
{
  "dependencies": {
    "front-components": "https://github.com/timepad/front-components.git#<commit-sha>"
  }
}
```

```bash
yarn install
```

### 3. Webpack (по желанию)

У ntp/otp исходники FC уже собираются через `allowTsInNodeModules`.  
Опционально можно подключить helper:

```js
// webpack.config.js
const fc = require('front-components/config');

module.exports = fc.applyTo(config, {
  tsconfig: 'tsconfig.json',
});
```

Less/SVG-правила должны включать `node_modules/front-components/src`. Нужен установленный `ts-loader`.

### 4. Импорты

```tsx
import {Button, IconClose24, useMedia, component, layout, Theme, keyPressHelper} from 'front-components';
```

Из `services` в публичный API: `component`, `layout`, `cn`, `Theme`, `useMedia`, `useScript`, `useMask`, `useClickOutside`, `keyPressHelper`.

### Tree-shaking

Иконки экспортируются как `export {default as IconX} from './icon-x.svg'`, поэтому неиспользуемые SVG отбрасываются production-сборкой приложения.

Не импортируйте `import * as Icons from 'front-components'` и не тяните `components/icons/icons.ts` в приложения — это снова соберёт весь набор.

## Линтер

Использование `@eslint-disable-next-line` допустимо, но на ревью от вас потребуется объяснение, почему иначе нельзя. Особенно это касается типизации с `any`.

## Файлы

```scheme
.storybook/          # конфигурация сторибука
src/
├── assets/
│   ├── css/         # LESS-код
│   │   │
│   │   ├── layout/         # компоненты разметки и сетки
│   │   ├── typo/           # типографика
│   │
├── components/      # ⚛️-компоненты, каждая папка внутри components должна иметь свой index с экспортами, а также файлы со стилями, хуками и storybook stories
├── services/
│   ├── helpers/     # хелперы
│   │   ├── classHelpers/     # хелперы для соблюдения согласий по селекторам в LESS
│   │   │── storyBookHelpers/ # хелперы для storybook
│   │
types/               # типы
```
