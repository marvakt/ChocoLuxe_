

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Products from './Pages/Products';
import Cart from './Components/Cart';
import About from './Pages/About';
import Wishlist from './Components/Wishlist';
import Checkout from './Pages/Checkout';
import Orders from './Components/Order';
import ProductCard from './Components/ProductCard';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Toaster } from 'react-hot-toast';


import AdminDashboard from './Admin/AdminDashboard';
import ProductManagement from './Admin/productManagement';
import OrderManagement from './Admin/OrderManagement';
import UserManagement from './Admin/UserManagement';
import AdminLayout from './Components/Admin/AdminLayout';


import { UserProvider } from './Context/UserContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const hideNavAndFooter = isAdminRoute || isAuthPage;

  return (
    <>
      {!hideNavAndFooter && <Navbar />}

      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/productcard" element={<ProductCard />} />

        

      
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Routes>

      {!hideNavAndFooter && <Footer />}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
