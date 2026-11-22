import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('manimuse_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('manimuse_cart_v1', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const getItemKey = (productId, shape, length, finish, size) => {
    return `${productId}_${shape || 'default'}_${length || 'default'}_${finish || 'default'}_${size || 'default'}`;
  };

  const addToCart = (product, selectedOptions = {}, quantity = 1) => {
    const shape = selectedOptions.shape || product.shape || 'Standard';
    const length = selectedOptions.length || product.length || 'Standard';
    const finish = selectedOptions.finish || product.finish || 'Standard';
    const size = selectedOptions.size || (product.availableSizes && product.availableSizes[0]) || 'M';

    const key = getItemKey(product.id, shape, length, finish, size);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.key === key);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            key,
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0],
            shape,
            length,
            finish,
            size,
            quantity,
          },
        ];
      }
    });

    addToast(`Added "${product.name}" to your bag`, 'success');
    openCart();
  };

  const updateQuantity = (key, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(key);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (key) => {
    const itemToRemove = items.find((i) => i.key === key);
    setItems((prev) => prev.filter((item) => item.key !== key));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.name}" from your bag`, 'info');
    }
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      addToast('Please enter a coupon code', 'error');
      return false;
    }

    const coupon = BRAND_CONFIG.coupons[cleanCode];
    if (coupon) {
      setAppliedCoupon({ code: cleanCode, ...coupon });
      addToast(`Coupon "${cleanCode}" applied: ${coupon.description}`, 'success');
      return true;
    } else {
      addToast('Invalid coupon code. Try MUSE10 or GLAM20', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon removed', 'info');
  };

  // Computations
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const itemsCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent) {
      return Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (appliedCoupon?.freeShipping) return 0;
    return subtotal >= BRAND_CONFIG.shipping.freeThreshold ? 0 : BRAND_CONFIG.shipping.standardFee;
  }, [subtotal, appliedCoupon]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingFee);
  }, [subtotal, discountAmount, shippingFee]);

  const freeShippingThreshold = BRAND_CONFIG.shipping.freeThreshold;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        itemsCount,
        shippingFee,
        discountAmount,
        total,
        couponCode,
        setCouponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold,
        freeShippingRemaining,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
