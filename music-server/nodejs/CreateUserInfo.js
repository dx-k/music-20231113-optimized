const fs = require("fs");
/**
 * 
 * @param {前端传递过来的数据} data 
 * @param {需要创建在哪个路径下，一般是"../user"} path 
 * @returns 
 */
module.exports = function CreateUserInfo(data,path){
    const _data = JSON.stringify({
        username:data.username,
        password:data.password,
        email:data.email
    })
    return new Promise((resolve,reject)=>{
        // 向一个文件写入数据，如果没有该文件则创建该文件
        fs.writeFile(`${path}/${data.username}.json`,_data,err=>{
            if(err) return reject(err);
            return resolve({status:true,info:"用户创建成功"});
        })
    })
}