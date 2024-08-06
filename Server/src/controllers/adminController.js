import adminService from '../services/adminService';

let postAdmin = async (req, res) => {
    let bg = await adminService.postAdmin(req.body);
    return res.status(200).json(bg);
}

let getAdmin = async (req, res) => {
    let bg = await adminService.getAdmin(req.query.word);
    return res.status(200).json(bg);
}


let getAdminbyid = async (req, res) => {
    let bg = await adminService.getAdminbyid(req.query.id);
    return res.status(200).json(bg);
}

let putAdmin = async (req, res) => {
    let bg = await adminService.putAdmin(req.body);
    return res.status(200).json(bg);
}

let deleteadmin = async (req, res) => {
    let bg = await adminService.deleteadmin(req.body.id);
    return res.status(200).json(bg);
}

module.exports = {
    postAdmin: postAdmin,
    getAdmin: getAdmin,
    getAdminbyid: getAdminbyid,
    putAdmin: putAdmin,
    deleteadmin: deleteadmin
}