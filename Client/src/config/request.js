import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000/";

export const sendRequest = async ({
  method = "GET",
  route,
  params,
  body,
  includeHeaders = true,
}) => {
  if (!route) throw Error("URL required");

  // axios.defaults.headers.authorization = includeHeaders
  //   ? `Bearer ${localStorage.getItem("token")}`
  //   : "";

// eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.request({
      method,
      url: route,
      data: body,
      params,
      withCredentials: true,
      credentials:'include'
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
