//src/app/components/cart/page.js
"use client";
import { useEffect, useState } from "react";
import { fetchCartItems,removeFromCart } from "@/app/utils/cartApi";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button, AppBar, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/utils/orderApi";
import { logoutUser } from "@/app/utils/api";
export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const data = await fetchCartItems();
                setCartItems(data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        getCartItems();
    }, []);

    const handleRemoveFromCart = async (productId) => {
        try {
            await removeFromCart(productId);
            setCartItems(cartItems.filter(item => item.product.id !== productId));
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const handleCheckout = async () => {
        try {
            const orderData = await createOrder();
            console.log("Order created:", orderData);
            router.push("/components/checkout"); // Navigate to checkout page
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const handleLogout = () => {
            logoutUser();
            router.push("/components/login"); // Redirect to login page after logout
        };

    return (
        <>
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Button color="inherit" onClick={() => router.push("/components/customerhome")}>Home</Button>
                    <Button color="inherit" onClick={() => router.push("/components/cart")}>Cart</Button>
                    <Button color="inherit" onClick={() => router.push("/components/cdashboard")}>Dashboard</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Your Cart
                </Typography>

                <Grid container spacing={3}>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
                                    <CardMedia
                                        component="img"
                                        image={`${API_BASE_URL}${item.product.image_urls[0]}`}
                                        alt={item.product.name}
                                        sx={{ width: "100%", height: 200, objectFit: "contain", borderRadius: 2, mb: 1 }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">{item.product.name}</Typography>
                                        <Typography variant="body1" color="primary">${item.product.price}</Typography>
                                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            fullWidth
                                            sx={{ mt: 1 }}
                                            onClick={() => handleRemoveFromCart(item.product.id)}
                                        >
                                            Remove
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No items in cart</Typography>
                    )}
                </Grid>

                {cartItems.length > 0 && (
                    <Box textAlign="center" sx={{ mt: 4 }}>
                        <Button variant="contained" color="success" size="large" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </Box>
                )}
            </Container>
        </>
    );
}