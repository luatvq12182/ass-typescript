import axios from "axios";
import { CONFIG } from "../pages/config";

const http = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { http };
