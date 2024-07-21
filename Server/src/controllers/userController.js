import userService from '../services/userService';

// function handle longin
let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) // nếu email or password = null
    {
        // return 1 string json object
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

// get all users
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // all or id
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        message: "Ok!",
        users
    })
}

// function create new user
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

// function deleteUser
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) // nếu ko có id người dùng
    {
        // return lỗi
        return res.status(404).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        });
    }
    // ngược lại xóa user với id
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

// handle edit user
let handleEditUser = async (req, res) => {
    let data = req.body;
    let updateUser = await userService.updateUserData(data);

    return res.status(200).json(updateUser);
}


// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCode(req.query.type);
        return res.status(200).json(data);

    }
    catch (err) {
        console.log("Get all code error", err);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}





module.exports = {
    handleLoging: handleLoging,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}