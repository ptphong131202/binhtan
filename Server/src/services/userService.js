import db from '../models/index';
import bcrypt from 'bcryptjs';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const salt = bcrypt.genSaltSync(10);

//hash password
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

/// check email
let checkUserEmail = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: username },
                        { mssv: username }
                    ]
                }
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

/// đăng nhập
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                email = email.charAt(0).toUpperCase() + email.slice(1);
            }
            let userData = {};
            let isExist = await checkUserEmail(email); /// check email 
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ["id", 'email', 'position', 'password', 'fullName'],
                    where: {
                        [Op.or]: [
                            { email: email },
                            { mssv: email }
                        ]
                    },
                    include: [
                        { model: db.Allcode, as: 'positionUser', attributes: [ 'valueEn', 'valueVi' ] },
                    ],
                    raw: true,
                    nest: true
                    
                });
                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}



let getallcode = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter '
                })

            }
            else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput },
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    hashUserPassword: hashUserPassword,
    getallcode: getallcode,
    hashUserPassword:hashUserPassword,
}