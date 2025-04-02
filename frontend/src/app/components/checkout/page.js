//src/apps/components/checkout/page.js
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { initiatePayment, verifyPayment } from "@/app/utils/paymentApi"; // Import Razorpay API functions

export default function CheckoutPage() {
    const router = useRouter();
    const [orderId, setOrderId] = useState(null);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    useEffect(() => {
        // Load Razorpay script dynamically
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);

        // Fetch order details from backend
        const createPaymentOrder = async () => {
            try {
                const data = await initiatePayment(); // Call API to create order
                setOrderId(data.order_id);
            } catch (error) {
                console.error("Error creating payment order:", error);
            }
        };
        createPaymentOrder();
    }, []);

    const handlePayment = () => {
        if (!razorpayLoaded) {
            alert("Razorpay SDK not loaded. Please try again.");
            return;
        }

        if (!orderId) {
            alert("Payment order not initialized.");
            return;
        }

        const options = {
            key: "rzp_test_VNMhUqKBebSrLi", // Your Razorpay test key
            amount: 500 * 100, // Amount in paise (500 INR for example)
            currency: "INR",
            name: "My Store",
            description: "Test Transaction",
            order_id: orderId, // Razorpay order ID from backend
            handler: async function (response) {
                try {
                    await verifyPayment(response); // Verify payment on backend
                    router.push("/components/customerhome"); // Redirect on success
                } catch (error) {
                    console.error("Payment verification failed:", error);
                    alert("Payment verification failed!");
                }
            },
            prefill: {
                name: "Test User",
                email: "test@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                Checkout Page
            </Typography>
            <Typography variant="body1">Proceed with your payment.</Typography>

            <Box sx={{ mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handlePayment}>
                    Pay Now
                </Button>
            </Box>
        </Container>
    );
}
