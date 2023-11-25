const query = require("./query");
const UserInfoIsOk = require("./UserInfoIsOk.js");
const CreateUserInfo = require("./CreateUserInfo");
const GetMusicInfo = require("./GetMusicInfo");
/**
 * 处理post请求，处理不同的业务逻辑
 * 拆分业务：1.查询业务；2.登录业务；3.注册业务；4.获取音乐业务
 * @param {Object} data 前端传递过来的数据
 * @param {Object} res  后端响应的数据
 * @returns 
 */
module.exports = async function post(data,res) {
    // 首先处理音乐业务
    if(data.BusinessEvents === "getmusic"){
        // 查询是否有改音乐
        if(await query(data.musicname,"../musicinfo")){
            // 获取音乐业务
            const musicinfo = JSON.parse(await GetMusicInfo(data,"../musicinfo"))
            res.end(JSON.stringify({status:true,r:musicinfo}))
        }else{
            // 音乐不存在
            res.end(JSON.stringify({status:false,info:"音乐不存在"}))
        }
    }
    // 处理完音乐业务后，处理其他业务
    if(await query(data.username,"../user")){
        switch(data.BusinessEvents){
            case "login":
                const status = await UserInfoIsOk(data,"../user");
                res.end(JSON.stringify(status))
                break;
            case "regin":
                res.end(JSON.stringify({status:false,info:"该用户已存在"}))
                break;
            default:
                res.end(JSON.stringify({message:"未知的业务"}))
        }
    }else{
        if(data.BusinessEvents === "regin"){
            const status = await CreateUserInfo(data,"../user");
            return res.end(JSON.stringify(status))
        }
        res.end(JSON.stringify({status:false,info:"用户不存在"}))
    }
}