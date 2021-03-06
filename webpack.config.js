const path = require('path');
const glob = require('glob')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const DtsBundleWebpack = require('dts-bundle-webpack');

const generatorsEntryFiles = glob
    .sync('./source/lib/generators/**/*.generator.ts')
    .reduce(
        (result, filePath) => ({ ...result, [path.basename(filePath, path.extname(filePath))]: filePath })
        , {});

const generatorsConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: generatorsEntryFiles,
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compiler: 'ttypescript'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin(['IS_WEBPACK'])
    ],
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'lib', 'generators'),
        filename: '[name].js',
        library: '@eagletrt/code-generator',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    }
};

const libConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/lib/index.ts',
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compiler: 'ttypescript'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DtsBundleWebpack({
            name: '@eagletrt/code-generator',
            main: 'dist/source/lib/index.d.ts',
            out: '../../../bundled/lib/index.d.ts'
        }),
        new webpack.EnvironmentPlugin(['IS_WEBPACK'])
    ],
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'lib'),
        filename: 'index.js',
        library: '@eagletrt/code-generator',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

const commandsConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: path.join(__dirname, 'source', 'bin', 'commands', 'index.ts')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compiler: 'ttypescript'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DtsBundleWebpack({
            name: '@eagletrt/code-generator/bundled/bin/commands',
            main: 'dist/source/bin/commands/index.d.ts',
            out: '../../../../bundled/bin/commands/index.d.ts'
        }),
        new webpack.EnvironmentPlugin(['IS_WEBPACK'])
    ],
    externals: [{
        // @lib
        '../../lib/index': {
            amd: '../../lib/index.js',
            root: '@eagletrt/code-generator',
            commonjs: '../../lib/index.js',
            commonjs2: '../../lib/index.js'
        }
    }, nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'bin', 'commands'),
        filename: 'index.js',
        library: '@eagletrt/code-generator/bundled/bin/commands',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

const binConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/bin/index.ts',
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
        new webpack.EnvironmentPlugin(['IS_WEBPACK'])
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compiler: 'ttypescript'
                        }
                    },
                    {
                        loader: 'shebang-loader'
                    }
                ]
            }
        ]
    },
    externals: [{
        // @/bin/commands
        './commands/index': {
            amd: './commands/index.js',
            root: '@eagletrt/code-generator/bundled/bin/commands',
            commonjs: './commands/index.js',
            commonjs2: './commands/index.js'
        }
    }, nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'bin'),
        filename: 'index.js',
        library: '@eagletrt/code-generator/bundled/bin',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

module.exports = [
    generatorsConfig,
    commandsConfig,
    libConfig,
    binConfig
];