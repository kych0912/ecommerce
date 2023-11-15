const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

app.use(
    '/api',
        createProxyMiddleware({
            target: 'https://test.runninglife.co.kr',
            changeOrigin: true,
        })
    );
    
app.use(
    'https://dj80obdkys5rw.cloudfront.net/api',
        createProxyMiddleware({
            target: 'https://test.runninglife.co.kr',
            changeOrigin: true,
        })
    );
};

