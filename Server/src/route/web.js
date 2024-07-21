import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import hanbookController from "../controllers/handbookController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);


    // route table user

    router.post('/api/login', userController.handleLoging);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    // route table allcode
    router.get("/api/allcode", userController.getAllCode);
    // route get doctor home page
    router.get("/api/get-top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/getAllDoctor", doctorController.getAllDoctor);
    router.post("/api/save-infor-doctor", doctorController.postInforDoctor);

    router.get("/api/get-detial-doctor-by-id", doctorController.getDetialDoctor);
    router.get("/api/get-patient-for-doctor", doctorController.getPatientForDoctor);
    router.post("/api/send-remedy", doctorController.sendRemedy);

    router.post("/api/bulk-create-schedule", doctorController.postBulkCreateSchedule);
    router.get("/api/get-schedule-doctor-by-id", doctorController.getScheduleDoctorById);
    router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById);
    router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);
    router.post("/api/patient-booking-oppointment", patientController.postPatientBookingOppointment);
    router.post("/api/verify-booking-oppointment", patientController.postVerifyBookingOppointment);

    router.post("/api/create-new-specialty", specialtyController.createNewSpecialty);
    router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
    router.get("/api/get-detail-specialty-by-id", specialtyController.getDetalSpecialtyById);
    router.post("/api/create-new-clinic", clinicController.createNewClinic);
    router.get("/api/get-all-clinic", clinicController.getAllClinic);
    router.get("/api/get-detail-clinic-by-id", clinicController.getDetalClinicById);


    router.get("/api/search-doctor", doctorController.searchDoctor);
    router.get("/api/search-specialty", specialtyController.searchSpecialty);
    router.get("/api/search-clinic", clinicController.searchClinic);

    router.post("/api/create-new-handbook", hanbookController.createNewHandBook);
    router.get("/api/get-all-handbook", hanbookController.getAllHandbook);
    router.get("/api/get-detail-handbook-by-id", hanbookController.getDetalhandbookById);



    return app.use("/", router);
}

module.exports = initWebRoutes;