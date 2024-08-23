import axios from '../axios'

// function handle login
const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password }); // request len server
}


const getallcode = (inputData) => {
    return axios.get(`/api/get-allcode?type=${inputData}`);
}


// user
const getuser = (word) => {
    return axios.get(`api/get-user?word=${word}`); 
  }

  const postuser = (data) => {
    return axios.post(`api/post-user`, data);
  }

  const getuserbyid = (id) => {
    return axios.get(`api/get-user-by-id?id=${id}`); 
  }

  let putuser = (data) => {
    return axios.put(`api/put-user`, data);
  }

  let deleteuser = (id) => {
    return axios.delete(`/api/delete-user`, {
      data: { id: id }
    })
  }

export {
    handleLoginApi,  getallcode, 
    getuser, postuser, getuserbyid, putuser, deleteuser
};