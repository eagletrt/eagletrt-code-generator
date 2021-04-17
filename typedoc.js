module.exports = {
    entryPoints: [
        './source/lib/index.ts'
    ],
    name: 'eagletrt-code-generator',
    excludeExternals: true,
    includeVersion: true,
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    excludePrivate: true,
    excludeProtected: true,
    disableSources: true,
    out: './docs/documentation/html'
};