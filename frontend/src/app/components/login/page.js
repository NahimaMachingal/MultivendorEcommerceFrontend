//src/app/components/login/page.js
"use client";
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../utils/api';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    FormControlLabel,
    Checkbox,
    Alert
} from '@mui/material';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { setUser } = useContext(AuthContext);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser(form);
            setUser(userData);
            
            if (userData.usertype === "customer") {
                router.push('/components/customerhome');
            } else if (userData.usertype === "vendor") {
                router.push('/components/vendorhome');
            } else {
                router.push('/components/adminhome');
            }
        } catch (err) {
            setError(err.error || "Login failed");
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', p: 4, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold">
                            Sign in
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            or <a href="/components/register" style={{ color: '#1976d2', textDecoration: 'none' }}>create an account</a>
                        </Typography>
                    </Box>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            margin="normal"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2, p: 1.5, fontWeight: 'bold' }}
                        >
                            Sign in
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

