// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Asegúrate de que coincide con el backend
});

export default api;
