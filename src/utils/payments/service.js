import axios from "axios";
const API_PAYMENT_URL = "http://localhost:5000/api/create-transaction";

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
