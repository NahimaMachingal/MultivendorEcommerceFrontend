//src/app/utils/orderApi.js

import axios from "axios";
import Cookies from "js-cookie";

const ORDER_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/`;
const REVIEW_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews/`;

const getAuthHeaders = () => {
    const token = Cookies.get("accessToken");
    if (!token) {
        console.warn("No access token found in cookies");
        return {};
    }
    
    console.log("Using token for authentication:", token.substring(0, 10) + "...");
    return { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

// Create an order when user checks out
export const createOrder = async () => {
    try {
        const response = await axios.post(ORDER_API_URL, {}, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to create order" };
    }
};

// Fetch all orders for the logged-in user
export const fetchOrders = async () => {
    try {
        const response = await axios.get(ORDER_API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to fetch orders" };
    }
};
export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        // Debug log
        console.log(`Updating order ${orderId} to status: ${newStatus}`);
        
        const headers = getAuthHeaders();
        console.log("Headers:", headers);
        
        const response = await axios.patch(
            `${ORDER_API_URL}${orderId}/update-status/`,
            { status: newStatus },
            { headers: headers }
        );
        
        return response.data;
    } catch (error) {
        console.error("Update order status error:", error.response?.data || error);
        throw error.response?.data || { error: "Failed to update order status" };
    }
};
// Fetch all orders for the vendor
export const fetchVendorOrders = async () => {
    try {
        const response = await axios.get(`${ORDER_API_URL}vendor/`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to fetch vendor orders" };
    }
};

// Fetch reviews for a product
export const fetchReviews = async (productId) => {
    try {
        const response = await axios.get(`${REVIEW_API_URL}${productId}/`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to fetch reviews" };
    }
};

// Add a review for a product
export const addReview = async (productId, rating, reviewText) => {
    try {
        const response = await axios.post(
            `${REVIEW_API_URL}${productId}/`,
            { rating, review_text: reviewText },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to add review" };
    }
};
