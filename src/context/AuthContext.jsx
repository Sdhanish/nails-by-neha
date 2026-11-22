import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  id: "user-demo-101",
  name: "Ananya Sharma",
  email: "ananya.sharma@example.com",
  phone: "+91 98765 43210",
  memberTier: "Muse Privé Gold",
  points: 480,
  joinedDate: "October 2025",
  address: {
    fullName: "Ananya Sharma",
    street: "Flat 402, Lotus Blossom Residency, 12th Main",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560038",
    country: "India",
  },
};

const INITIAL_DEMO_ORDERS = [
  {
    id: "MM-84920",
    date: "18 Nov 2026",
    status: "Delivered",
    statusStep: 4, // 0: Placed, 1: Atelier Prep, 2: Shipped, 3: Out for Delivery, 4: Delivered
    carrier: "BlueDart Express",
    trackingNumber: "BD99482710IN",
    subtotal: 1748,
    discount: 175,
    shipping: 0,
    total: 1573,
    paymentMethod: "UPI / Demo Pay",
    shippingAddress: {
      fullName: "Ananya Sharma",
      street: "Flat 402, Lotus Blossom Residency, 12th Main",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560038",
    },
    items: [
      {
        id: "prod-1",
        slug: "blush-hour",
        name: "Blush Hour",
        shape: "Almond",
        length: "Medium",
        finish: "Glossy",
        size: "M",
        price: 799,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "prod-7",
        slug: "golden-hour",
        name: "Golden Hour",
        shape: "Almond",
        length: "Medium",
        finish: "Chrome",
        size: "M",
        price: 949,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
      },
    ],
    timeline: [
      { step: "Order Placed", time: "18 Nov 2026, 11:30 AM", completed: true },
      { step: "Artisan Inspection & Packaged", time: "18 Nov 2026, 04:15 PM", completed: true },
      { step: "Dispatched from Bengaluru Atelier", time: "19 Nov 2026, 09:00 AM", completed: true },
      { step: "Delivered & Signed", time: "20 Nov 2026, 02:45 PM", completed: true },
    ],
  },
];

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('manimuse_user_v1');
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
    } catch (e) {
      return DEFAULT_DEMO_USER;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('manimuse_orders_v1');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch (e) {
      return INITIAL_DEMO_ORDERS;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('manimuse_user_v1', JSON.stringify(user));
      } else {
        localStorage.removeItem('manimuse_user_v1');
      }
    } catch (e) {
      console.error('Failed to sync user', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('manimuse_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders', e);
    }
  }, [orders]);

  const login = (email, password) => {
    const newUser = {
      ...DEFAULT_DEMO_USER,
      email: email || DEFAULT_DEMO_USER.email,
    };
    setUser(newUser);
    addToast('Signed in successfully', 'success');
    return true;
  };

  const register = (userData) => {
    const newUser = {
      ...DEFAULT_DEMO_USER,
      name: userData.name || 'New Muse Member',
      email: userData.email,
      phone: userData.phone || '+91 99999 00000',
    };
    setUser(newUser);
    addToast('Welcome to Nails & Lashes by Neha Studio!', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('Signed out', 'info');
  };

  const placeOrder = (orderData) => {
    const orderId = `MM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
      statusStep: 1,
      carrier: 'BlueDart Express (Demo)',
      trackingNumber: `BD${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      subtotal: orderData.subtotal,
      discount: orderData.discountAmount || 0,
      shipping: orderData.shippingFee || 0,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod || 'Online UPI / Card (Demo)',
      shippingAddress: orderData.shippingAddress || (user ? user.address : {}),
      items: orderData.items,
      timeline: [
        { step: 'Order Placed & Confirmed', time: 'Just now', completed: true },
        { step: 'Artisan Atelier Packaging', time: 'In progress', completed: false },
        { step: 'Carrier Dispatch', time: 'Expected tomorrow', completed: false },
        { step: 'Expected Delivery', time: 'In 2-3 business days', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find((o) => o.id === id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        orders,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
