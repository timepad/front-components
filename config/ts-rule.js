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

module.exports = {makeTsRule, excludeFrontComponentsFrom};
