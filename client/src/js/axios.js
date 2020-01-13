import axios from "axios";

// This axios file will be imported instead of default axios
// and it will use the backend url as the baseURL and make the code cleaner
const instance = axios.create({
  //baseURL: "http://192.168.1.37:8080/"
  baseURL: "http://localhost:8080/"
});

export default instance;
