import axios from "axios";

// This axios file will be imported instead of default axios
// and it will user the backend url as the baseURL and make the code cleaner
const instance = axios.create({
<<<<<<< Updated upstream
    baseURL: "http://localhost:8080/"
=======
  //baseURL: "http://192.168.1.37:8080/"
  baseURL: "http://localhost:8080/"
>>>>>>> Stashed changes
});

export default instance;
