import termService from '../services/termService';

/* add */
let postterm = async (req, res) => {

    let data = await termService.postterm(req.body);
    return res.status(200).json(data);
}

/* get */
let getterm = async (req, res) => {
    let data = await termService.getterm(req.query.word);
    return res.status(200).json(data);
}

// get term by id

let gettermbyid = async (req, res) => {
    let data = await termService.gettermbyid(req.query.id);
    return res.status(200).json(data);
}




module.exports = {
    postterm: postterm,
    getterm: getterm,
    gettermbyid: gettermbyid
}