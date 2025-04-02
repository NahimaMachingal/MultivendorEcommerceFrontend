//src/app/layout.js
"use client"; // Ensure it's a client component
import { AuthProvider } from "./context/AuthContext"; // ✅ Use absolute path 
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
    mode: "light",
  },
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  // Move createTheme inside the component to avoid passing functions to a Server Component
  const theme = createTheme({
    palette: {
      primary: { main: "#1976d2" },
      secondary: { main: "#ff4081" },
      mode: "light",
    },
  });

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
