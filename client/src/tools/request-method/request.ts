import axios from "axios";
import { apiUrl } from "../api-url/apiUrl";

axios.defaults.baseURL = apiUrl;

export const sendRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  route: string,
  body?: string | any
) => {
  const response = await axios.request({
    method: method,
    url: route,
    data: body,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
  }

  return response;
};
