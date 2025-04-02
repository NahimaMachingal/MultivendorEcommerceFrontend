//src/app/components/cdashboard/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchOrders } from "@/app/utils/orderApi";
import { Container, Typography, Grid, Card, CardContent, Button, AppBar, Toolbar } from "@mui/material";
import { logoutUser } from "@/app/utils/api";

export default function CustomerDashboard() {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        getOrders();
    }, []);

    const handleLogout = () => {
        logoutUser();
        router.push("/components/login");
    };

    return (
        <>
            {/* Navbar */}
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
                    Your Orders
                </Typography>

                <Grid container spacing={3}>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <Grid item xs={12} key={order.id}>
                                <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            Order ID: {order.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Status: {order.status}
                                        </Typography>
                                        <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                            Total Price: ${order.total_price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Ordered at: {new Date(order.ordered_at).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No orders available</Typography>
                    )}
                </Grid>
            </Container>
        </>
    );
}
