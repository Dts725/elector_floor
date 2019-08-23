module.exports = {
    productionSourceMap: false,
    assetsDir: '',
    outputDir: 'floor_map',
    publicPath: './',

    devServer: {
        port: 8081,
        host: '0.0.0.0',
        open: true
    },

    configureWebpack: {
        externals: {
            'AMap': 'AMap',
        },

    },

    lintOnSave: false
}