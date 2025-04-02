"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchProductById } from "@/app/utils/productApi";
import { fetchReviews, addReview } from "@/app/utils/orderApi";
import { Container, Typography, Button, TextField, Box, Grid, Card, CardContent, Rating, AppBar, Toolbar } from "@mui/material";

export default function ProductDetailPage() {
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const { productId } = useParams();
    const router = useRouter();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductById(productId);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const getReviews = async () => {
            try {
                const data = await fetchReviews(productId);
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        getProduct();
        getReviews();
    }, [productId]);

    const handleAddReview = async () => {
        if (!rating) {
            alert("Please select a rating.");
            return;
        }

        try {
            const newReview = await addReview(productId, rating, reviewText);
            setReviews([newReview, ...reviews]);
            setRating(5);
            setReviewText("");
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    const handleLogout = () => {
        // Implement logout logic
    };

    if (!product) return <Typography>Loading...</Typography>;

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
                <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
                <Typography variant="h6" color="primary">${product.price}</Typography>
                <Typography variant="body1">{product.description}</Typography>

                {/* Review Section */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" fontWeight="bold">Reviews & Ratings</Typography>

                    <Box sx={{ mt: 2 }}>
                        <Rating 
                            value={rating}
                            onChange={(event, newValue) => setRating(newValue)}
                        />
                        <TextField 
                            fullWidth 
                            multiline 
                            rows={3} 
                            label="Write a review..." 
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddReview} sx={{ mt: 2 }}>
                            Submit Review
                        </Button>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <Grid item xs={12} key={review.id}>
                                    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight="bold">{review.user}</Typography>
                                            <Rating value={review.rating} readOnly />
                                            <Typography variant="body2" color="text.secondary">{review.review_text}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography>No reviews yet</Typography>
                        )}
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
