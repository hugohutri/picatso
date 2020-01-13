import axios from "axios";

// This axios file will be imported instead of default axios
// and it will use the backend url as the baseURL and make the code cleaner
const instance = axios.create({
  baseURL: "http://localhost:8080/"
  //baseURL: "http://api-picatso.rahtiapp.fi/"
});

export default instance;
