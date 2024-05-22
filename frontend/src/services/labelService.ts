import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust the base URL as needed
});

export const getLabels = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/labels");
  return response.data;
};
