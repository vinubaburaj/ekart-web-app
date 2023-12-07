import * as httpService from "../Service/httpService";
import { PROFILE } from "../../Constants/apiUrls";

export const getProfile = async (profileId) => {
  const response = await httpService.get(`${PROFILE}/${profileId}`);
  return response;
};

export const updateProfile = async (profileId, profileData) => {
  const response = await httpService.put(
    `${PROFILE}/${profileId}`,
    profileData
  );
  return response;
};

export const getReviewsByUser = async (profileId) => {
  const response = await httpService.get(`${PROFILE}/${profileId}/reviews`);
  return response;
};
