Multi-Vendor E-Commerce Platform - Frontend
This project is a Multi-Vendor E-Commerce Platform built with Next.js and Material UI. It enables multiple sellers to list products, while customers can browse, add to cart, and place orders seamlessly.
Objective
Develop a user-friendly platform where:

Vendors can manage their products and track sales
Customers can shop efficiently with an intuitive and responsive experience

Features
User Roles

Vendor: Can manage products and track sales
Customer: Can browse, add to cart, and purchase products

Vendor Dashboard

📦 Product Management: Add, edit, and delete products (name, price, images, stock, category)
📋 Order Management: View order details related to their products
📊 Analytics: Track product performance (sales, revenue, stock levels)

Customer Features

🔍 Browse products by category
🛒 Add to cart, remove from cart, and proceed to checkout
🏷️ Apply coupons and discount codes
📱 Track order history & status (Pending, Shipped, Delivered)

Payment Integration

💳 Implemented a dummy payment flow
💰 Bonus: Stripe/Razorpay integration for real transactions

Backend & Database Integration

🔄 Efficiently stores users, products, orders, and cart data

Technical Stack
Frontend

⚛️ Next.js (React Framework)
🎨 Material UI for UI components
🔄 AJAX/Fetch API for dynamic updates (without page reloads)
✅ Form validation to ensure valid user inputs

Backend

🔌 Connected to a backend for managing users, orders, and products

Getting Started
Install Dependencies
bashCopynpm install
or
bashCopyyarn install
Run the Development Server
bashCopynpm run dev
or
bashCopyyarn dev
Open http://localhost:3000 in your browser.
Environment Variables
Create a .env.local file in the root directory and configure API URLs:
CopyNEXT_PUBLIC_API_URL=http://127.0.0.1:8000
Deployment
The easiest way to deploy your Next.js app is through Vercel:

Follow the Vercel Deployment Guide.

Learn More
For more details:

Next.js Documentation
Material UI

