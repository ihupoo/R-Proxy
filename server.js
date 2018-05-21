const express = require('express')
const proxy = require('http-proxy-middleware')

let app = express()

app.use(express.static("./public")); //静态文件

/** 
 * 参照 https://www.jianshu.com/p/a248b146c55a 
 * 请求localhost：8080/api 相当于 请求了 http://www.example.org/api 
 * proxy有更多options配置，
 * 如 
 *     ws:true //代理websocket
 *     pathRewrite: {
 *          '^/api/delete': '/api/remove' // 重写请求，比如我们源访问的是api/delete，那么请求会被解析为/api/remove
 *     },
 *     router: {
 *         'staging.localhost:3000': 'http://localhost:8002', //重新指定请求转发目标，比如 请求staging.localhost:3000 则 请求http://localhost:8002 而不是http://www.example.org
 *         'localhost:3000/api': 'http://localhost:8003',
 *     }
 */

app.use('/api', proxy({
    target: "http://www.example.org", //目标路径
    changeOrigin: true
}))

app.listen(8080)