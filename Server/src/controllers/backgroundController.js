import backgroundService from '../services/backgroundService';

// get background
let getbackground = async (req, res) => {
    let bg = await backgroundService.getbackground();
    return res.status(200).json(bg);
}

let postbackground = async (req, res) => {
    let bg = await backgroundService.postbackground(req.body);
    return res.status(200).json(bg);
}


let deletebackground = async (req, res) => {
    let bg = await backgroundService.deletebackground(req.body.id);
    return res.status(200).json(bg);
}


module.exports = {
    getbackground: getbackground,
    postbackground: postbackground,
    deletebackground: deletebackground
}