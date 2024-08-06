import axios from '../axios'

// function handle login
const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password }); // request len server
}


const getallcode = (inputData) => {
    return axios.get(`/api/get-allcode?type=${inputData}`);
}

export {
    handleLoginApi,  getallcode
};