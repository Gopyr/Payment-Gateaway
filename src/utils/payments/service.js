import axios from "axios";

// Kalau di deploy ke Vercel, pakai relative path saja
const API_PAYMENT_URL =
  import.meta.env.VITE_API_PAYMENT_URL || "/api/create-transaction";

export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(API_PAYMENT_URL, transactionData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
