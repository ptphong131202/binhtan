import axios from '../axios';

// get background
const getbackground = () => {
    return axios.get(`api/get-background`); 
}

const postbackground = (data) => {
    return axios.post(`api/post-background`, data);
}

const deletebackground = (id) => {
    return axios.delete(`/api/delete-background`, {
      data: { id: id }
    })
  }

// tunure
const gettunure = (word) => {
    return axios.get(`api/get-tunure?word=${word}`); 
}

const gettunurebyid = (id) => {
  return axios.get(`api/get-tunure-by-id?id=${id}`); 
}

const posttunure = (data) => {
    return axios.post(`api/post-tunure`, data);
}

const deletetunure = (id) => {
    return axios.delete(`/api/delete-tunure`, {
      data: { id: id }
    })
  }

let puttunure = (data) => {
  return axios.put(`api/put-tunure`, data);
}


// admin
const postAdmin = (data) => {
  return axios.post(`api/post-admin`, data);
}

const getAdmin = (word) => {
  return axios.get(`api/get-admin?word=${word}`); 
}

const getAdminbyid = (id) => {
  return axios.get(`api/get-admin-by-id?id=${id}`); 
}

let putAdmin = (data) => {
  return axios.put(`api/put-admin`, data);
}

const deleteadmin = (id) => {
  return axios.delete(`/api/delete-admin`, {
    data: { id: id }
  })
}

export {
    getbackground,postbackground,deletebackground,
    gettunure,  posttunure, deletetunure, gettunurebyid, puttunure, 
    postAdmin, getAdmin, getAdminbyid, putAdmin, deleteadmin,
};