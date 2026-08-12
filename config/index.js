const {aliases, includes} = require('./aliases');
const {makeTsRule, excludeFrontComponentsFrom, usesTsLoader} = require('./ts-rule');

/**
 * Подключает ts-loader для исходников front-components.
 * Импорты идут из одного entrypoint: `import {...} from 'front-components'`.
 *
 * @example
 * const fc = require('front-components/config');
 * module.exports = fc.applyTo(config, {tsconfig: 'tsconfig.json'});
 */
function applyTo(config, {tsconfig} = {}) {
    config.resolve = config.resolve || {};
    // гарантируем резолв пакета на src (source-режим)
    config.resolve.alias = {
        ...(config.resolve.alias || {}),
        ...aliases(),
    };

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.unshift(makeTsRule({tsconfig}));

    config.module.rules = config.module.rules.map((rule) => {
        return usesTsLoader(rule) ? excludeFrontComponentsFrom({...rule}) : rule;
    });

    return config;
}

module.exports = {
    applyTo,
    aliases,
    includes,
    makeTsRule,
    excludeFrontComponentsFrom,
    usesTsLoader,
};
