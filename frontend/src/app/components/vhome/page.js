// src/app/components/vhome/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Grid, Card, CardContent, Typography, Box, Button, CircularProgress, AppBar, Toolbar } from "@mui/material";
import { fetchVendorProducts } from "@/app/utils/productApi";
import { logoutUser } from "@/app/utils/api";
export default function VendorDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchVendorProducts();
                console.log("Products fetched:", data); // Debug log to see what's returned
                setProducts(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching vendor products:", error);
                setError("Failed to load products. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    // Function to handle product management navigation
    const handleManageProducts = () => {
        router.push("/components/products");
    };

    if (loading) {
        return (
            <Container sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 5 }}>
                <Typography color="error">{error}</Typography>
                <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
                    Retry
                </Button>
            </Container>
        );
    }
    const handleNavigation = (path) => {
        if (path === 'products') {
            router.push(`/components/products`);  // Navigate to /components/products
        } else if (path === 'orderdetails') {
            router.push(`/components/vorderdetails`); 
        } else if (path === 'dashboard') {
            router.push(`/components/vhome`); 
        
         
        } else {
            router.push(`/components/vendorhome/${path}`);
        }
    };
    const handleLogout = () => {
            logoutUser();
            router.push("/components/login");
        };

    return (
        <>
        {/* Navbar */}
                    <AppBar position="static" color="primary">
                        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" fontWeight="bold">
                                Vendor Dashboard
                            </Typography>
                            <Box>
                                {['products', 'orderdetails','dashboard'].map((item) => (
                                    <Button
                                        key={item}
                                        color="inherit"
                                        onClick={() => handleNavigation(item)}
                                        sx={{ mx: 1 }}
                                    >
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </Button>
                                ))}
                                <Button color="inherit" onClick={handleLogout} sx={{ mx: 1 }}>
                            Logout
                        </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
        
        <Container sx={{ mt: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    Product Performance
                </Typography>
                <Button variant="contained" color="primary" onClick={handleManageProducts}>
                    Manage Products
                </Button>
            </Box>

            {products.length > 0 ? (
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Category: {product.category}
                                    </Typography>
                                    <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                        Sales Count: {product.sales_count || 0}
                                    </Typography>
                                    <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                        Revenue: ${(product.revenue || 0).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                        Stock: {product.stock}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: "center", py: 5 }}>
                    <Typography variant="h6" gutterBottom>
                        No products available
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleManageProducts}
                        sx={{ mt: 2 }}
                    >
                        Add Your First Product
                    </Button>
                </Box>
            )}
        </Container>
        </>
    );
}