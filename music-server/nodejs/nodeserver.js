const http = require("http");
const server = http.createServer();
const url = require("url");
const ReceiveData = require("./ReceiveData");
const getMusic = require("./getMusic");
const post = require("./post");

const port = 8080;
server.listen(port, () => {
    console.log(`服务已开启，请访问：http://127.0.0.1:${port}`);
})

server.on("request", async (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-type", "application/json;text/plain;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    switch (req.method) {
        case "GET":
            const q = url.parse(req.url, true);
            getMusic(q.path, res);
            break;
        case "POST":
            // 接收参数
            const webData = await ReceiveData(req);
            post(webData, res)
            break;
        default:
            res.end("您的请求方法错误");
            break
    }
})