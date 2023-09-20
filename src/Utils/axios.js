import axios from "axios";

const BASE_URL = 'https://api.dev.pastorsline.com/api';

export const Axios = axios.create({
  baseURL: BASE_URL,
});

