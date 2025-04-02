//src/app/utils/cartApi.js
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/cart/`;



const getAuthHeaders = () => {
    const token = Cookies.get("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Add product to cart
export const addToCart = async (productId) => {
    try {
        const response = await axios.post(
            API_URL,
            { product_id: productId },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to add to cart" };
    }
};

// Fetch all cart items
export const fetchCartItems = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to fetch cart items" };
    }
};

// Remove item from cart
export const removeFromCart = async (productId) => {
    try {
        await axios.delete(API_URL, {
            headers: getAuthHeaders(),
            data: { product_id: productId }, // Pass data in DELETE request
        });
    } catch (error) {
        throw error.response?.data || { error: "Failed to remove product from cart" };
    }
};
