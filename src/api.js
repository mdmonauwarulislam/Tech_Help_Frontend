import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Handle API errors consistently
const handleApiError = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  }
  throw error.response?.data?.message || error.message;
};

export const toggleLike = async (blogId) => {
  try {
    const response = await axios.post(
      `${API_URL}/blog/${blogId}/like`,
      {},
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const toggleBookmark = async (blogId) => {
  try {
    const response = await axios.post(
      `${API_URL}/blog/${blogId}/bookmark`,
      {},
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addComment = async (blogId, comment) => {
  try {
    const response = await axios.post(
      `${API_URL}/blog/${blogId}/comment`,
      { text: comment },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const shareBlog = async (blogId) => {
  try {
    const response = await axios.post(`${API_URL}/blog/${blogId}/share`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
