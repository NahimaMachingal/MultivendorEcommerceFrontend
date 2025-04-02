//src/app/utils/vproductApi.js

import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products/vendors/products/`;

const getAuthHeaders = () => {
    const token = Cookies.get("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch products for the authenticated vendor
export const fetchVendorProducts = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to fetch vendor products" };
    }
};
