import * as httpService from "../Service/httpService";
import { PROFILE } from "../../Constants/apiUrls";

export const getProfile = async (profileId) => {
  const response = await httpService.get(`${PROFILE}/${profileId}`);
  return response;
};
