module.exports = {
    entryPoints: [
        './source'
    ],
    name: 'eagletrt-code-generator - DEV',
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    out: './docs/documentation/html-dev'
};