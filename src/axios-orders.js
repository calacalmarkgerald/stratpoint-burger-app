import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://stratpoint-burger-api.firebaseio.com/'
});

export default instance;
