const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', {
            target: 'https://aip.baidubce.com',
            changeOrigin: true,
            pathRewrite: { '^/api1': '' }
        }),
    )
}
