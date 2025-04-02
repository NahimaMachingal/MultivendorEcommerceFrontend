//src/app/components/register/page.js
//src/app/components/register/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../utils/api';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Alert,
    Link
} from '@mui/material';

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        usertype: 'customer'
    });
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        try {
            await registerUser(form);
            router.push('/components/login');
        } catch (err) {
            setError(err.error || "Registration failed");
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', p: 4, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold">
                            Register
                        </Typography>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Confirm password"
                                    type="password"
                                    name="confirm_password"
                                    value={form.confirm_password}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>User Type</InputLabel>
                                    <Select
                                        name="usertype"
                                        value={form.usertype}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="customer">Customer</MenuItem>
                                        <MenuItem value="vendor">Vendor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ backgroundColor: '#1E88E5', color: 'white', py: 1.5, fontWeight: 'bold' }}
                            >
                                Register
                            </Button>
                        </Box>
                    </form>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link href="/components/login" sx={{ color: '#1E88E5' }}>
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
