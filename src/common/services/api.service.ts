import axios, { AxiosError } from "axios";
import { AuthData } from "../interfaces/authData.interface";

const headers = {
  "Content-Type": "application/json",
};

const Api = axios.create({
  baseURL: "http://localhost:1337",
  headers,
});

Api.interceptors.request.use(async (config) => {
  const authData = localStorage.getItem("auth-data")
    ? (JSON.parse(localStorage.getItem("auth-data") as string) as AuthData)
    : null;

  if (authData?.access_token) {
    if (config.headers)
      config.headers.Authorization = `Bearer ${authData.access_token}`;
  }
  return config;
});

Api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error?.code === "ERR_NETWORK")
      return Promise.reject(
        new Error("Não foi possível se conectar com o servidor."),
      );
    const data = error.response?.data as any;
    if (data?.errors?.[0]?.message === "token-expired") {
      localStorage.clear();
      return window.location.replace("/login");
    }
    return Promise.reject(error);
  },
);

export default Api;
