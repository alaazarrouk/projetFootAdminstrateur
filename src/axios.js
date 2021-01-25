import axios from "axios";

const instance = axios.create({
  baseURL: "https://projetfootbackend.herokuapp.com",
});

export default instance;
