import api from "../axios.js";

// Create a new link
export const createLink = async (data) => {
  const res = await api.post("/link", data);
  return res.data;
};

// Get active links only — used by public profile page
export const getLinks = async (profileId) => {
  const res = await api.get(`/link/${profileId}`);
  return res.data;
};

// Get ALL links (active + inactive) — used by dashboard
export const getAllLinks = async (profileId) => {
  const res = await api.get(`/link/all/${profileId}`);
  return res.data;
};

// Update a link (title, url, isActive)
export const updateLink = async (id, data) => {
  const res = await api.patch(`/link/${id}`, data);
  return res.data;
};

// Delete a link
export const deleteLink = async (id) => {
  const res = await api.delete(`/link/${id}`);
  return res.data;
};

// Increment click count when a public user clicks a link
export const trackClick = async (id) => {
  const res = await api.patch(`/link/${id}/click`);
  return res.data;
};
