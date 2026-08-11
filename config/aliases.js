const path = require('path');

// config/ всегда лежит в корне пакета (и в git, и в node_modules после установки по SHA)
const FC_ROOT = path.join(__dirname, '..');
const SRC_ROOT = path.join(FC_ROOT, 'src');

/**
 * Резолв точного импорта `front-components` в src/index.tsx (source-режим).
 * Deep-imports (`front-components/src/...`) не затрагиваются.
 *
 * Публичный API: import {Button, IconClose24, useMedia} from 'front-components'
 */
function aliases() {
    return {
        'front-components$': path.join(SRC_ROOT, 'index.tsx'),
    };
}

function includes() {
    return [SRC_ROOT];
}

module.exports = {aliases, includes, FC_ROOT, SRC_ROOT};
