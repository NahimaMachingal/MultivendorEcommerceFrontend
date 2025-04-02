"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchVendorOrders, updateOrderStatus } from "@/app/utils/orderApi";
import { Container, Typography, Grid, Card, CardContent,Box, Button, AppBar, Toolbar, MenuItem, Select } from "@mui/material";
import { logoutUser } from "@/app/utils/api";

export default function VendorOrderDetails() {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getOrders = async () => {
            try {
                const data = await fetchVendorOrders();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching vendor orders:", error);
            }
        };
        getOrders();
    }, []);

    const handleLogout = () => {
        logoutUser();
        router.push("/components/login");
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status");
        }
    };

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
    

    return (
        <>
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

            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Your Product Orders
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
                                            <strong>Customer:</strong> {order.user || "Unknown"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Status:</strong>
                                        </Typography>
                                        <div>
                                            <Select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                size="small"
                                                sx={{ ml: 1 }}
                                            >
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Processing">Processing</MenuItem>
                                                <MenuItem value="Shipped">Shipped</MenuItem>
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                            </Select>
                                        </div>
                                        <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                            Total Price: ${order.total_price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Ordered at: {new Date(order.ordered_at).toLocaleString()}
                                        </Typography>
                                        <div style={{ marginTop: 16 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Products:
                                            </Typography>
                                            <ul>
                                                {order.ordered_products.map((item, index) => (
                                                    <li key={index}>
                                                        {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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