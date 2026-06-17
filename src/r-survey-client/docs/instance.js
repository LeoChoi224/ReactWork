import axios from "axios";

const baseURL = 'http://localhost:8000/survey';

const instance = axios.create({
  baseURL,
  headers: {
    post: {
      'Content-Type': "application/json;charset=utf-8",
    },
    put: {
      'Content-Type': "application/json;charset=utf-8",
    },
  }});

export default instance;