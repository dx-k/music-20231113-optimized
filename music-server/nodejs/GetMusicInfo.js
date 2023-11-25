const fs = require("fs");

/**
 * 
 * @param {前端传过来的数据} data 
 * @param {需要查询的路径} path 
 * @returns 
 */
module.exports = function GetMusicInfo(data,path){
    // 如果存在该音乐则返回音乐信息
    return new Promise((resolve,reject)=>{
        fs.readFile(`${path}/${data.musicname}.json`,"utf8",(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        })
    })
}

