import axios from '../axios';

// get background
const getbackground = (id) => {
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

export {
    getbackground,postbackground,deletebackground
};