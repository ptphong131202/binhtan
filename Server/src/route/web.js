import express from "express";
import userController from '../controllers/userController';
import backgroundController from "../controllers/backgroundController";

let router = express.Router();

let initWebRoutes = (app) => {

    // route table user

    router.post('/api/login', userController.handleLoging);


    // backgorund
    router.get('/api/get-background', backgroundController.getbackground);
    router.post('/api/post-background', backgroundController.postbackground)
    router.delete("/api/delete-background", backgroundController.deletebackground); 
    


    return app.use("/", router);
}

module.exports = initWebRoutes;