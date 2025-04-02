//src/app/components/products/edit/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { fetchProductById, updateProduct } from "@/app/utils/productApi";
import { useRouter, useParams } from "next/navigation";
import { TextField, Button, Container, Typography, Box, Grid, Paper, IconButton } from "@mui/material";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState({ 
        name: "", 
        description: "", 
        price: "",
        category: "",
        stock: "",
        image_urls: []
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = "http://127.0.0.1:8000";

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError("Failed to load product details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create FormData object to handle file uploads
            const formData = new FormData();
            
            // Add all text fields
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category);
            formData.append("stock", product.stock);
            
            // Debug: Check if there are images to upload
            console.log("Number of images to upload:", images.length);

            // Add all new images
            images.forEach((image, index) => {
                console.log(`Adding image ${index}:`, image.name);
                formData.append("images", image);
            });

            // Debug: Log FormData contents (though FormData can't be directly logged)
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
        }
            
            await updateProduct(id, formData);
            router.push("/components/products");
        } catch (err) {
            setError("Failed to update product");
            console.error(err);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>Edit Product</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth />
                <TextField label="Description" name="description" value={product.description} onChange={handleChange} fullWidth />
                <TextField label="Price" name="price" type="number" value={product.price} onChange={handleChange} fullWidth />
                <TextField 
                    label="Category" 
                    name="category" 
                    value={product.category || ""} 
                    onChange={handleChange} 
                    fullWidth 
                    required
                />
                <TextField 
                    label="Stock" 
                    name="stock" 
                    type="number" 
                    value={product.stock || ""} 
                    onChange={handleChange} 
                    fullWidth 
                    required
                    inputProps={{ min: "0", step: "1" }}
                />
                
                
                {/* New Image Upload */}
                <Box>
                    <Typography variant="h6" gutterBottom>Add New Images</Typography>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        multiple
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                        <Button variant="outlined" component="span">
                            Select Images
                        </Button>
                    </label>
                    {images.length > 0 && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {images.length} new {images.length === 1 ? 'image' : 'images'} selected
                        </Typography>
                    )}
                </Box>
                
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button 
                        onClick={() => router.push("/components/products")} 
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}