"use client";
import { useState } from "react";
import { addProduct } from "@/app/utils/productApi";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function AddProductPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: []
    });

    const [error, setError] = useState(null);
    const router = useRouter();

    // Handle input changes (text fields)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle file selection (images)
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            images: Array.from(e.target.files) // Convert FileList to Array
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("stock", formData.stock);
        formDataToSend.append("category", formData.category);

        // Append each selected image file
        formData.images.forEach((file) => {
            formDataToSend.append("images", file);
        });

        try {
            await addProduct(formDataToSend); // Ensure the API supports FormData
            router.push("/components/products");
        } catch (err) {
            setError(err.error || "Failed to add product");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                Add Product
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
                <TextField label="Description" name="description" value={formData.description} onChange={handleChange} />
                <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                <TextField label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                <TextField label="Category" name="category" value={formData.category} onChange={handleChange} required />

                {/* File input for images */}
                <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} required />

                <Button type="submit" variant="contained" color="primary">
                    Save Product
                </Button>
            </Box>
        </Container>
    );
}
