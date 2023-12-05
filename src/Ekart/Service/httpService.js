import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

export const get = async (url) => {
  let response
  try {
    response = await request.get(url);
  } catch (error) {
    console.log(error);
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