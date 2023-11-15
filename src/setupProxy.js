const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

app.use(
    '/api',
        createProxyMiddleware({
            target: 'http://ec2-3-144-101-179.us-east-2.compute.amazonaws.com:8080',
            secure: false,
            changeOrigin: true,
        })
    );
    

};

