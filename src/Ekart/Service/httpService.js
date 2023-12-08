import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const Series500Errors = ["500", "501", "503"];

export const get = async (url) => {
  let response
  try {
    response = await request.get(url);
  } catch (error) {
    console.log(error);
    if (Series500Errors.includes(error.response.status)) {
      // TODO handle errors
    }
    return error.response;
  }
  return response.data;
}

export const post = async (url, payload) => {
  let response;
  try {
    response = await request.post(url, payload);
  } catch (error) {
    console.log(error);
    return error.response;
  }
  return response.data;
}

export const put = async (url, payload) => {
  let response;
  try {
    response = await request.put(url, payload);
  } catch (error) {
    console.log(error);
    return error.response;
  }
  return response.data;
}

// won't let me add delete as a method name
export const deleteReq = async (url, payload) => {
  let response;
  try {
    response = await request.delete(url, payload);
  } catch (error) {
    console.log(error);
    return error.response;
  }
  return response.data;
}