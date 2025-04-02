//src/app/components/venderhome/page.js
"use client";
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import { logoutUser } from "@/app/utils/api";
export default function VendorHome() {
    const router = useRouter();

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
        <Box sx={{ flexGrow: 1 }}>
            {/* Navbar */}
            <AppBar position="static" color="primary">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold">
                        Vendor Dashboard
                    </Typography>
                    <Box>
                        {['products','orderdetails','dashboard'].map((item) => (
                            <Button
                                key={item}
                                color="inherit"
                                onClick={() => handleNavigation(item)}
                                sx={{ mx: 1 }}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Page Content */}
            <Container sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">
                    Manage your products, coupons, and orders easily.
                </Typography>
            </Container>
        </Box>
    );
}

