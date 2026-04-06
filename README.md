# ShopKart - Advanced E-Commerce Application

![ShopKart Application](https://img.shields.io/badge/Status-Completed-success) ![React](https://img.shields.io/badge/React-18.0-blue.svg) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg) ![Vite](https://img.shields.io/badge/Build-Vite-646CFF.svg)

> **🌍 Live Demo**: [View ShopKart Deployment Here](#) *(https://shop-kart-wine.vercel.app/)*

> **Architected and Developed by Om Rajput**

ShopKart is a modern, high-performance E-commerce web application designed to demonstrate advanced system architecture in React. It features robust global state management, dynamic mathematical product filtering, seamless local-storage persistence, and a highly responsive, animated UI system.

## 🚀 Tech Stack & Dependencies

- **Framework**: `React.js (v18)`
- **Build Tool**: `Vite` for lightning-fast HMR and bundling.
- **Styling**: `Tailwind CSS (v3)` for pure utility-first aesthetics, custom gradients, and micro-animations.
- **Routing**: `React Router DOM (v6)` for seamless Single Page Application (SPA) navigation.
- **Data Fetching**: `Axios` combined with custom React hooks to communicate asynchronously with external servers.
- **Backend/API**: `DummyJSON REST API` to simulate a real massive database of products.

---

## ⚙️ Core Application Workflows

If you are exploring the codebase, here is exactly how the underlying architecture behaves:

### 1. The Global State & Persistence Engine (`App.jsx`)
Instead of prop-drilling data down through 15 layers of components, ShopKart uses the **React Context API** coupled with browser **LocalStorage**. 
- The `CartContext` and `WishlistContext` hold the source of truth for all saved items.
- **Workflow**: Whenever a user clicks "Add to Cart" or the `<FiHeart />` Wishlist icon, the React `Context` intercepts the click and updates a central array memory bank inside `App.jsx`.
- **Persistence**: A custom `useEffect` hook continuously listens to the arrays. If they change, it seamlessly serializes the data and injects it into the browser's LocalStorage. If the user accidentally refreshes the page or closes the tab, the exact cart and wishlist states are flawlessly reconstructed!

### 2. Dynamic Mathematical Filtering (`Products.jsx`)
The product grid doesn't just display items; it uses a multi-stage mathematical pipeline to precisely filter the API payload.
- **Stage 1 (URL Constraints)**: If you navigate to `/products?category=electronics`, the app isolates only items tagged internally as smartphones or laptops.
- **Stage 2 (Dynamic Sidebar Generation)**: The `SidebarFilters.jsx` component mathematically extracts the "unique categories" dynamically from the items *currently* visible on the screen—meaning you will never see an empty checkbox for "Groceries" on the "Electronics" page!
- **Stage 3 (Slider & Array Intersecting)**: When you drag the Price Slider or click a category checkbox, an inline `.filter()` function destroys any mapped `<ProductCard>` components that don't match the combined criteria instantly.

### 3. Asynchronous Checkout Engine (`Checkout.jsx`)
ShopKart simulates the exact mechanics of a real-world financial checkout.
- Contains 10 massive **React Controlled Forms** strictly bound to a `formData` payload state. HTML5 validations prevent submission of empty fields.
- **Workflow**: When clicking the "Place Order" button, the UI intercepts standard form submission (`e.preventDefault()`) and flags `isProcessing` to true. This triggers a 1.5-second `setTimeout` mock-server delay (simulating a Stripe backend). 
- **The Receipt**: Once cleared, it instantly fires the `clearCart()` administrative Context command—wiping the global array and LocalStorage—then hijacks the UI inline to render a green "Order Confirmed" receipt with the exact recorded checkout price!

### 4. Flawless Mobile Responsiveness
Every component was engineered with Tailwind's `sm`, `md`, and `lg` breakpoints.
- **Layout Collapsing**: The enormous 4-column product grid folds down into a clean 1-column scroll on iPhones.
- **Mobile Modals**: The advanced Desktop Filter Sidebar is totally hidden on mobile to save space. Instead, mobile users are presented with a "Filters" button. When clicked, it locks the body scroll and deploys a sleek full-screen absolute Modal overlay hosting the exact same mathematical filter algorithms!

---

## 🛠️ How to Run Locally

If you'd like to test the application on your own machine:

1. **Clone the Repository** and transition into the directory.
2. Install the core dependencies (React, Tailwind, React Router, React Icons, Axios):
   ```bash
   npm install
   ```
3. Boot up the Vite Development Server:
   ```bash
   npm run dev
   ```
4. Click the `http://localhost:5173` link generated in your terminal to view the application.
