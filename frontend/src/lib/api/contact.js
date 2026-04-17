import api from "../axios.js";

export const contactUs = async (data) => {
  const res = await api.post("/contact", data);
  return res.data;
};