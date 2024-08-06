import db from '../models/index';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}



let postAdmin = (data) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let isExist = await checkUserEmail(data.email);
            if(isExist){
                resolve({
                    errCode: 3,
                    message: "Email is Exist!"
                })
            }
            else{
                if(!data.email || !data.password
                    || !data.fullName || !data.phone ||
                     !data.gender || !data.position ){
                   resolve({
                       errCode: 1,
                       message: "Missing required parameter!"
                   })
               }
   
               else {
                let hashPassWord = await hashUserPassword(data.password);
                   let res = await db.Admin.create({
                       email: data.email,
                       password: hashPassWord,
                       fullName: data.fullName,
                       gender: data.gender,
                       phone: data.phone,
                       image: data.image,
                       position: data.position,
                       tunure: data.tunure,
                       biography: data.biography
                   })
   
                   if(res) {
                       resolve({
                           errCode: 0,
                           message: "Create a new Admin successfully!"
                       })
                   }
                   else {
                       resolve({
                           errCode: 1,
                           message: "Create a new Admin fault!"
                       })
                   }
               }
            }

        }
        catch(e){
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Admin.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getPosition = async (word) => {
    let whereClause = {};
    if (word && word !== "undefined" && word.trim() !== "") {
        whereClause = {
            valueVi: {
                [Op.like]: '%' + word + '%'
            }
        };
    }
    try {
        let positions = await db.Allcode.findAll({
            where: whereClause
        });
        return positions;
    } catch (error) {
        console.error('Failed to fetch positions:', error);
        throw error;  // Ensure that the error is handled or logged appropriately
    }
}


let getnhiemky = async (word) => {
    let whereClause = {};
    if (word && word !== "undefined" && word.trim() !== "") {
        whereClause = {
            tunure: {
                [Op.like]: '%' + word + '%'
            }
        };
    }
    try {
        let positions = await db.Tunure.findAll({
            where: whereClause
        });
        return positions;
    } catch (error) {
        console.error('Failed to fetch positions:', error);
        throw error;  // Ensure that the error is handled or logged appropriately
    }
}


let getAdmin = (word) =>{
    return new Promise(async (resolve, reject) => {
        try{
            if(word === ''){
                let bg = await db.Admin.findAll({
                    include: [
                        { model: db.Allcode, as: "positionAdmin" },
                        { model: db.Tunure, as: "tunureAdmin" },
                    ], 
                    raw: true,
                    nest: true,
                    attributes: {
                        exclude: ['password']
                    },
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
            else{
                let positions = await getPosition(word);
                let tunures = await getnhiemky(word);
                let positionIds = positions.map(p => p.keyMap);
                let tunureIds = tunures.map(p => p.id);
                let bg = await db.Admin.findAll({
                    where: {
                        [Op.or]: [
                            { email: { [Op.like]: '%' + word + '%' } },
                            { fullName: { [Op.like]: '%' + word + '%' } },
                            { phone: { [Op.like]: '%' + word + '%' } },
                            { position: { [Op.in]: positionIds }  },
                            { tunure: { [Op.in]: tunureIds }  },
                        ]
                        
                    },
                    include: [
                        { model: db.Allcode, as: "positionAdmin" },
                        { model: db.Tunure, as: "tunureAdmin" },
                    ], 
                    raw: true,
                    nest: true,
                    attributes: {
                        exclude: ['password']
                    },
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
            
        }
        catch(e){
            reject(e);
        }
    })
}

let getAdminbyid = (id) =>{
    return new Promise(async (resolve, reject) => {
        try{
            if(!id){
                    resolve({
                        errCode: 1,
                        message: "Missing required parameter!"
                    })
            }
            else{
                let bg = await db.Admin.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: "positionAdmin" },
                        { model: db.Tunure, as: "tunureAdmin" },
                    ], 
                    raw: true,
                    nest: true,
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
            
        }
        catch(e){
            reject(e);
        }
    })
}

let putAdmin = (data) => {
    return new Promise(async(resolve, reject) => {
        try{

            if(!data.id) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                });
            }
            else{
                let admin = await db.Admin.findOne({
                    where: {id: data.id},
                    raw: false
                });

                if(admin){
                    admin.email = data.email;
                    admin.fullName = data.fullName;
                    admin.phone = data.phone;
                    admin.gender = data.gender;
                    admin.image = data.image;
                    admin.biography = data.biography;
                    admin.position = data.position;
                    await admin.save();
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

let deleteadmin = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!id){
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                });
            }
            else {
                let bg = await db.Admin.findOne({
                    where: {id: id}
                });

                if(bg){
                    await db.Admin.destroy({
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

module.exports = {
    postAdmin: postAdmin,
    hashUserPassword:hashUserPassword,
    getAdmin: getAdmin,
    getAdminbyid: getAdminbyid, 
    putAdmin: putAdmin,
    deleteadmin: deleteadmin

}