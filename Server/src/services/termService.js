import { reject } from 'lodash';
import db from '../models/index';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

let postterm = (data) => {
    return new Promise(async  (resolve, reject) => {
        try{
            if(!data.title){
                resolve({
                    errCode : 0,
                    message: "Missing required parameter!"
                })
            }
            else{
                let res = await db.Term.create({
                    title: data.title
                });

                if(res){
                    resolve({
                        errCode: 0,
                        message: "Create a new Term success!"
                    })
                }
                else resolve({
                    errCode: 2,
                    message: "Create a new term failed!"
                })
            }
        }
        catch(e){
            reject(e);
        }
    })
}

let getterm = (word) => {
    return new Promise(async (resolve, reject) => {
        try{
            let res;

            if (word === '') {
                res = await db.Term.findAll({
                    where: { delete_at: null },
                    raw: true,
                });
            } else {
                res = await db.Term.findAll({
                    where: {
                        [Op.or]: [
                            { title: { [Op.like]: `%${word}%` } },
                        ],
                        delete_at: null // Thêm điều kiện này để chỉ lấy các bản ghi chưa bị xóa
                    },
                    raw: true,
                });
            }
            res = res.reverse(); // Đảo ngược danh sách kết quả
            resolve(res ? { errCode: 0, data: res } : { errCode: 1 });
        }
        catch(e){
            reject(e);
        }
    })
}

module.exports = {
    postterm: postterm,
    getterm: getterm
}