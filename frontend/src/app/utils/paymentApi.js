import axios from "axios";
import Cookies from "js-cookie";

const PAYMENT_API_URL =`${process.env.NEXT_PUBLIC_API_URL}/payments/`;

const getAuthHeaders = () => {
    const token = Cookies.get("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a Razorpay payment order
export const initiatePayment = async () => {
    try {
        const response = await axios.post(`${PAYMENT_API_URL}create/`, {}, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to create payment order" };
    }
};

// Verify the payment after successful transaction
export const verifyPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${PAYMENT_API_URL}verify/`, paymentData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Payment verification failed" };
    }
};
