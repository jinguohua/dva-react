const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const proxy = require('http-proxy-middleware');

// 本地测试启动webpack打包
if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const config = require('./packconfig/dev.config');
    const webpackHotMiddleware = require('webpack-hot-middleware'); // HMR热更新中间件
    const compiler = webpack(config);
    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    // 挂载HMR热更新中间件
    app.use(webpackHotMiddleware(compiler));
}

app.use('/rms/res', express.static('dist'));


app.get(/rms/, function (req, res) {
    handleSendFile(req, res, 'dist/index.html');
});

function handleSendFile(req, res, file) {
    // 设置会话cookie
    if (process.env.NODE_ENV === 'development') {
        app.use(cookieParser());
        res.cookie('opsIsRememberMe', 'Bi2haNtXIbrV7OEO1pe4MgxtrQrzzUma')
        res.cookie('opsUserCookie', 'KBJWmQxma7xGXHyEU7ziC6SXNBOFFz7hkTb6ygfeiDjp395y59RQhQ==')
        //res.cookie('test', '测试');
    }
    res.sendFile(path.join(__dirname, file));
}

// 开发环境  使用代理并启动服务
if (process.env.NODE_ENV === 'development') {
    app.use(['/backend/'], proxy({
        target: 'http://pre.caibeike.net',  // 目标服务器 host
        // target: 'http://172.10.0.81:8082',
        // target: 'http://172.10.0.141:8080',
        changeOrigin: true         // 默认false，是否需要改变原始主机头为目标URL
    }));
}

app.listen(3202, function () {
    console.log('端口号3202');
});
