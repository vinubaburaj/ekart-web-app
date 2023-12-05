import * as httpService from "../Service/httpService";
import {CHECK_AUTH, LOGIN, LOGOUT, REGISTER} from "../../Constants/apiUrls";

export const register = async (user) => {
  const response = await httpService.post(REGISTER, user);
  console.log(response);
  return response;
}

export const login = async (user) => {
  const response = await httpService.post(LOGIN, user);
  console.log(response);
  return response;
}

export const logout = async () => {
  const response = await httpService.get(LOGOUT);
  console.log(response);
  return response;
}

export const checkAuth = async () => {
  const response = await httpService.get(CHECK_AUTH);
  console.log(response);
  return response;
}