import axios from '../axios'

// function handle login
const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password }); // request len server
}

const getAllUser = (id) => {
    return axios.get(`api/get-all-users?id=${id}`); // request len server
}

const createNewUserService = (data) => {
    return axios.post(`api/create-new-user`, data);
}

const deleteUserService = (userid) => {
    return axios.delete(`api/delete-user`,
        {
            data: { id: userid },
        });
}

const editUserService = (inputData) => {
    return axios.put(`api/edit-user`, inputData);
}
const getAllcodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/get-top-doctor-home?limit=${limit}`);

}

const getAllDoctor = () => {
    return axios.get(`/api/getAllDoctor`);
}
const saveDetailDoctor = (data) => {
    return axios.post(`api/save-infor-doctor`, data);
}

const getDetailInforDoctor = (id) => {
    return axios.get(`api/get-detial-doctor-by-id?id=${id}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`api/bulk-create-schedule`, data);
}

const getScheduleDoctorById = (inputId, date) => {
    return axios.get(`api/get-schedule-doctor-by-id?doctorId=${inputId}&date=${date}`);
}
const getExtraInforDoctorById = (id) => {
    return axios.get(`api/get-extra-infor-doctor-by-id?doctorId=${id}`);
}

const getProfileDoctorById = (id) => {
    return axios.get(`api/get-profile-doctor-by-id?doctorId=${id}`);
}

const postPatientBookAppoiment = (data) => {
    return axios.post(`api/patient-booking-oppointment`, data);
}
const postVerifyBookAppoiment = (data) => {
    return axios.post(`api/verify-booking-oppointment`, data);
}

const createNewSpecialty = (data) => {
    return axios.post(`api/create-new-specialty`, data);
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getDetaiSpecialty = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createNewClinic = (data) => {
    return axios.post(`api/create-new-clinic`, data);
}
const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
}

const getDetaiClinic = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
}

const getPatientforDoctor = (data) => {
    return axios.get(`/api/get-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}


const postSendRemedy = (data) => {
    return axios.post(`api/send-remedy`, data);
}

const searchDoctor = (search) => {
    return axios.get(`/api/search-doctor?search=${search}`);
}

const searchSpecialty = (search) => {
    return axios.get(`/api/search-specialty?search=${search}`);
}

const searchClinic = (search) => {
    return axios.get(`/api/search-clinic?search=${search}`);
}


const createNewHandBook = (data) => {
    return axios.post(`api/create-new-handbook`, data);
}


const getAllHandbook = () => {
    return axios.get(`/api/get-all-handbook`);
}



const getDetalhandbookById = (id) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${id}`);
}
export {
    handleLoginApi, getAllUser, createNewUserService,
    deleteUserService, editUserService, getAllcodeService,
    getTopDoctorHomeService, getAllDoctor, saveDetailDoctor,
    getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorById,
    getExtraInforDoctorById, getProfileDoctorById, postPatientBookAppoiment,
    postVerifyBookAppoiment, createNewSpecialty,
    getAllSpecialty, getDetaiSpecialty,
    createNewClinic, getAllClinic, getDetaiClinic, getPatientforDoctor,
    postSendRemedy, searchDoctor, searchSpecialty, searchClinic,
    createNewHandBook, getAllHandbook, getDetalhandbookById
};