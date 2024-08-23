import express from "express";
import userController from '../controllers/userController';
import termController from '../controllers/termController';


let router = express.Router();

let initWebRoutes = (app) => {

    // route table user

    router.post('/api/login', userController.handleLoging);

    router.get('/api/get-allcode', userController.getallcode);


    /* term */
    router.post('/api/post-term', termController.postterm);
    router.get('/api/get-term', termController.getterm);
    router.get('/api/get-term-by-id', termController.gettermbyid);


    return app.use("/", router);
}

module.exports = initWebRoutes;