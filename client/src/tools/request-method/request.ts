import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export const sendRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  route: string,
  body?: Record<string, any>
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
