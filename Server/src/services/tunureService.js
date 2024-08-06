import db from '../models/index';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
let gettunure = (word) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tunureList = [];
            let adminList = await db.Admin.findAll({
                attributes: ['tunure']
            });
            let tenures = adminList.map(admin => admin.tunure);
            let uniqueTenures = [...new Set(tenures)];

            if (word === '') {
                tunureList = await db.Tunure.findAll();
            } else {
                tunureList = await db.Tunure.findAll({
                    where: {
                        tunure: {
                            [Op.like]: '%' + word + '%'
                        }
                    }
                });
            }

            if (tunureList) {
                tunureList.map(item => {
                    let check = false;
                    uniqueTenures.map(itemadmin => {
                        if(+itemadmin === +item.id){
                            check = true;
                        }
                    })
                    item.check = check;
                })

                resolve({
                    errCode: 0,
                    data: tunureList
                });
            } else {
                resolve({
                    errCode: 1
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}



let gettunurebyid = (id) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let bg = await db.Tunure.findOne({
                where: {id: id}
            });

            if(bg) {
                resolve({
                    errCode: 0,
                    data: bg
                })
            }
            else{
                resolve({
                    errCode: 1
                })
            }
        }
        catch(e){
            reject(e);
        }
    })
}
let posttunure = (data) =>{
    return new Promise(async (resolve, reject) => {
        try{
            if(!data.tunure){
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                })
            }

            else {
                let res = await db.Tunure.create({
                    tunure: data.tunure
                })

                if(res) {
                    resolve({
                        errCode: 0,
                        message: "Create a new Tunure successfully!"
                    })
                }
                else {
                    resolve({
                        errCode: 1,
                        message: "Create a new Tunure fault!"
                    })
                }
            }

        }
        catch(e){
            reject(e);
        }
    })
}
let deletetunure = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!id){
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                });
            }
            else {
                let bg = await db.Tunure.findOne({
                    where: {id: id}
                });

                if(bg){
                    await db.Tunure.destroy({
                        where:{id :id},
                    });
                    resolve({
                        errCode: 0,
                        message: "Delete success!"
                    });
                }
                else{
                    resolve({
                        errCode: 2,
                        message: "Delete faild!"
                    })
                }
            }

        }
        catch(e){
            reject(e);
        }
    })
}


let puttunure = (data) => {
    return new Promise(async(resolve, reject) => {
        try{

            if(!data.id) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                });
            }
            else{
                let tunure = await db.Tunure.findOne({
                    where: {id: data.id},
                    raw: false
                });

                if(tunure){
                    tunure.tunure = data.tunure;
                    await tunure.save();
                    resolve({
                        errCode: 0,
                        message: "Update success!"
                    });
                }
                else{
                    resolve({
                        errCode: 2,
                        message: "Not found!"
                    })
                }
            }

        }catch(e){
            reject(e);
        }
    })
}


module.exports = {
    gettunure: gettunure,
    posttunure: posttunure,
    deletetunure: deletetunure,
    gettunurebyid: gettunurebyid,
    puttunure: puttunure
}