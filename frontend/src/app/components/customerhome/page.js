//src/app/components/customerhome/page.js
"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/utils/productApi";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/utils/cartApi";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, AppBar, Toolbar, Button, MenuItem, Select } from "@mui/material";
import { logoutUser } from "@/app/utils/api";

export default function CustomerHomePage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState("");
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProducts();
    }, []);

    useEffect(() => {
        if (category) {
            setFilteredProducts(products.filter(product => product.category.toLowerCase() === category.toLowerCase()));
        } else {
            setFilteredProducts(products);
        }
    }, [category, products]);

    const handleLogout = () => {
        logoutUser();
        router.push("/components/login");
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId);
            alert("Product added to cart!");
            router.push("/components/cart");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert(error.message || "Failed to add to cart");
        }
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Button color="inherit" onClick={() => router.push("/components/customerhome")}>Home</Button>
                        <Button color="inherit" onClick={() => router.push("/components/cart")}>Cart</Button>
                        <Button color="inherit" onClick={() => router.push("/components/cdashboard")}>Dashboard</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        sx={{ bgcolor: "white", borderRadius: 1, minWidth: 120 }}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        <MenuItem value="men">Men</MenuItem>
                        <MenuItem value="women">Women</MenuItem>
                        <MenuItem value="baby">Baby</MenuItem>
                        <MenuItem value="kids">Kids</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Available Products
                </Typography>

                <Grid container spacing={3}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
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
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            gutterBottom
                                            sx={{ cursor: "pointer", color: "primary.main", "&:hover": { textDecoration: "underline" } }}
                                            onClick={() => router.push(`/components/products/productdetail/${product.id}`)}
                                        >
                                            {product.name}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                            ${product.price}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{ mt: 1 }}
                                            onClick={() => handleAddToCart(product.id)}
                                        >
                                            Add to Cart
                                        </Button>
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
