import axios from "axios";
import {navigateToErrorPage} from "../../Utils/navigationInitializer";

const request = axios.create({
  withCredentials: true,
});

const errorsToRedirect = [500, 501, 503];

const handleRequestError = (error, navigate) => {
  console.error(error);
  if (errorsToRedirect.includes(error.response.status)) {
    // navigate to error page
    navigateToErrorPage();
  }
  return error.response;
};

export const get = async (url, navigate) => {
  let response
  try {
    response = await request.get(url);
  } catch (error) {
    return handleRequestError(error, navigate);
  }
  return response.data;
}

export const post = async (url, payload) => {
  let response;
  try {
    response = await request.post(url, payload);
  } catch (error) {
    return handleRequestError(error);
  }
  return response.data;
}

export const put = async (url, payload) => {
  let response;
  try {
    response = await request.put(url, payload);
  } catch (error) {
    return handleRequestError(error);
  }
  return response.data;
}

// won't let me add delete as a method name
export const deleteReq = async (url, payload) => {
  let response;
  try {
    response = await request.delete(url, payload);
  } catch (error) {
    return handleRequestError(error);
  }
  return response.data;
}