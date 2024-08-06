import db from '../models/index';

let getbackground = () =>{
    return new Promise(async (resolve, reject) => {
        try{
            let bg = await db.Background.findAll({
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

let postbackground = (data) =>{
    return new Promise(async (resolve, reject) => {
        try{
            if(!data.image){
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                })
            }

            else {
                let res = await db.Background.create({
                    image: data.image
                })

                if(res) {
                    resolve({
                        errCode: 0,
                        message: "Create a new Background successfully!"
                    })
                }
                else {
                    resolve({
                        errCode: 1,
                        message: "Create a new Background fault!"
                    })
                }
            }

        }
        catch(e){
            reject(e);
        }
    })
}

let deletebackground = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!id){
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                });
            }
            else {
                let bg = await db.Background.findOne({
                    where: {id: id}
                });

                if(bg){
                    await db.Background.destroy({
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
    getbackground: getbackground,
    postbackground: postbackground,
    deletebackground: deletebackground
}