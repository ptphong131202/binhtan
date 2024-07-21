import db from '../models/index';
import bcrypt from 'bcryptjs';
import user from '../models/user';

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ["id", 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,

                });
                if (user) {
                    //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare(password, user.password);


                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);

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
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
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

// get all user
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "ALL") // id = ALL  
            {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                }) // tra ve all users
            }
            if (userId && userId !== "ALL") // neu co id va khac all
            {
                users = await db.User.findOne({ // tra ve 1 user
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}


let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: `Your's Email is already exist in our system, plz try other email`
                });
            }
            let hashPassWordFromBcrypt = await hashUserPassword(data.password)
            if (!data.email
                || !data.firstName
                || !data.lastName
                || !data.address
                || !data.phonenumber
                || !data.gender
                || !data.roleId
                || !data.positionId
                || !data.avatar) {
                resolve({
                    errCode: 2,
                    errMessage: 'Not in valid!'
                })
            }
            else {
                await db.User.create({
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create new user succeed',
                })
            }
        }
        catch (err) {
            reject(err);
        }
    })
}

let deleteUser = (userid) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userid },
        });

        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'User not found'
            });
        }

        await db.User.destroy({
            where: { id: userid },
        });
        resolve({
            errCode: 0,
            errMessage: 'Delete user succeed'
        });
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter '
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.phonenumber = data.phonenumber;
                user.email = data.email;
                user.image = data.avatar
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update user succeed'
                });

            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'User not found'
                });

            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getAllCode = (typeInput) => {
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
    getAllUser: getAllUser,
    hashUserPassword: hashUserPassword,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCode: getAllCode,

}