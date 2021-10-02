import axios from 'axios';

const Api = axios.create({
  baseURL: "http://localhost/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
