import tunureService from '../services/tunureService';

let gettunure = async (req, res) => {
    let bg = await tunureService.gettunure(req.query.word);
    return res.status(200).json(bg);
}

let gettunurebyid = async (req, res) => {
    let bg = await tunureService.gettunurebyid(req.query.id);
    return res.status(200).json(bg);
}

let posttunure = async (req, res) => {
    let bg = await tunureService.posttunure(req.body);
    return res.status(200).json(bg);
}

let deletetunure = async (req, res) => {
    let bg = await tunureService.deletetunure(req.body.id);
    return res.status(200).json(bg);
}

let puttunure = async (req, res) => {
    let bg = await tunureService.puttunure(req.body);
    return res.status(200).json(bg);
}

module.exports = {
    gettunure: gettunure,
    posttunure: posttunure,
    deletetunure: deletetunure,
    gettunurebyid: gettunurebyid,
    puttunure: puttunure
}