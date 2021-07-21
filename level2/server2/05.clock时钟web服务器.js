/*
 * @Author: your name
 * @Date: 2021-05-09 09:53:09
 * @LastEditTime: 2021-07-13 12:58:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \4-代码d:\前端视频(宝贵!)\资料\第四阶段：前后端交互阶段资料新\第四阶段：前后端交互阶段资料新\node.js\day2（第4章5小节-第5章第2小节）\day2\code\05.clock时钟web服务器.js
 */
// 1.1 导入 http 模块
const http = require('http')
    // 1.2 导入 fs 模块
const fs = require('fs')
    // 1.3 导入 path 模块
const path = require('path')

// 2.1 创建 web 服务器
const server = http.createServer()
    // 2.2 监听 web 服务器的 request 事件
server.on('request', (req, res) => {
        // 3.1 获取到客户端请求的 URL 地址
        //     /clock/index.html
        //     /clock/index.css
        //     /clock/index.js
        const url = req.url
            // 3.2 把请求的 URL 地址映射为具体文件的存放路径
            // const fpath = path.join(__dirname, url)
            // 5.1 预定义一个空白的文件存放路径
        let fpath = ''
        if (url === '/') {
            fpath = path.join(__dirname, './clock/index.html')
        } else {

            //     /index.html
            //     /index.css
            //     /index.js
            fpath = path.join(__dirname, '/clock', url)
        }

        // 4.1 根据“映射”过来的文件路径读取文件的内容
        fs.readFile(fpath, 'utf8', (err, dataStr) => {
            // 4.2 读取失败，向客户端响应固定的“错误消息”
            if (err) return res.end('404 Not found.')
                // 4.3 读取成功，将读取成功的内容，响应给客户端
            res.end(dataStr)
        })
    })
    // 2.3 启动服务器
server.listen(3000, () => {
    console.log('server running at http://127.0.0.1:3000')
})