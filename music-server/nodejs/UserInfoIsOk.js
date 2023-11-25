const fs = require("fs");
/**
 * 
 * @param {前端传递过来的数据} webData 
 * @param {路径} path 
 */
module.exports = function UserInfoIsOk(webData,path){
    return new Promise((resolve,reject)=>{
        // 读取文件数据
        fs.readFile(`${path}/${webData.username}.json`,"utf-8",(err,data)=>{
            // 读取错误则直接返回错误信息
            if(err) return reject(err);
            // 将读取的数据转换为json对象格式
            const jsonData = JSON.parse(data);
            // 如果密码和邮箱都没有问题则返回
            if(webData.password === jsonData.password && webData.email === jsonData.email){
                return resolve({status:true});
            }else{
                // 如果密码和邮箱有一个输入错误则返回错误信息 
                if(webData.password !== jsonData.password){
                    return resolve({status:false,info:"密码输入错误"});
                }
                return resolve({status:false,info:"邮箱输入错误"});
            }
        })
    })
}