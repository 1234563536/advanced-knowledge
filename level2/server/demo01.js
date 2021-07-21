/*
 * @Author: your name
 * @Date: 2021-07-13 10:52:08
 * @LastEditTime: 2021-07-13 15:30:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \4-代码d:\前端视频(宝贵!)\资料\第四阶段：前后端交互阶段资料新\第四阶段：前后端交互阶段资料新\node.js\day3（第5章3小节-第6章1小节）\server\http.js
 */
// server/http.js
const http = require('http')
const fs = require('fs')
const path = require('path')
const queryString = require('querystring')
const scoreData = require('./data.json')
let server = http.createServer()
server.on('request', function(req, res) {
    if (req.url == '/query' && req.method == 'GET') {
        fs.readFile(path.join(__dirname, 'view', 'index.tql'), function(err, content) {
            res.end(content)
        })
    } else if (req.url == '/score' && req.method == 'POST') {
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        let pdata = ''
        req.on('data', (chunk) => {
            pdata += chunk;
        })
        req.on('end', function() {
                let obj = queryString.parse(pdata);
                // console.log(obj);  {code:'no123'}
                // 将 obj对象下code属性 获取到code对应的值
                let result = scoreData[obj.code];
                console.log(result);
                // 将返回的结果 result   写在  页面中
                // 要想写在页面 就得通过fs文件系统 读取 result.tpl模板文件
                fs.readFile(path.join(__dirname, 'view', 'result.tql'), (err, content) => {
                    // console.log(content);   buffer类型
                    if (err) {

                        res.end('服务器错误,请与管理员来联系')
                    } else {


                        // 因为replace() 方法 只有字符串有  所以 要将buffer转换为字符串
                        content = content + "";
                        content = content.replace('$$chinses$$', result.chinses);
                        content = content.replace('$$chinses$$', result.chinses);
                        content = content.replace('$$math$$', result.math);
                        content = content.replace('$$english$$', result.english);
                        content = content.replace('$$summary$$', result.summary);
                        res.end(content)
                    }
                })

            })
            // res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' })
            //这两个请求头有区别，上面的请求头可以区别里面的HTML特殊标签，下面的plain就不能识别html标签，请牢记
    } else if (req.url = '/img') {
        fs.readFile(path.join(__dirname, 'view', 'a.jpg'), function(err, content) {
            res.end(content);
        })
    }
})
server.listen(5000, function() {
    console.log('running...')
})