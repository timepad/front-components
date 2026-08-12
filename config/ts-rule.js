const {includes} = require('./aliases');

function makeTsRule(opts = {}) {
    const {tsconfig, transpileOnly = true, test = /\.[jt]sx?$/} = opts;

    return {
        test,
        include: includes(),
        loader: 'ts-loader',
        options: {
            allowTsInNodeModules: true,
            transpileOnly,
            ...(tsconfig ? {configFile: tsconfig} : {}),
        },
    };
}

function excludeFrontComponentsFrom(rule) {
    const inc = includes();
    const prev = Array.isArray(rule.exclude) ? rule.exclude : rule.exclude ? [rule.exclude] : [];
    rule.exclude = [...prev, ...inc];
    return rule;
}

function usesTsLoader(rule) {
    if (!rule) return false;
    if (rule.loader === 'ts-loader') return true;
    const use = rule.use;
    if (!use) return false;
    const list = Array.isArray(use) ? use : [use];
    return list.some((u) => u === 'ts-loader' || (u && u.loader === 'ts-loader'));
}

module.exports = {makeTsRule, excludeFrontComponentsFrom, usesTsLoader};
