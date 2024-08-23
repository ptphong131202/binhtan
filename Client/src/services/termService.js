import axios from '../axios'

const getterm = (word) => {
    return axios.get(`api/get-term?word=${word}`); 
  }

const postterm = (data) => {
    return axios.post(`api/post-term`, data);
  }

export {
    postterm, getterm
};