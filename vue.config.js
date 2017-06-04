module.exports = {
    port: 80,
    html: {
        template: './index.html',
    },
    filename: {
        js: "js/[name].js",
        css: "css/[name].css",
        static: "assets/[name].[chunkhash].[ext]",
    },
};