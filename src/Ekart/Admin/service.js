import * as httpService from "../Service/httpService";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
const USERS_URL = `${API_BASE}/users`;

export const getAllUsers = async () => {
  const response = await httpService.get(`${USERS_URL}`);
  return response;
};

export const deleteUser = async (userId) => {
  const response = await httpService.deleteReq(`${USERS_URL}/${userId}`);
  return response;
};

export const createUser = async (user) => {
    const response = await httpService.post(`${USERS_URL}`, user);
    return response;
  };
