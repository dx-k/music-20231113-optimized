/**
 * 
 * @param {请求体} req 
 * @returns 
 */
module.exports = function ReceiveData(req){
    return new Promise((resolve,reject)=>{
        let data = "";
        req.on('data',chunk=>{
            data += chunk;
        })
        req.on('end',()=>{
            data = JSON.parse(data);
            return resolve(data);
        })
    })
}