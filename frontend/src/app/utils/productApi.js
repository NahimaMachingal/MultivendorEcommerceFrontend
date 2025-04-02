
//src/app/utils/productApi.js
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products/`;


const getAuthHeaders = () => {
    const token = Cookies.get("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to fetch products" };
    }
};

// Add a new product
export const addProduct = async (productData) => {
    try {
        // Check if productData is FormData (for file uploads)
        const headers = {
            ...getAuthHeaders(),
            ...(!(productData instanceof FormData) && { 'Content-Type': 'application/json' })
        };
        
        const response = await axios.post(API_URL, productData, { headers });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to add product" };
    }
};
// Delete a product
export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${API_URL}${productId}/`, { headers: getAuthHeaders() });
    } catch (error) {
        throw error.response?.data || { error: "Failed to delete product" };
    }
};
// Fetch a single product by ID
export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}${productId}/`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to fetch product details" };
    }
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
    try {
        let headers = getAuthHeaders();
        
        // When sending FormData, don't set Content-Type at all
        // Axios will automatically set the correct multipart/form-data header with boundary
        if (!(productData instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        
        const response = await axios.put(`${API_URL}${productId}/`, productData, { headers });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to update product" };
    }
};

// Fetch vendor products
export const fetchVendorProducts = async () => {
    try {
        // Update the URL to match the new endpoint
        const response = await axios.get(`${API_URL}vendor/products/`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("Error fetching vendor products:", error);
        throw error.response?.data || { error: "Failed to fetch vendor products" };
    }
};
