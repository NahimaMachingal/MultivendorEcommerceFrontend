//src/app/components/products/page.js

"use client";
import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "@/app/utils/productApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchVendorProducts } from "@/app/utils/vproductApi";
import { logoutUser } from "@/app/utils/api";
import { 
    AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Box 
} from "@mui/material";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchVendorProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        try {
            await deleteProduct(productId);
            setProducts(products.filter((product) => product.id !== productId));  
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    const handleLogout = () => {
            logoutUser();
            router.push("/components/login"); // Redirect to login page after logout
        };

    return (
        <>
            {/* Navbar */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Vendor Dashboard
                    </Typography>
                    <Button color="inherit" onClick={() => router.push("/components/products")}>Products</Button>
                    <Button color="inherit" onClick={() => router.push("/components/vhome")}>Dashboard</Button>
                    <Button color="inherit" onClick={() => router.push("/components/vorderdetails")}>Order details</Button>
                    <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>Logout</Button>
                </Toolbar>
            </AppBar>

            {/* Products Section */}
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Products
                </Typography>

                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mb: 3 }} 
                    onClick={() => router.push("/components/products/add")}
                >
                    Add Product
                </Button>

                <Grid container spacing={3}>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
                                    {/* Product Image */}
                                    {product.image_urls && product.image_urls.length > 0 ? (
                                        <CardMedia
                                            component="img"
                                            image={`${API_BASE_URL}${product.image_urls[0].startsWith('/') ? product.image_urls[0] : '/' + product.image_urls[0]}`}
                                            alt={product.name}
                                            sx={{ 
                                                width: "100%", 
                                                height: 200,  
                                                objectFit: "contain", 
                                                borderRadius: 2, 
                                                mb: 1 
                                            }}
                                        />
                                    ) : (
                                        <Box 
                                            sx={{ 
                                                height: 140, 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                bgcolor: 'grey.200',
                                                borderRadius: 2,
                                                mb: 1
                                            }}
                                        >
                                            <Typography color="text.secondary">No image</Typography>
                                        </Box>
                                    )}
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                            ${product.price}
                                        </Typography>
                                        {/* Buttons: Edit & Delete */}
                                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                            <Button 
                                                variant="outlined" 
                                                color="primary"
                                                onClick={() => router.push(`/components/products/edit/${product.id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                color="error"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No products available</Typography>
                    )}
                </Grid>
            </Container>
        </>
    );
}
