import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getLabels = async (): Promise<string[]> => {
  const token = localStorage.getItem("token");
  const response = await api.get<string[]>("/labels", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
