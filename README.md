# Enterprise Frontend

A modern React frontend application for managing products and shopping cart functionality, built with Vite and Redux Toolkit.

## Features

- Product listing and management
- Shopping cart functionality
- Pagination for product lists
- Responsive UI components (Navbar, Spinner, Alert, etc.)
- State management with Redux Toolkit
- API integration with Axios
- Routing with React Router

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** CSS (with potential for additional styling libraries)

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd enterprise-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

2. Ensure the backend services are running:
   - Product service on `http://localhost:7081`
   - Cart service on `http://localhost:7082`

   The Vite dev server proxies API requests to these backend services.

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── app/
│   ├── store.js              # Redux store configuration
│   └── ...
├── components/
│   ├── Alert.jsx             # Alert component
│   ├── Navbar.jsx            # Navigation bar
│   ├── Pagination.jsx        # Pagination component
│   └── Spinner.jsx           # Loading spinner
├── features/
│   ├── cartSlice.js          # Cart Redux slice
│   └── productSlice.js       # Product Redux slice
├── hooks/
│   └── useProducts.js        # Custom hook for products
├── pages/
│   ├── AddProductPage.jsx    # Add product page
│   ├── CartPage.jsx          # Shopping cart page
│   └── ProductListPage.jsx   # Product listing page
├── routes/
│   └── AppRoutes.jsx         # Application routes
├── services/
│   ├── cartService.js        # Cart API service
│   └── productService.js     # Product API service
└── utils/
    └── formatters.js         # Utility functions
```

## API Endpoints

The application communicates with two backend services:

- **Product Service:** `http://localhost:7081/api/products`
- **Cart Service:** `http://localhost:7082/api/cart`
