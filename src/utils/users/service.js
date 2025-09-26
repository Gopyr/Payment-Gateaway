import axios from "axios";

const API_USER_URL = "http://localhost:5000/api/create-user";

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_USER_URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
