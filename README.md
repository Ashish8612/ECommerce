# Monster E-Commerce Platform

A modern, full-stack E-Commerce application featuring a React Single Page Application (SPA), a Node.js Express REST API, MongoDB storage, and secure Stripe payment integration.

---

## 1. Overview & Capabilities

This platform is a dual-portal application supporting both customers and administrators.

### Key Features
* **Authentication**: Managed via Clerk Auth SDK with social login support and route protection.
* **Interactive Shopping Cart**: Non-signed-in guests can manage items in local storage, which automatically merge with their MongoDB cart upon sign-in.
* **Promotions & Coupons**: Time-bounded, count-restricted discount codes validation on checkout.
* **Loyalty Points Program**: Earn points and spend them directly at checkout (1 Point = 1 INR conversion).
* **Payment Gateways**: Fully PCI-DSS compliant credit card checkout using **Stripe Payment Elements** (custom sandboxed iframe checkout).
* **Admin Dashboard**: Full CRUD management of inventory products, categories, active promotions, settings, and orders.

---

## 2. Technology Stack

* **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + `shadcn/ui` + Zustand (state management).
* **Backend**: Node.js + Express + TypeScript + Mongoose ODM.
* **Database**: MongoDB (Atlas).
* **Media Uploads**: Cloudinary API (via `multer` and `streamifier`).
* **Identity Provider**: Clerk Authentication.
* **Payment Gateway**: Stripe SDK.

---

## 3. Project Directory Map

Detailed High-Level and Low-Level Design documents are available in the [`/docs`](file:///c:/Ashish/E-Commerce/docs) directory:
* **System Design**: [`docs/design/hld.md`](file:///c:/Ashish/E-Commerce/docs/design/hld.md) and [`docs/design/lld.md`](file:///c:/Ashish/E-Commerce/docs/design/lld.md).
* **Service Schemas**: [`docs/schema/database_schema.md`](file:///c:/Ashish/E-Commerce/docs/schema/database_schema.md).
* **User Journeys**: [`docs/business-logic.md`](file:///c:/Ashish/E-Commerce/docs/business-logic.md).

---

## 4. Local Installation & Setup Guide

Follow these steps to set up the project locally.

### 4.1. Prerequisites
Ensure you have the following installed:
* **Node.js** (v18 or higher)
* **npm** (v9 or higher)
* **MongoDB** (running locally or a MongoDB Atlas connection string)
* **Git**

---

### 4.2. Configuration (Environment Variables)

You must set up environment files in both the client and server directories.

#### 1. Configure Backend (`server/.env`)
Create a file named `.env` in the `/server` directory and populate it:
```env
PORT=3000
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
MONGO_URL=mongodb+srv://your_connection_string

# Clerk Authentication Keys
CLERK_PUBLISHABLE_KEY=pk_test_yourKey
CLERK_SECRET_KEY=sk_test_yourSecret

# Stripe Keys
STRIPE_SECRET_KEY=sk_test_yourStripeSecret

# Cloudinary Keys (for product image uploads)
CLOUDINARY_CLOUD_NAME=yourCloudName
CLOUDINARY_API_KEY=yourApiKey
CLOUDINARY_API_SECRET=yourApiSecret

# Admin Emails (comma-separated list of emails allowed to access admin portal)
ADMIN_EMAILS=youradmin@example.com
```

#### 2. Configure Frontend (`client/.env`)
Create a file named `.env` in the `/client` directory and populate it:
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_yourKey
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_yourStripePublishable
```

---

### 4.3. Dependency Installation

Open your terminal and install dependencies for both the frontend and backend.

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### 4.4. Seeding the Database

Populate your database with default product categories and test loyalty points before running the application:

```bash
cd ../server

# Seed categories
npx tsx src/seed-categories.ts

# Seed test points
npx tsx src/seed-points.ts
```

---

### 4.5. Running in Development Mode

You can run the frontend and backend servers concurrently.

#### Start Backend:
```bash
cd server
npm run dev
# Server runs on http://localhost:3000
```

#### Start Frontend:
```bash
cd client
npm run dev
# React Client runs on http://localhost:5173
```

---

### 4.6. Production Build

To bundle the application for production:

```bash
# Build server
cd server
npm run build

# Build client
cd ../client
npm run build
```
The compiled server code will output to `/server/dist/`, and the optimized client static assets will output to `/client/dist/`.
