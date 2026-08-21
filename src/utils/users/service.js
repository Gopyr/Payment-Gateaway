import axios from "axios";

const userApiUrl = import.meta.env.VITE_API_USER_URL || "/api/create-user";

export async function createUser(payload) {
  const response = await axios.post(userApiUrl, payload, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}
