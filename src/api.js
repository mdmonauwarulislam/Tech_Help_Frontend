import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get blog by ID
export const fetchBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
};

// Toggle Like
export const toggleLike = async (id) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.post(
    `${API_URL}/blogs/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Add Comment
export const addComment = async (id, comment) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.post(
    `${API_URL}/blogs/${id}/comment`,
    { text: comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Increment Share Count
export const incrementShare = async (id) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.post(
    `${API_URL}/blogs/${id}/share`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
