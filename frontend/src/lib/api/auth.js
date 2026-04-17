import api from "../axios.js";

// Register a new user — POST /auth/register
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// Login — POST /auth/login
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
