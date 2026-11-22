import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StorefrontLayout from '../layouts/StorefrontLayout';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Category from '../pages/Category';
import ProductDetails from '../pages/ProductDetails';
import FindYourMatch from '../pages/FindYourMatch';
import Search from '../pages/Search';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Account from '../pages/Account';
import Orders from '../pages/Orders';
import OrderDetails from '../pages/OrderDetails';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StorefrontLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="category/:categorySlug" element={<Category />} />
        <Route path="product/:slug" element={<ProductDetails />} />
        <Route path="find-your-match" element={<FindYourMatch />} />
        <Route path="search" element={<Search />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="account" element={<Account />} />
        <Route path="account/orders" element={<Orders />} />
        <Route path="account/orders/:id" element={<OrderDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
