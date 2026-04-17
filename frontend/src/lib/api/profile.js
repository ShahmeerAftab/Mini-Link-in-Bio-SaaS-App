import api from "../axios.js";

// Create a new profile
export const createProfile = async (data) => {
  const res = await api.post("/profile", data);
  return res.data;
};

// Get a profile by username — used by public profile page
export const getProfile = async (username) => {
  const res = await api.get(`/profile/${username}`);
  return res.data;
};

// Update profile (fullName, bio, profileImage, coverImage)
export const updateProfile = async (id, data) => {
  const res = await api.patch(`/profile/${id}`, data);
  return res.data;
};

// Upload a profile image — returns { url }
// Uses native fetch (not axios) so the browser sets Content-Type with the required boundary
// that multer needs to parse multipart data. Axios's default headers break this.
export const uploadImage = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:5000/api/profile/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    // No Content-Type — browser sets multipart/form-data with boundary automatically
    body: formData,
  });

  // Read as text first — if server returns HTML (e.g. 404), JSON.parse would throw
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Server error (${res.status}) — restart the backend and try again`);
  }

  if (!res.ok) throw new Error(data.message || `Upload failed (${res.status})`);
  return data; // { url }
};
