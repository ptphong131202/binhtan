import express from "express";
import userController from '../controllers/userController';
import backgroundController from "../controllers/backgroundController";
import tunureController from "../controllers/tunureController";
import adminController from "../controllers/adminController";

let router = express.Router();

let initWebRoutes = (app) => {

    // route table user

    router.post('/api/login', userController.handleLoging);

    router.get('/api/get-allcode', userController.getallcode);

    // backgorund
    router.get('/api/get-background', backgroundController.getbackground);
    router.post('/api/post-background', backgroundController.postbackground)
    router.delete("/api/delete-background", backgroundController.deletebackground); 

    // tunure
    router.get('/api/get-tunure', tunureController.gettunure);
    router.get('/api/get-tunure-by-id', tunureController.gettunurebyid);
    router.post('/api/post-tunure', tunureController.posttunure);
    router.delete("/api/delete-tunure", tunureController.deletetunure); 
    router.put("/api/put-tunure", tunureController.puttunure); 


    router.post('/api/post-admin', adminController.postAdmin);
    router.get('/api/get-admin', adminController.getAdmin);
    router.get('/api/get-admin-by-id', adminController.getAdminbyid);
    router.put("/api/put-admin", adminController.putAdmin); 
    router.delete("/api/delete-admin", adminController.deleteadmin); 

    


    return app.use("/", router);
}

module.exports = initWebRoutes;